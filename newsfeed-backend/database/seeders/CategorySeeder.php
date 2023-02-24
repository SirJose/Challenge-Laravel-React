<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['business','entertainment','general','health','science','sports','technology'];

        foreach($categories as $newcategory){
            $category = new Category;
            $category->name = $newcategory;
            $category->save();
        }
    }
}
