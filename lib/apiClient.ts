const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

interface RequestOptions extends RequestInit {
    auth?: boolean;
}

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { auth = false, headers, ...rest } = options;

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...rest,
        headers: {
            "Content-Type": "application/json",
            ...(auth ? { "X-API-Key": API_KEY } : {}),
            ...headers,
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ detail: response.statusText }));
        throw new ApiError(errorBody.detail ?? "Lỗi không xác định từ server", response.status);
    }

    if (response.status === 204) return undefined as T;

    return response.json() as Promise<T>;
}

export const apiClient = {
    get: <T>(path: string, auth = false) => request<T>(path, { method: "GET", auth }),
    post: <T>(path: string, body: unknown, auth = true) =>
        request<T>(path, { method: "POST", body: JSON.stringify(body), auth }),
    patch: <T>(path: string, body: unknown, auth = true) =>
        request<T>(path, { method: "PATCH", body: JSON.stringify(body), auth }),
};