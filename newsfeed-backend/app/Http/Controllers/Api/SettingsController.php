<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{

    function getSettings(Request $request){
        $user = Auth::user();

        // Get selected sources
        $sources = $user->sources()->get()->toArray();
        $sources = array_map(fn ($source) => $source['id'], $sources);

        // Get selected categories
        $categories = $user->categories()->get()->toArray();
        $categories = array_map(fn ($category) => $category['id'], $categories);

        return response(compact('sources','categories'));
    }


    function saveSettings(Request $request){

        $user = Auth::user();

        $sources = $request->input('sources');
        $categories = $request->input('categories');

        $user->sources()->sync($sources);
        $user->categories()->sync($categories);

        return response()->json([ 'status' => 'ok' ]);
    }
}
