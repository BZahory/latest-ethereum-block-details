export const ALCHEMY_API_KEY = 'GdcbSJ7kItnzjGyEy_9i7fxb6lWPhr4d'; // this would be in .env or through kubernetes secrets if deployed, but I put it here for your convenience

export enum ResponseStatus { // various API states
  Unfetched,
  Loading,
  Fetched,
  Error,
}

export const BLOCK_REFRESH_INTERVAL = 12 * 1000; // 12 seconds

export const REFRESH_BUFFER = 3 * 1000; // 3 seconds
