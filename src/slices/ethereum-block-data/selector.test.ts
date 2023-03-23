import { ResponseStatus } from '../../constants';
import { getLatestEthereumBlockTransactions, getLatestEtherPrice } from './selector';

const initialState = {
  latestTransactions: {
    value: ['test', 'test'] as any,
    error: 'error',
    status: ResponseStatus.Fetched,
    blockNumber: 500,
  },
  ethPrice: {
    value: 1500,
    error: 'error2',
    status: ResponseStatus.Fetched,
  },
};

test('getLatestEthereumBlockTransactions()', () => {
  for (let i = 0; i < 2; i++) {
    // loop ensures selector purity
    const { status, transactions, blockNumber } = getLatestEthereumBlockTransactions({
      ethereumBlockDataReducer: initialState,
    });
    expect(status).toBe(ResponseStatus.Fetched);
    expect(transactions).toEqual(initialState.latestTransactions.value);
    expect(blockNumber).toEqual(initialState.latestTransactions.blockNumber);
  }
});

test('getLatestEtherPrice()', () => {
  for (let i = 0; i < 2; i++) {
    // loop ensures selector purity
    const { status, price } = getLatestEtherPrice({
      ethereumBlockDataReducer: initialState,
    });
    expect(status).toBe(ResponseStatus.Fetched);
    expect(price).toEqual(initialState.ethPrice.value);
  }
});
