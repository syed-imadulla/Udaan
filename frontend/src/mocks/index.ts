export const mocks: Record<string, unknown> = {
    "/api/health": { status: "ok (mock)" },
    "/api/echo": { message: "hello", length: 5 },
    "/api/ai/ask": { answer: "This is a mock AI answer." },
};
