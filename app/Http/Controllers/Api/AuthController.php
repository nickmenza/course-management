<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Hash;

class AuthController extends BaseController
{
    public function login(Request $request)
    {
        $this->validator($request);
        $user = User::select()
        ->where('username',$request->username)
        ->first();
        if($user){
            if (Hash::check($request->password,$user->password)){
                
                $token = \Str::random(60);
                $user = User::find($user->id);
                $user->api_token = $token;
                $user->save();

                return response()->json(['status' => 200,'message' => 'เข้าสู่ระบบเรียบร้อย','user' => $user, 'token' => $token]);
            }
        }
        return response()->json([
            'status' => 404,
            'message' => 'UsernameหรือPasswordไม่ถูกต้อง',
            ]);
    }

    public function logout(Request $request)
    {
        # code...
        $user = $request->user();
        $user->api_token = null;
        $user->save();

        return response()->json(['status' => 200,'message' => 'ออกจากระบบสำเร็จ']);

    }

    public function register(Request $request)
    {
        $this->validator($request);
        // $user = User::select()
        //         ->where('email',$request->email)
        //         ->first();
        // if($user){
        //     if (Hash::check($request->password,$user->password)){
        //         return response()->json(['status' => 200,'message' => 'เข้าสู่ระบบเรียบร้อย']);
        //     }
        // }
        // return response()->json([
        //     'status' => 404,
        //     'message' => 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        //     ]);
    }

    public function validator($request)
    {
        $customMessages = [
            'username.required' => 'กรุณากรอก Username',
            'password.required' => 'กรุณากรอก Password',

        ];
        $validate = [
            'username' => 'required',
            'password' => 'required',
        ];
        $validatedData = $request->validate($validate,$customMessages);
        return $validatedData;
    }

    
}
