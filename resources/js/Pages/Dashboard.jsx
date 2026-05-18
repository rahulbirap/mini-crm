import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({
    totalClients,
    totalCampaigns,
    liveCampaigns
}) {
    return (
        <AuthenticatedLayout>
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wide">Total Clients</p>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">{totalClients}</p>
                                </div>
                                <div className="text-blue-500 text-4xl">📊</div>
                            </div>
                            <Link
                                href={route('clients.index')}
                                className="inline-block mt-4 text-blue-600 hover:text-blue-800 text-sm"
                            >
                                View all clients →
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wide">Total Campaigns</p>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">{totalCampaigns}</p>
                                </div>
                                <div className="text-green-500 text-4xl">📈</div>
                            </div>
                            <Link
                                href={route('campaigns.index')}
                                className="inline-block mt-4 text-blue-600 hover:text-blue-800 text-sm"
                            >
                                View all campaigns →
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wide">Live Campaigns</p>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">{liveCampaigns}</p>
                                </div>
                                <div className="text-yellow-500 text-4xl">🚀</div>
                            </div>
                            <Link
                                href={route('campaigns.index', { status: 'Live' })}
                                className="inline-block mt-4 text-blue-600 hover:text-blue-800 text-sm"
                            >
                                View live campaigns →
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <Link
                                    href={route('clients.create')}
                                    className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    + Create Client
                                </Link>
                                <Link
                                    href={route('campaigns.create')}
                                    className="block w-full px-4 py-2 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                >
                                    + Create Campaign
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">System Info</h2>
                            <div className="text-gray-600 text-sm space-y-2">
                                <p><strong>Welcome to Mini CRM!</strong></p>
                                <p>Manage your clients and campaigns efficiently with our platform.</p>
                                <p>Use the navigation menu to access all features.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}