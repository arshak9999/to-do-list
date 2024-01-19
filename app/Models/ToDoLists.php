<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoLists extends Model
{
    use HasFactory;

    protected $table = "to_do_lists";
    protected $fillable = [
        'title',
        'text',
        'status',
    ];
}
