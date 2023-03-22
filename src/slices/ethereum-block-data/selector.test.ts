import { ResponseStatus } from '../../constants';
import { getLatestEthereumBlockTransactions } from './selector';

const initialState = {
  latestTransactions: {
    value: ['test', 'test'] as any,
    error: 'error',
    status: ResponseStatus.Fetched,
  },
};

test('getLatestEthereumBlockTransactions()', () => {
  for (let i = 0; i < 2; i++) {
    // loop ensures selector purity
    const { status, transactions } = getLatestEthereumBlockTransactions({
      ethereumBlockDataReducer: initialState,
    });
    expect(status).toBe(ResponseStatus.Fetched);
    expect(transactions).toEqual(initialState.latestTransactions.value);
  }
});
