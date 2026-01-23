<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AdminController;



Route::post('/login', [AdminAuthController::class, 'login']);

Route::get('/artikel', [ArticleController::class, 'index']);
Route::post('/artikel', [ArticleController::class, 'store']);
Route::put('/artikel/{id}', [ArticleController::class, 'update']);
Route::delete('/artikel/{id}', [ArticleController::class, 'destroy']);

Route::get('/admin', [AdminController::class, 'index']);
Route::post('/admin', [AdminController::class, 'store']);
Route::post('/admin/{id}', [AdminController::class, 'update']);
Route::delete('/admin/{id}', [AdminController::class, 'destroy']);
