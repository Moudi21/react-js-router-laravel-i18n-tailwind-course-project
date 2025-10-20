<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class CategoryController extends Controller
{
    public function parentCategoriesWithCourses()
    {
        $categories = Category::whereNull('parentId') // only parent categories
            ->whereHas('children', function ($query) {
                $query->whereIn('name', function ($sub) {
                    $sub->select('categoryName')->from('courses');
                });
            })
            ->with(['children' => function ($query) {
                $query->whereIn('name', function ($sub) {
                    $sub->select('categoryName')->from('courses');
                });
            }])
            ->get();

        return response()->json($categories);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Category::whereNull('parentId')->with('children')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'parentId'  => 'nullable|exists:categories,id',
            'mediaPath' => 'nullable|string|max:255', // can be icon class or file path
            'isActive'  => 'boolean',
        ]);

        // If file upload is provided, save it
        if ($request->hasFile('mediaPath')) {
            $data['mediaPath'] = $request->file('mediaPath')->store('categories', 'public');
        }

        return Category::create($data);

    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return $category->load('children', 'parent');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name'       => 'sometimes|required|string|max:255',
            'parentId'  => 'nullable|exists:categories,id',
            'mediaPath' => 'nullable|string|max:255',
            'isActive'  => 'boolean',
        ]);

        if ($request->hasFile('mediaPath')) {
            $data['mediaPath'] = $request->file('mediaPath')->store('categories', 'public');
        }

        $category->update($data);

        return $category;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}
