const cache = new Map<string, Promise<any>>();

/**
 * Deduplicates concurrent GET requests to the same URL by caching the Promise.
 * Prevents sibling components from triggering duplicate network requests.
 */
export function deduplicatedFetchJSON<T = any>(url: string): Promise<T> {
  if (cache.has(url)) {
    return cache.get(url)!;
  }

  const promise = fetch(url)
    .then(async response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      cache.delete(url);
      throw error;
    })
    .finally(() => {
      // Clear from cache after a short delay so future requests (e.g. polling) work
      setTimeout(() => {
        if (cache.get(url) === promise) {
          cache.delete(url);
        }
      }, 500);
    });

  cache.set(url, promise);
  return promise;
}
