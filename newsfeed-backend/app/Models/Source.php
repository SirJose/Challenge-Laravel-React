<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    use HasFactory;

    // Many users can select many sources
    public function users(){
        return $this->belongsToMany(User::class);
    }

    // Sources have one category
    public function category(){
        return $this->belongsTo(Category::class);
    }
}
