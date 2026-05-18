export default function SelectField({
    label,
    value,
    onChange,
    children,
    required = false,
    className = '',
    ...props
}) {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-600"> *</span>}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...props}
            >
                {children}
            </select>
        </div>
    );
}