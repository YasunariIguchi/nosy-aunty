<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    /**
     * Conversation作成.
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request) {
        $conversation = new Conversation();
        $conversation->line = $request->line;
        $conversation->advice = "ここにChatGPTからのアドバイスを入れる";
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
