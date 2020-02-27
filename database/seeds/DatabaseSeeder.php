<?php

use Illuminate\Database\Seeder;
// use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $list = [
            'การเงิน/การลงทุน',
            'อสังหาริมทรัพย์',
            'ธุรกิจ',
            'การตลาด',
            'คอมพิวเตอร์',
            'พัฒนาตัวเอง'
        ];
        
        foreach ($list as $key => $value) {
            # code...
            App\Models\Category::create([
                'category_name' => $value,
            ]);
        }

        App\Models\Role::create([
            'role_name' => 'Student'
        ]);
        App\Models\Role::create([
            'role_name' => 'Instructor'
        ]);

        factory(App\Models\User::class, 50)->create();
        factory(App\Models\Course::class, 50)->create();

        // ->each(function ($user) {
        //     $user->posts()->save(factory(App\Post::class)->make());
        // });
    }
}
