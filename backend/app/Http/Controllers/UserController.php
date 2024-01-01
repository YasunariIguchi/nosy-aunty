<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $inputs = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255',
                Rule::unique('users')->ignore(Auth::id()),
            ],
        ]);

        // ユーザー情報を更新
        $user = Auth::user();
        $user->fill($inputs);
        $user->save();

        // 更新成功の場合はステータスコード200と更新されたユーザー情報を返す
        return response()->json(['message' => '更新に成功しました。', 'user' => $user], 200);

        // 更新失敗の場合はエラーステータスコードとエラーメッセージを返す
        // 例えば、バリデーションエラーの場合は以下のようにすることができます
        // return response()->json(['error' => 'バリデーションエラーが発生しました。', 'errors' => $validator->errors()], 422);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
