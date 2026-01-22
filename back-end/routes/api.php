<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\ArticleController;

Route::post('/login', [AdminAuthController::class, 'login']);

Route::get('/artikel', [ArticleController::class, 'index']);
Route::post('/artikel', [ArticleController::class, 'store']);
Route::put('/artikel/{id}', [ArticleController::class, 'update']);
Route::delete('/artikel/{id}', [ArticleController::class, 'destroy']);
