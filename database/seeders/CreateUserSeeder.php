<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class CreateUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'employee_code' => '0000000',
                'first_name' => 'Administrator',
                'last_name' => 'IIT',
                'department' => 'Computer',
                'email' => 'admin@admin.com',
                'position'=> null,
                'password' => bcrypt('123123'),
                'is_admin' => 1
            ],
            [
                'employee_code' => '6211075',
                'first_name' => 'Jetsada',
                'last_name' => 'Prasitsuwan',
                'department' => 'Computer',
                'email' => 'ice@ice.com',
                'position' => "Programmer",
                'password' => bcrypt('123123'),
                'is_admin' => 1
            ],
        ];

        foreach ($users as $key => $user) {
            User::create($user);
        }
    }
}
