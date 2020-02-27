<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Category;
use Hash;

class CategoryController extends BaseController
{

    public function index(Request $request)
    {
        return Category::get();

    }

}
