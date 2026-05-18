import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import InputField from '@/Components/InputField';
import Pagination from '@/Components/Pagination';
import StatusBadge from '@/Components/StatusBadge';
import toast from 'react-hot-toast';

export default function Index({ clients, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        window.location = route('clients.index', { search });
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout>
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                        <Link
                            href={route('clients.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            + Add Client
                        </Link>
                    </div>

                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex gap-2">
                            <InputField
                                type="text"
                                placeholder="Search by name or company..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1"
                            />
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {clients.data.length > 0 ? (
                                    clients.data.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.client_name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{client.company_name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{client.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{client.phone}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={client.status} />
                                            </td>
                                            <td className="px-6 py-4 text-sm space-x-2">
                                                <Link
                                                    href={route('clients.edit', client.id)}
                                                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route('clients.destroy', client.id)}
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
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No clients found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {clients.last_page > 1 && (
                        <div className="mt-6">
                            <Pagination links={clients.links} />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}