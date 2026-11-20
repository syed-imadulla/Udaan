import { mocks } from "../mocks";

const BASE = import.meta.env.VITE_API_URL ?? "";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    if (USE_MOCK) return mocks[path] as T;
    const res = await fetch(BASE + path, {
        headers: { "Content-Type": "application/json" },
        ...init,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? `HTTP ${res.status}`);
    }
    return res.json();
}

export const api = {
    health: () => request<{ status: string }>("/api/health"),
    echo: (message: string) =>
        request<{ message: string; length: number }>("/api/echo", {
            method: "POST",
            body: JSON.stringify({ message }),
        }),
    ask: (prompt: string) =>
        request<{ answer: string }>("/api/ai/ask", {
            method: "POST",
            body: JSON.stringify({ prompt }),
        }),
};
