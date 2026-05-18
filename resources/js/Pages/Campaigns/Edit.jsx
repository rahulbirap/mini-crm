import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Form';

export default function Edit({ campaign, clients }) {
    return (
        <AuthenticatedLayout>
            <div className="py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 md:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('campaigns.index')}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            ← Back to Campaigns
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Campaign</h1>
                        <Form campaign={campaign} clients={clients} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}