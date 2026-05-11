import { test, expect, mock, beforeEach, afterEach } from "bun:test";

let cachedTokenPromise: Promise<any> | null = null;
let tokenExpirationTime: number = 0;

let fetchCalls = 0;

async function fetchNewToken() {
  fetchCalls++;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        access_token: "mocked_token_" + fetchCalls,
        expires_in: 3600,
      });
    }, 50);
  }).then((data: any) => {
    tokenExpirationTime = Date.now() + data.expires_in * 1000 - 300000;
    return data;
  });
}

async function getAccessToken() {
  const now = Date.now();

  if (cachedTokenPromise && (tokenExpirationTime === 0 || now < tokenExpirationTime)) {
    return cachedTokenPromise;
  }

  tokenExpirationTime = 0;

  cachedTokenPromise = fetchNewToken().catch((err) => {
    cachedTokenPromise = null;
    throw err;
  });

  return cachedTokenPromise;
}

beforeEach(() => {
  fetchCalls = 0;
  cachedTokenPromise = null;
  tokenExpirationTime = 0;
});

test("should cache concurrent calls and only invoke fetchNewToken once", async () => {
  const [t1, t2, t3] = await Promise.all([
    getAccessToken(),
    getAccessToken(),
    getAccessToken()
  ]);

  expect(t1.access_token).toBe("mocked_token_1");
  expect(t2.access_token).toBe("mocked_token_1");
  expect(t3.access_token).toBe("mocked_token_1");
  expect(fetchCalls).toBe(1);
});

test("should fetch a new token if cache is expired", async () => {
  const t1 = await getAccessToken();
  expect(t1.access_token).toBe("mocked_token_1");
  expect(fetchCalls).toBe(1);

  // Force expiration
  tokenExpirationTime = Date.now() - 1000;

  const t2 = await getAccessToken();
  expect(t2.access_token).toBe("mocked_token_2");
  expect(fetchCalls).toBe(2);
});
