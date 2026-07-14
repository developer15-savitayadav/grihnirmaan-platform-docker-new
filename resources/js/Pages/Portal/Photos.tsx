import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

type Photo = {
    id: number;
    project_code: string;
    caption: string | null;
    photo_url: string;
    uploaded_at: string;
};

export default function Photos({ photos }: { photos: Photo[] }) {
    return (
        <AppLayout>
            <Head title="Site Photos" />

            <main className="min-h-screen bg-[#FDFAF5] py-10">
                <div className="mx-auto max-w-7xl px-4">
                    <h1 className="text-3xl font-bold text-[#1F4E79]">
                        Site Photos
                    </h1>

                    <p className="mt-2 text-gray-600">
                        View daily construction progress photos uploaded by your supervisor.
                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {photos.length === 0 && (
                            <div className="rounded-3xl border bg-white p-8 text-gray-600">
                                No site photos uploaded yet.
                            </div>
                        )}

                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="overflow-hidden rounded-3xl border bg-white shadow-sm"
                            >
                                <img
                                    src={photo.photo_url}
                                    alt={photo.caption ?? 'Site photo'}
                                    className="h-64 w-full object-cover"
                                />

                                <div className="p-5">
                                    <h2 className="font-bold text-gray-900">
                                        {photo.caption ?? 'Site Update'}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Project: {photo.project_code}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Uploaded: {photo.uploaded_at}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
