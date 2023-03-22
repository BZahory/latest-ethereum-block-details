export const createAsyncTypeObject = (baseConstant: string) => ({
  LOADING: `${baseConstant}_LOADING`,
  SUCCESS: `${baseConstant}_SUCCESS`,
  ERROR: `${baseConstant}_ERROR`,
});

export const GET_LATEST_BLOCK = createAsyncTypeObject('GET_LATEST_BLOCK');
