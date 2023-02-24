<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Many users can select many categories
    public function users(){
        return $this->belongsToMany(User::class);
    }

    // Many sources can have the same category
    public function sources(){
        return $this->hasMany(Source::class);
    }
    
}
