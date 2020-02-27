<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Course;

use Hash;

class CourseController extends BaseController
{

    public function index(Request $request)
    {
        $data = Course::select('course.*','category_name');
        $data = $data->join('category','category.id','course.category_id');

        if($request->has('name')){
            if($request->name){
                $data = $data->where('course.name','like','%'.$request->name.'%');
            }
        }

        if($request->has('date')){
            if($request->date){
                $data = $data->where('course.start','<=',$request->date);
                $data = $data->where('course.end','>=',$request->date);
            }
        }

        if($request->has('user_id')){
            if($request->user_id){
                $data = $data->where('course.user_id',$request->user_id);
                $data = $data->orderBy('course.id','desc');
            }
        }

        return $data->paginate(12);

    }

    public function store(Request $request)
    {
        $this->validator($request);
        $user = $request->user();
        $course = new Course;
        $course->subject = '';
        $course->category_id = $request->category_id;
        $course->user_id = $user->id;
        $course->name = $request->name;
        $course->description = $request->description;
        $course->number_student = $request->number_student;
        $course->start = $request->start;
        $course->end = $request->end;
        $course->save();

        return response()->json(['status' => 200,'message' => 'บันทึก Course สำเร็จ']);
    }

    public function update(Request $request,$id)
    {
        $this->validator($request);
        $user = $request->user();
        $course = Course::find($id);
        $course->category_id = $request->category_id;
        $course->name = $request->name;
        $course->description = $request->description;
        $course->number_student = $request->number_student;
        $course->start = $request->start;
        $course->end = $request->end;
        $course->save();
        return response()->json(['status' => 200,'message' => 'อัพเดท Course สำเร็จ']);

    }    

    public function show($id)
    {
        return Course::find($id);
    }




    public function validator($request)
    {
        $customMessages = [
            'category_id.required' => 'กรุณาเลือก Category ID',
            'name.required' => 'กรุณากรอก Name',
            'description.required' => 'กรุณากรอก Description',
            'number_student.required' => 'กรุณากรอก Number Student',
            'number_student.numeric' => 'กรุณากรอก ตัวเลขเท่านั้น',
            'number_student.between' => 'ห้ามเกิน 100000',
            'start.required' => 'กรุณากรอก Start',
            'end.required' => 'กรุณากรอก End',
        ];
        $validate = [
            'category_id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'number_student' => 'required|numeric|between:1,100000',
            'start' => 'required',
            'end' => 'required'
        ];
        $validatedData = $request->validate($validate,$customMessages);
        return $validatedData;
    }

    
}
