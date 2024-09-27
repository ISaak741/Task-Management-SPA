<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'isaak01',
            'email' => 'isaak01@email.com',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'isaak02',
            'email' => 'isaak02@email.com',
        ]);

        \App\Models\Task::factory(5);
    }
}
