<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Services\ClientService;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;

class ClientController extends Controller
{
    public function __construct(
        protected ClientService $clientService
    ) {}

    public function index(Request $request)
    {
        $clients = Client::query()

            ->when($request->search, function ($query, $search) {

                $query->where('client_name', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%");
            })

            ->latest()

            ->paginate(10)

            ->withQueryString();

        return Inertia::render('Clients/Index', [
            'clients' => $clients,
            'filters' => $request->only('search')
        ]);
    }

    public function create()
    {
        return Inertia::render('Clients/Create');
    }

    public function store(StoreClientRequest $request)
    {
        $this->clientService->store($request->validated());

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client created successfully');
    }

    public function edit(Client $client)
    {
        return Inertia::render('Clients/Edit', [
            'client' => $client
        ]);
    }

    public function update(
        UpdateClientRequest $request,
        Client $client
    ) {
        $this->clientService->update(
            $client,
            $request->validated()
        );

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client updated');
    }

    public function destroy(Client $client)
    {
        $this->clientService->delete($client);

        return redirect()
            ->back()
            ->with('success', 'Client deleted');
    }
}