import { ResponseStatus } from '../../constants';
import { ReducerState } from './reducer';
import {
  getLatestEthereumBlockTransactions,
  getLatestEtherPrice,
  getSelectedTransactionErc20Transfers,
} from './selector';

const initialState: ReducerState = {
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
  selectedErc20Data: {
    transfers: ['transfer', 'transfer'] as any,
    error: 'error3',
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

test('getSelectedTransactionErc20Transfers()', () => {
  for (let i = 0; i < 2; i++) {
    // loop ensures selector purity
    const { status, transfers } = getSelectedTransactionErc20Transfers({
      ethereumBlockDataReducer: initialState,
    });
    expect(status).toBe(ResponseStatus.Fetched);
    expect(transfers).toEqual(initialState.selectedErc20Data.transfers);
  }
});
