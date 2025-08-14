<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function index(request $request)
    {
        return json_encode(Client::all());
    }

    public function store(request $request)
    {
        $client = Client::create($request->all());
        return json_encode($client);
    }
}
