<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PageData;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class PageDatasController extends Controller
{
    // GET /page-data
    public function index(Request $request)
    {
        $type = $request->query('type');

        $query = PageData::query();

        if ($type && $type !== 'all') {
            $query->where('type', $type);
        }

        $data = $query->get();

        return $data;
    }


    // GET /page-data/{id}
    public function show($id)
    {
        $data = PageData::find($id);
        if (!$data) {
            return response()->json(['error' => 'Data not found'], 404);
        }
        return response()->json($data);
    }

    // POST /page-data
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'link' => 'required|string',
                'disc' => 'nullable|string',
                'type' => 'required|string',
                'mediaPath' => 'nullable|string',
                'isActive' => 'boolean',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }



        // Optional: If mediaPath is a file upload
        if ($request->hasFile('mediaPath')) {
            $data['mediaPath'] = $request->file('mediaPath')->store('page_data', 'public');
        }

        $data = PageData::create($validated);

        return response()->json($data, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'link'       => 'required|string|max:255',
            'disc'       => 'nullable|string',
            'type'       => 'required|string|max:100',
            'mediaPath'  => 'nullable|string', // allow file uploads up to 10MB
            'isActive'   => 'boolean',
        ]);

        $pageData = PageData::findOrFail($id); // Fetch the record

        if ($request->hasFile('mediaPath')) {
            $data['mediaPath'] = $request->file('mediaPath')->store('page_data', 'public');
        }

        $pageData->update($data);

        return response()->json($pageData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $pageData = PageData::findOrFail($id); // Fetch the record
        $pageData->delete();

        return response()->json(['message' => 'Page data deleted']);
    }
}
