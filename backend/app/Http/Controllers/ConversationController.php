<?php

namespace App\Http\Controllers;

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
    public function create(Request $request) {
       // OpenAIに送信するデータの準備
       $data =OpenAI::chat()->create([
           "model" => "gpt-3.5-turbo",
           "messages" => [
               [
                   "role" => "user",
                   "content" => $request->line,
               ]
           ]
       ]);

        $conversation = new Conversation();
        $conversation->line = $request->line;
        $conversation->advice = $data->choices[0]->message->content;
        // ログインしているかどうかを確認
   /* if (Auth::check()) {
        // ログインしていれば、質問と回答をデータベースに保存
        $conversation->question = $request->question;
        $conversation->answer = $request->answer;
    }*/
        $conversation->save();

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
}
