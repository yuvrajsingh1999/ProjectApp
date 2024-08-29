<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SystemMenuList;
use App\Models\MenuList;
class ApiController extends Controller
{
    public function getSystemMenu()
    {
        $books = SystemMenuList::all();
        return response()->json($books);
    }
    public function getMenus(Request $request)
    {
        // $book = MenuList::create($request->all());
        // return response()->json($book, 201);
    }
}
