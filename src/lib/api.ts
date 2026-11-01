const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type ApiMeta = { page: number; limit: number; total: number; totalPages: number };

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...(init?.body ? { "Content-Type": "application/json" } : {}), ...init?.headers },
    signal: init?.signal ?? AbortSignal.timeout(10000),
  });
  if (response.status === 204) return undefined as T;
  const body = (await response.json()) as { success: boolean; data?: T; message?: string };
  if (!response.ok || !body.success) throw new ApiError(body.message ?? "The request could not be completed.", response.status);
  return body.data as T;
}

export async function apiFetchEnvelope<T>(path: string, init?: RequestInit): Promise<{ data: T; meta?: ApiMeta }> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...(init?.body ? { "Content-Type": "application/json" } : {}), ...init?.headers },
    signal: init?.signal ?? AbortSignal.timeout(10000),
  });
  const body = (await response.json()) as { success: boolean; data?: T; meta?: ApiMeta; message?: string };
  if (!response.ok || !body.success || body.data === undefined) throw new ApiError(body.message ?? "The request could not be completed.", response.status);
  return { data: body.data, meta: body.meta };
}
