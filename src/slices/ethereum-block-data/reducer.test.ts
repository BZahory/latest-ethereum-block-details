import { ResponseStatus } from '../../constants';
import {
  CLEAR_SELECTED_TRANSACTION,
  GET_ERC_20_TRANSFERS,
  GET_LATEST_BLOCK,
  GET_LATEST_ETHER_PRICE,
} from './constants';
import reducer, { ReducerState } from './reducer';

const initialState: ReducerState = {
  latestTransactions: {
    value: [],
    error: undefined,
    status: ResponseStatus.Unfetched,
    blockNumber: undefined,
  },
  ethPrice: { value: undefined, error: undefined, status: ResponseStatus.Unfetched },
  selectedErc20Data: {
    transfers: [],
    error: undefined,
    status: ResponseStatus.Unfetched,
  },
};

describe('GET_LATEST_BLOCK', () => {
  it('SUCCESS', () => {
    const loadState = reducer(initialState, {
      type: GET_LATEST_BLOCK.LOADING,
    });
    expect(loadState.latestTransactions.status).toBe(ResponseStatus.Loading);
    expect(loadState.latestTransactions.error).toBe(undefined);
    expect(loadState.latestTransactions.value).toEqual([]);
    expect(loadState.latestTransactions.blockNumber).toEqual(undefined);

    const successState = reducer(initialState, {
      type: GET_LATEST_BLOCK.SUCCESS,
      payload: { transactions: ['test1', 'test2'], blockNumber: 5050 },
    });
    expect(successState.latestTransactions.status).toBe(ResponseStatus.Fetched);
    expect(successState.latestTransactions.error).toBe(undefined);
    expect(successState.latestTransactions.value).toEqual(['test1', 'test2']);
    expect(successState.latestTransactions.blockNumber).toEqual(5050);
  });

  it('ERROR', () => {
    const loadState = reducer(initialState, {
      type: GET_LATEST_BLOCK.LOADING,
    });
    expect(loadState.latestTransactions.status).toBe(ResponseStatus.Loading);
    expect(loadState.latestTransactions.error).toBe(undefined);
    expect(loadState.latestTransactions.value).toEqual([]);
    expect(loadState.latestTransactions.blockNumber).toEqual(undefined);

    const failState = reducer(initialState, {
      type: GET_LATEST_BLOCK.ERROR,
      payload: { error: { message: 'test', key: 'test2', code: 1 } },
    });
    expect(failState.latestTransactions.status).toBe(ResponseStatus.Error);
    expect(failState.latestTransactions.error).toEqual({ message: 'test', key: 'test2', code: 1 });
    expect(failState.latestTransactions.value).toEqual([]);
    expect(failState.latestTransactions.blockNumber).toEqual(undefined);
  });
});

describe('GET_LATEST_ETHER_PRICE', () => {
  it('SUCCESS', () => {
    const loadState = reducer(initialState, {
      type: GET_LATEST_ETHER_PRICE.LOADING,
    });
    expect(loadState.ethPrice.status).toBe(ResponseStatus.Loading);
    expect(loadState.ethPrice.error).toBe(undefined);
    expect(loadState.ethPrice.value).toEqual(undefined);

    const successState = reducer(initialState, {
      type: GET_LATEST_ETHER_PRICE.SUCCESS,
      payload: { price: 2000 },
    });
    expect(successState.ethPrice.status).toBe(ResponseStatus.Fetched);
    expect(successState.ethPrice.error).toBe(undefined);
    expect(successState.ethPrice.value).toEqual(2000);
  });

  it('ERROR', () => {
    const loadState = reducer(initialState, {
      type: GET_LATEST_ETHER_PRICE.LOADING,
    });
    expect(loadState.ethPrice.status).toBe(ResponseStatus.Loading);
    expect(loadState.ethPrice.error).toBe(undefined);
    expect(loadState.ethPrice.value).toEqual(undefined);

    const failState = reducer(initialState, {
      type: GET_LATEST_ETHER_PRICE.ERROR,
      payload: { error: { message: 'test', key: 'test2', code: 1 } },
    });
    expect(failState.ethPrice.status).toBe(ResponseStatus.Error);
    expect(failState.ethPrice.error).toEqual({ message: 'test', key: 'test2', code: 1 });
    expect(failState.ethPrice.value).toEqual(undefined);
  });
});

describe('GET_ERC_20_TRANSFERS', () => {
  it('SUCCESS', () => {
    const loadState = reducer(initialState, {
      type: GET_ERC_20_TRANSFERS.LOADING,
    });
    expect(loadState.selectedErc20Data.status).toBe(ResponseStatus.Loading);
    expect(loadState.selectedErc20Data.error).toBe(undefined);
    expect(loadState.selectedErc20Data.transfers).toEqual([]);

    const successState = reducer(initialState, {
      type: GET_ERC_20_TRANSFERS.SUCCESS,
      payload: { transfers: ['test1', 'test2'] },
    });
    expect(successState.selectedErc20Data.status).toBe(ResponseStatus.Fetched);
    expect(successState.selectedErc20Data.error).toBe(undefined);
    expect(successState.selectedErc20Data.transfers).toEqual(['test1', 'test2']);
  });

  it('ERROR', () => {
    const loadState = reducer(initialState, {
      type: GET_ERC_20_TRANSFERS.LOADING,
    });
    expect(loadState.selectedErc20Data.status).toBe(ResponseStatus.Loading);
    expect(loadState.selectedErc20Data.error).toBe(undefined);
    expect(loadState.selectedErc20Data.transfers).toEqual([]);

    const failState = reducer(initialState, {
      type: GET_ERC_20_TRANSFERS.ERROR,
      payload: { error: { message: 'test', key: 'test2', code: 1 } },
    });
    expect(failState.selectedErc20Data.status).toBe(ResponseStatus.Error);
    expect(failState.selectedErc20Data.error).toEqual({ message: 'test', key: 'test2', code: 1 });
    expect(failState.selectedErc20Data.transfers).toEqual([]);
  });
});

test('CLEAR_SELECTED_TRANSACTION', () => {
  const state = reducer(
    {
      ...initialState,
      selectedErc20Data: { status: 3, error: 'error', transfers: ['transfer'] as any },
    },
    {
      type: CLEAR_SELECTED_TRANSACTION,
      payload: { transfers: ['test1', 'test2'] },
    },
  );
  expect(state.selectedErc20Data.status).toBe(ResponseStatus.Unfetched);
  expect(state.selectedErc20Data.error).toBe(undefined);
  expect(state.selectedErc20Data.transfers).toEqual([]);
});
