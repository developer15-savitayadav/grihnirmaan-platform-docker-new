import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Download, FileText } from 'lucide-react';

type Document = {
    id: number;
    title: string;
    project_code: string;
    uploaded_at: string;
    download_url: string;
};

export default function Documents({ documents }: { documents: Document[] }) {
    return (
        <AppLayout>
            <Head title="Project Documents" />

            <main className="min-h-screen bg-[#FDFAF5] py-10">
                <div className="mx-auto max-w-7xl px-4">
                    <h1 className="text-3xl font-bold text-[#1F4E79]">
                        Project Documents
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Download your agreements, approvals, plans and receipts.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {documents.length === 0 && (
                            <div className="rounded-3xl border bg-white p-8 text-gray-600">
                                No documents uploaded yet.
                            </div>
                        )}

                        {documents.map((document) => (
                            <div
                                key={document.id}
                                className="rounded-3xl border bg-white p-6 shadow-sm"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9E2F3] text-[#1F4E79]">
                                    <FileText />
                                </div>

                                <h2 className="mt-4 text-lg font-bold text-gray-900">
                                    {document.title}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Project: {document.project_code}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Uploaded: {document.uploaded_at}
                                </p>

                                <a
                                    href={document.download_url}
                                    target="_blank"
                                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1F4E79] px-5 py-2 text-sm font-semibold text-white"
                                >
                                    <Download className="h-4 w-4" />
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
