<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Conversation;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;


class ConversationController extends Controller
{
    /**
     * Conversation作成.
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request) {
        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    "role" => "system",
                    "content" => "あなたは関西弁のおばちゃんです。これから送られてくるLINEの２人の会話は、マッチングアプリで知り合った２人のものですが、結果的に恋人関係になる事が、できませんでした。今後のためになるようアドバイスしてあげてください。最後に「しらんけど」と言ってください",
                ],
                [
                    'role' => 'user',
                    'content' => $request->line
                ]
            ],
        ]);
        $conversation = new Conversation();
        $conversation->line = $request->line;
        $conversation->advice = $result->choices[0]->message->content;
        $user = $request->user();
        if($user){  //ログインしている場合は会話履歴を残す
            $conversation->user_id = $user->id;
            $conversation->save();
        }
        else {
            $conversation->user_id = NULL;
        }
        return response()->json($conversation);
    }
    /**
     * Conversation取得.
     *
     * @param Request $request
     * @return void
     */
    public function fetch(Request $request) {
        $conversation = Conversation::find($request->id);
        return response()->json($conversation);
    }
    /**
     * Conversation更新.
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request) {
        $conversation = Conversation::find($request->id);
        $conversation->update([
            'id' => $request->id,
            'question' => $request->question,
            'answer' => $request->answer,
        ]);
        return response()->json($conversation);
    }
    /**
     * Conversation削除.
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request) {
        $conversation = Conversation::find($request->id);
        $conversation->delete();
        return response()->json();
    }
    /**
     * ログインしたユーザーの投稿を一覧表示
     *
     */
    public function index()
    {
        // ユーザーが認証されているかどうかを確認する
        if (Auth::check()) {
            $user = Auth::user();
            $conversations = $user->conversations; // Userモデルとのリレーションを通じてログインユーザーの投稿一覧を取得
        } else {
            $conversations = "ログイン無し";
        }
        return response()->json($conversations);
    }
    
}   
