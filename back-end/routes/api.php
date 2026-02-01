<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\LayananController;

// ================= AUTH =================
Route::post('/login', [AdminAuthController::class, 'login']);

// ================= ARTIKEL =================
Route::get('/artikel', [ArticleController::class, 'index']);
Route::post('/artikel', [ArticleController::class, 'store']);
Route::put('/artikel/{id}', [ArticleController::class, 'update']);
Route::delete('/artikel/{id}', [ArticleController::class, 'destroy']);

// ================= ADMIN =================
Route::get('/admin', [AdminController::class, 'index']);
Route::post('/admin', [AdminController::class, 'store']);
Route::post('/admin/{id}', [AdminController::class, 'update']);
Route::delete('/admin/{id}', [AdminController::class, 'destroy']);

// ================= LAYANAN =================
Route::post('/layanan', [LayananController::class, 'store']);
Route::get('/layanan', [LayananController::class, 'index']);
Route::get('/layanan/{id}', [LayananController::class, 'show']);
Route::put('/layanan/{id}', [LayananController::class, 'update']);
Route::put('/layanan/{id}', [LayananController::class, 'updateStatus']);
Route::delete('/layanan/{id}', [LayananController::class, 'destroy']);
