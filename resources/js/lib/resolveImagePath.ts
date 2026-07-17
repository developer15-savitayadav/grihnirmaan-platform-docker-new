export function resolveImagePath(
    path?: string | null,
    fallback: string | undefined = undefined,
): string | undefined {
    if (!path) return fallback;

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    if (path.startsWith("/storage/")) {
        return path;
    }

    if (path.startsWith("storage/")) {
        return `/${path}`;
    }

    if (path.startsWith("public/storage/")) {
        return `/${path.replace("public/", "")}`;
    }

    if (path.startsWith("uploads/") || path.startsWith("/uploads/")) {
        return path.startsWith("/") ? path : `/${path}`;
    }

    return `/storage/${path}`;
}