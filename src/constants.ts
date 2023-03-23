export const ALCHEMY_API_KEY = 'GNauZOAEhjOc34zQQqQuXorOlmC6wJ6W'; // this would be in .env or through kubernetes secrets if deployed, but I put it here for your convenience

export enum ResponseStatus { // various API states
  Unfetched,
  Loading,
  Fetched,
  Error,
}

export const BLOCK_REFRESH_INTERVAL = 12 * 1000; // 12 seconds
