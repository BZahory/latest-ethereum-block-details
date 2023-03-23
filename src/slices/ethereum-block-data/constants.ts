const createAsyncTypeObject = (baseConstant: string) => ({
  LOADING: `${baseConstant}_LOADING`,
  SUCCESS: `${baseConstant}_SUCCESS`,
  ERROR: `${baseConstant}_ERROR`,
});

export const GET_LATEST_BLOCK = createAsyncTypeObject('GET_LATEST_BLOCK');

export const GET_LATEST_ETHER_PRICE = createAsyncTypeObject('GET_LATEST_ETHER_PRICE');

export const GET_ERC_20_TRANSFERS = createAsyncTypeObject('GET_ERC_20_TRANSFERS');

export const CLEAR_SELECTED_TRANSACTION = 'CLEAR_SELECTED_TRANSACTION_SRC_20_DATA';
