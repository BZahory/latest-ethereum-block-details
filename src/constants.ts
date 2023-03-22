export const ALCHEMY_API_KEY = 'GNauZOAEhjOc34zQQqQuXorOlmC6wJ6W'; // this would be in .env or through kubernetes secrets if deployed, but I put it here for your convenience

export enum ResponseStatus {
  Unfetched,
  Loading,
  Fetched,
  Error,
}
