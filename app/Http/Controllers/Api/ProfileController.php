<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Hash;

class ProfileController extends BaseController
{

    public function index(Request $request)
    {
        # code...
        return $request->user();

    }

    public function save(Request $request)
    {
        # code...
        $this->validator($request);
        $user = $request->user();
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->nickname = $request->nickname;
        $user->birthday = $request->birthday;
        $user->gender = $request->gender;
        $user->save();
        return response()->json(['status' => 200,'message' => 'บันทึก Profile สำเร็จ']);
    }


    public function validator($request)
    {
        $customMessages = [
            'firstname.required' => 'กรุณากรอก Fistname',
            'lastname.required' => 'กรุณากรอก Lastname',

        ];
        $validate = [
            'firstname' => 'required',
            'lastname' => 'required',
        ];
        $validatedData = $request->validate($validate,$customMessages);
        return $validatedData;
    }

    
}
