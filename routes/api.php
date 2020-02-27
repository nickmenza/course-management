<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', 'Api\AuthController@login');
Route::post('/register', 'Api\AuthController@register');

Route::get('/category', 'Api\CategoryController@index');

Route::middleware('auth:api')->get('/logout', 'Api\AuthController@logout');

Route::middleware('auth:api')->resource('/course', 'Api\CourseController');


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:api')->get('/profile', 'Api\ProfileController@index');

Route::middleware('auth:api')->post('/profile-save', 'Api\ProfileController@save');
