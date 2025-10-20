<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'id',
        'title',
        'provider',
        'date',
        'users',
        'rating',
        'image',
        'link',
        'categoryName',
        'platform',
        'price',
        'disc',
        'isActive',
    ];
}
