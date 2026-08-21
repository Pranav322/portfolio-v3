const pendingRequests = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method?.toUpperCase() || 'GET';

  if (method !== 'GET') {
    return fetch(url, options).then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    });
  }

  if (pendingRequests.has(url)) {
    return pendingRequests.get(url)!;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      pendingRequests.delete(url);
      throw error;
    });

  pendingRequests.set(url, promise);

  promise.finally(() => {
    pendingRequests.delete(url);
  });

  return promise;
}
