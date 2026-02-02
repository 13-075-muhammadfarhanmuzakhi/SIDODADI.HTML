<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\ArtikelController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\LayananController;
use App\Http\Controllers\Api\PengumumanController;

// ================= AUTH =================
Route::post('/login', [AdminAuthController::class, 'login']);

// ================= ARTIKEL =================
Route::get('/artikel', [ArtikelController::class, 'index']);
Route::get('/artikel/{id}', [ArtikelController::class, 'show']);
Route::post('/artikel', [ArtikelController::class, 'store']);
Route::put('/artikel/{id}', [ArtikelController::class, 'update']);
Route::delete('/artikel/{id}', [ArtikelController::class, 'destroy']);

// ================= ADMIN =================
Route::get('/admin', [AdminController::class, 'index']);
Route::post('/admin', [AdminController::class, 'store']);
Route::post('/admin/{id}', [AdminController::class, 'update']);
Route::delete('/admin/{id}', [AdminController::class, 'destroy']);

// ================= LAYANAN =================
Route::post('/layanan', [LayananController::class, 'store']);
Route::post('/layanan/keramaian', [LayananController::class, 'storeKeramaianPublic']);
Route::post('/layanan/pengantar-kk', [LayananController::class, 'storePengantarKK']);
Route::get('/layanan/cek-status', [LayananController::class, 'cekStatus']);
Route::get('/layanan', [LayananController::class, 'index']);
Route::get('/layanan/{id}', [LayananController::class, 'show']);
Route::put('/layanan/{id}', [LayananController::class, 'update']);
Route::delete('/layanan/{id}', [LayananController::class, 'destroy']);

// PUBLIK
Route::get('/pengumuman', [PengumumanController::class, 'index']);
Route::get('/pengumuman/{id}', [PengumumanController::class, 'show']);

// ADMIN
Route::get('/pengumuman-home', [PengumumanController::class, 'home']);
Route::get('/admin/pengumuman', [PengumumanController::class, 'adminIndex']);
Route::post('/pengumuman', [PengumumanController::class, 'store']);
Route::put('/pengumuman/{id}', [PengumumanController::class, 'update']);
Route::delete('/pengumuman/{id}', [PengumumanController::class, 'destroy']);

