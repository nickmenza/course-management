<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Course;
use App\Models\Category;
use App\Models\User;


use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Carbon\Carbon;
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Course::class, function (Faker $faker) {
    $r_s = rand(1,10);
    $end = Carbon::now()->subDays($r_s);
    $start = Carbon::parse($end)->subDays(rand(1,10));
    return [
        'user_id' => User::where('role_id',2)->inRandomOrder()->first()->id,
        'category_id' => Category::inRandomOrder()->first()->id,
        'subject' => $faker->firstName,
        'name' => $faker->lastName,
        'description' => $faker->name,
        'number_student' => rand(10,50),
        'start' => $start->format('Y-m-d'),
        'end' => $end->format('Y-m-d')
        
    ];
});
