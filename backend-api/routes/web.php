<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\PageDatasController;
use App\Http\Controllers\CourseController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::apiResource('page-data', PageDatasController::class);

Route::middleware('api')->apiResource('category', CategoryController::class);
Route::middleware('api')->get('/category-courses', [CategoryController::class, 'parentCategoriesWithCourses']);

Route::middleware(['auth:sanctum'])->apiResource('courses', CourseController::class);

Route::get('/courses', [CourseController::class, 'index']);

require __DIR__.'/auth.php';
