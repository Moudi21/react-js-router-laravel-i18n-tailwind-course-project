<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageData extends Model
{
    protected $fillable = [
        'name', 'link', 'disc', 'type', 'mediaPath', 'isActive'
    ];
}
