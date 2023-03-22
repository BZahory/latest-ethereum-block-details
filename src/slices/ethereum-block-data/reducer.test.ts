import { ResponseStatus } from '../../constants';
import { GET_LATEST_BLOCK } from './constants';
import reducer from './reducer';

const initialState = {
  latestTransactions: { value: [], error: undefined, status: ResponseStatus.Unfetched },
};

describe('GET_LATEST_BLOCK', () => {
  it('SUCCESS', () => {
    const loadState = reducer(initialState, {
      type: GET_LATEST_BLOCK.LOADING,
    });
    expect(loadState.latestTransactions.status).toBe(ResponseStatus.Loading);
    expect(loadState.latestTransactions.error).toBe(undefined);
    expect(loadState.latestTransactions.value).toEqual([]);

    const successState = reducer(initialState, {
      type: GET_LATEST_BLOCK.SUCCESS,
      payload: { transactions: ['test1', 'test2'] },
    });
    expect(successState.latestTransactions.status).toBe(ResponseStatus.Fetched);
    expect(successState.latestTransactions.error).toBe(undefined);
    expect(successState.latestTransactions.value).toEqual(['test1', 'test2']);
  });

  it('ERROR', () => {
    const loadState = reducer(initialState, {
      type: GET_LATEST_BLOCK.LOADING,
    });
    expect(loadState.latestTransactions.status).toBe(ResponseStatus.Loading);
    expect(loadState.latestTransactions.error).toBe(undefined);
    expect(loadState.latestTransactions.value).toEqual([]);

    const failState = reducer(initialState, {
      type: GET_LATEST_BLOCK.ERROR,
      payload: { error: { message: 'test', key: 'test2', code: 1 } },
    });
    expect(failState.latestTransactions.status).toBe(ResponseStatus.Error);
    expect(failState.latestTransactions.error).toEqual({ message: 'test', key: 'test2', code: 1 });
    expect(failState.latestTransactions.value).toEqual([]);
  });
});
