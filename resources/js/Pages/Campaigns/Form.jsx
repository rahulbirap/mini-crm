import { useForm } from '@inertiajs/react';
import InputField from '@/Components/InputField';
import SelectField from '@/Components/SelectField';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ campaign = null, clients = [] }) {
    const { data, setData, post, put, processing, errors } = useForm({
        campaign_name: campaign?.campaign_name || '',
        client_id: campaign?.client_id || '',
        budget: campaign?.budget || '',
        start_date: campaign?.start_date || '',
        end_date: campaign?.end_date || '',
        campaign_status: campaign?.campaign_status || 'Live',
    });

    const submit = (e) => {
        e.preventDefault();
        campaign
            ? put(route('campaigns.update', campaign.id))
            : post(route('campaigns.store'));
    };

    const statuses = ['Live', 'Paused', 'Completed', 'Cancelled'];

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <SelectField
                    label="Client"
                    value={data.client_id}
                    onChange={(e) => setData('client_id', e.target.value)}
                >
                    <option value="">Select a client</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>
                            {client.client_name}
                        </option>
                    ))}
                </SelectField>
                {errors.client_id && <InputError message={errors.client_id} />}
            </div>

            <div>
                <InputField
                    label="Campaign Name"
                    type="text"
                    placeholder="Enter campaign name"
                    value={data.campaign_name}
                    onChange={(e) => setData('campaign_name', e.target.value)}
                />
                {errors.campaign_name && <InputError message={errors.campaign_name} />}
            </div>

            <div>
                <InputField
                    label="Budget"
                    type="number"
                    step="0.01"
                    placeholder="Enter budget amount"
                    value={data.budget}
                    onChange={(e) => setData('budget', e.target.value)}
                />
                {errors.budget && <InputError message={errors.budget} />}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <InputField
                        label="Start Date"
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                    />
                    {errors.start_date && <InputError message={errors.start_date} />}
                </div>
                <div>
                    <InputField
                        label="End Date"
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                    />
                    {errors.end_date && <InputError message={errors.end_date} />}
                </div>
            </div>

            <div>
                <SelectField
                    label="Status"
                    value={data.campaign_status}
                    onChange={(e) => setData('campaign_status', e.target.value)}
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </SelectField>
                {errors.campaign_status && <InputError message={errors.campaign_status} />}
            </div>

            <PrimaryButton disabled={processing}>
                {processing ? 'Saving...' : campaign ? 'Update Campaign' : 'Create Campaign'}
            </PrimaryButton>
        </form>
    );
}