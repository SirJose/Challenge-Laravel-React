<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\SourceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/newsfeed', [NewsController::class, 'newsfeed']);
    Route::post('/search', [NewsController::class, 'search']);

    Route::get('/getSettings', [SettingsController::class, 'getSettings']);
    Route::post('/saveSettings', [SettingsController::class, 'saveSettings']);

    Route::get('/getSources', [SourceController::class, 'getSources']);
    Route::get('/getCategories', [CategoryController::class, 'getCategories']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/news', [NewsController::class, 'default']);
