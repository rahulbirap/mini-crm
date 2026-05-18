import { useForm } from '@inertiajs/react';
import InputField from '@/Components/InputField';
import SelectField from '@/Components/SelectField';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ client = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        client_name: client?.client_name || '',
        company_name: client?.company_name || '',
        email: client?.email || '',
        phone: client?.phone || '',
        status: client?.status || 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        client
            ? put(route('clients.update', client.id))
            : post(route('clients.store'));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <InputField
                    label="Client Name"
                    type="text"
                    placeholder="Enter client name"
                    value={data.client_name}
                    onChange={(e) => setData('client_name', e.target.value)}
                />
                {errors.client_name && <InputError message={errors.client_name} />}
            </div>

            <div>
                <InputField
                    label="Company Name"
                    type="text"
                    placeholder="Enter company name"
                    value={data.company_name}
                    onChange={(e) => setData('company_name', e.target.value)}
                />
                {errors.company_name && <InputError message={errors.company_name} />}
            </div>

            <div>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <InputError message={errors.email} />}
            </div>

            <div>
                <InputField
                    label="Phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                />
                {errors.phone && <InputError message={errors.phone} />}
            </div>

            <div>
                <SelectField
                    label="Status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </SelectField>
                {errors.status && <InputError message={errors.status} />}
            </div>

            <PrimaryButton disabled={processing}>
                {processing ? 'Saving...' : client ? 'Update Client' : 'Create Client'}
            </PrimaryButton>
        </form>
    );
}