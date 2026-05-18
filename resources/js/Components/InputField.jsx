export default function InputField({
    label,
    value,
    onChange,
    error,
    type = "text",
    placeholder = "",
    required = false,
    className = "",
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

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...props}
            />

            {error && (
                <p className="text-red-600 text-sm mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}