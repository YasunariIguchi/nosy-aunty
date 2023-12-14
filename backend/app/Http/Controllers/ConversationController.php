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
        $line = $request->line;
        $pattern = '/\[LINE\]\s+(.*?)とのトーク履歴/';
        $other = "";
        if (preg_match($pattern, $line, $matches)) {
            $other = $matches[1];
        }
        $me = "";
        $pattern2 = '/\d{2}:\d{2}\s+(.*?)\t/u';
        if (preg_match_all($pattern2, $line, $matches2)) {
            $names = array_unique($matches2[1]);
            foreach($names as $name){
                if ($name != $other) {
                    $me = $name;
                    break;
                }
            }
        }
        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    "role" => "system",
                    "content" => "あなたは関西弁のおばちゃんです。相談者の名前は{$me}といいます。これから送るLINEの会話は、{$me}がマッチングアプリで知り合った{$other}さんとのものですが、結果的に2人は恋人関係になる事ができませんでした。今後のためになるよう、{$me}の方に関西弁でアドバイスしてあげてください。最初の挨拶は不要です。アドバイスの最後に「しらんけど!」と言ってください",
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
