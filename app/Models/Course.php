<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{

    use SoftDeletes;
    protected $table = 'course';
    public $primaryKey = "id";
    public $timestamps = true;
   
    protected $fillable = [
        'subject', 'name', 'description', 'category_id', 'user_id', 'number_student', 'start', 'end'
    ];

    
}
