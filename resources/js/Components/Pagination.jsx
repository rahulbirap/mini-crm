import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex items-center justify-between gap-2">
            {links.map((link, index) => (
                <div key={index}>
                    {link.url === null ? (
                        <span className="px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-lg cursor-not-allowed">
                            {link.label === '&laquo; Previous' ? '← Previous' : link.label === 'Next &raquo;' ? 'Next →' : link.label}
                        </span>
                    ) : (
                        <Link
                            href={link.url}
                            className={`px-3 py-2 text-sm rounded-lg transition ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: link.label === '&laquo; Previous' ? '← Previous' : link.label === 'Next &raquo;' ? 'Next →' : link.label
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}