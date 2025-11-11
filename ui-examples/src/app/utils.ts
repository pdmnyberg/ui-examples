import { notFound } from "next/navigation";

export type ErrorResult = {
  error: string;
  httpStatus?: number;
}

class FetchError extends Error {
  private _httpStatus?: number;

  constructor(msg: string, httpStatus?: number) {
    super(msg)
    this._httpStatus = httpStatus;
  }

  get httpStatus() {
    return this._httpStatus;
  }
}

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  let errorText: string | null = null;
  if (response.ok) {
    return await response.json() as T
  } else {
    try {
      const errorData = await response.json() as ErrorResult;
      errorText = errorData.error;
      throw new FetchError(
        `${errorData.error}: (${response.status}, ${response.statusText}): ${url}`,
        response.status
      );
    } catch {}
  }
  const baseError = `(${response.status}, ${response.statusText}): ${url}`
  const error = errorText ? `${errorText}: ${baseError}` : baseError;
  throw new FetchError(error, response.status);
}


export function requiredOrNotFound(error: ErrorResult | null) {
  if (error && error.httpStatus === 404) {
    notFound()
  }
}


export function downloadData(data: string, mimeType: string, fileName: string) {
  const blob = new Blob([data], {type: mimeType});
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
  window.URL.revokeObjectURL(url);
}