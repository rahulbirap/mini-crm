import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import InputField from '@/Components/InputField';
import SelectField from '@/Components/SelectField';
import Pagination from '@/Components/Pagination';
import StatusBadge from '@/Components/StatusBadge';
import toast from 'react-hot-toast';

export default function Index({ campaigns, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (status) params.append('status', status);
        window.location = route('campaigns.index') + (params.toString() ? '?' + params.toString() : '');
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const statuses = ['Live', 'Paused', 'Completed', 'Cancelled'];

    return (
        <AuthenticatedLayout>
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
                        <Link
                            href={route('campaigns.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            + Add Campaign
                        </Link>
                    </div>

                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex gap-2">
                            <InputField
                                type="text"
                                placeholder="Search by campaign name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1"
                            />
                            <SelectField
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                {statuses.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </SelectField>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Campaign</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Budget</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Start Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">End Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {campaigns.data.length > 0 ? (
                                    campaigns.data.map((campaign) => (
                                        <tr key={campaign.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{campaign.campaign_name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{campaign.client?.client_name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">${campaign.budget}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(campaign.start_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(campaign.end_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={campaign.campaign_status} />
                                            </td>
                                            <td className="px-6 py-4 text-sm space-x-2">
                                                <Link
                                                    href={route('campaigns.edit', campaign.id)}
                                                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route('campaigns.destroy', campaign.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                                    onClick={(e) => !confirm('Are you sure?') && e.preventDefault()}
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                            No campaigns found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {campaigns.last_page > 1 && (
                        <div className="mt-6">
                            <Pagination links={campaigns.links} />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}