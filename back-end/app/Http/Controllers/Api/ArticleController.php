<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;   // ⬅️ INI YANG KURANG

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(
            Article::orderBy('tgl_post', 'desc')->limit(6)->get()
        );
    }
}
