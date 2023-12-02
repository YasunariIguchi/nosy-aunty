<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConversationController;

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
Route::middleware('auth')->group(function () {
    Route::get('conversation', [ConversationController::class, 'fetch']);
    Route::post('conversation', [ConversationController::class, 'store']);
    Route::put('conversation', [ConversationController::class, 'update']);
    Route::delete('conversation', [ConversationController::class, 'delete']);
});

require __DIR__.'/auth.php';
