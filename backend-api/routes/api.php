<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::middleware(['auth:sanctum'])->group(function () {
    // ...

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::prefix('profile')->group(function () {
        Route::put('/update', [UserController::class, 'update']);
        Route::put('/password', [UserController::class, 'updatePassword']);
        Route::post('/photo', [UserController::class, 'updatePhoto']);
        Route::delete('/photo', [UserController::class, 'deletePhoto']);
    });
});