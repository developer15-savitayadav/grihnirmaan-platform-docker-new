import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

type Project = {
    id: number;
    project_code: string;
};

type Message = {
    id: number;
    project_id: number;
    project_code: string;
    sender_name: string;
    sender_role: string;
    message: string;
    created_at: string;
};

export default function Messages({
    projects,
    messages,
}: {
    projects: Project[];
    messages: Message[];
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        customer_project_id: projects[0]?.id ?? '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/portal/messages', {
            onSuccess: () => reset('message'),
        });
    };

    return (
        <AppLayout>
            <Head title="Messages" />

            <main className="min-h-screen bg-[#FDFAF5] py-10">
                <div className="mx-auto max-w-5xl px-4">
                    <h1 className="text-3xl font-bold text-[#1F4E79]">
                        Messages
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Send a message to your home advisor or site supervisor.
                    </p>

                    <form
                        onSubmit={submit}
                        className="mt-8 rounded-3xl border bg-white p-6 shadow-sm"
                    >
                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Select Project
                            </label>

                            <select
                                value={data.customer_project_id}
                                onChange={(e) =>
                                    setData('customer_project_id', Number(e.target.value))
                                }
                                className="mt-2 w-full rounded-xl border-gray-300"
                            >
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.project_code}
                                    </option>
                                ))}
                            </select>

                            {errors.customer_project_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.customer_project_id}
                                </p>
                            )}
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-semibold text-gray-700">
                                Message
                            </label>

                            <textarea
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                rows={4}
                                className="mt-2 w-full rounded-xl border-gray-300"
                                placeholder="Write your message..."
                            />

                            {errors.message && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        <button
                            disabled={processing || projects.length === 0}
                            className="mt-5 rounded-full bg-[#1F4E79] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
                        >
                            Send Message
                        </button>
                    </form>

                    <div className="mt-8 space-y-4">
                        {messages.length === 0 && (
                            <div className="rounded-3xl border bg-white p-8 text-gray-600">
                                No messages yet.
                            </div>
                        )}

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="rounded-3xl border bg-white p-6 shadow-sm"
                            >
                                <div className="flex flex-wrap justify-between gap-3">
                                    <div>
                                        <h2 className="font-bold text-[#1F4E79]">
                                            {message.sender_name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {message.sender_role} · {message.project_code}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-400">
                                        {message.created_at}
                                    </p>
                                </div>

                                <p className="mt-4 text-gray-700">
                                    {message.message}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
