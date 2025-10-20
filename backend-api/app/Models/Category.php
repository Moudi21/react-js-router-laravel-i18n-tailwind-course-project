<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'parentId', 'mediaPath', 'isActive'];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parentId');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parentId');
    }

    // Category.php
    public function courses()
    {
        return $this->hasMany(Course::class);
    }

}