<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConversationController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// conversationのCRUD
Route::middleware([])->group(function () {
    Route::get('conversations', [ConversationController::class, 'index']);
    Route::get('conversation/{id}', [ConversationController::class, 'fetch']);
    Route::post('conversation', [ConversationController::class, 'store']);
    Route::put('conversation/{id}', [ConversationController::class, 'update']);
    Route::delete('conversation/{id}', [ConversationController::class, 'delete']);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

require __DIR__.'/auth.php';
