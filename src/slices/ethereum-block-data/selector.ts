import { RootState } from 'store/index';

export const getLatestEthereumBlockTransactions = (state: RootState) => {
  return {
    transactions: state.ethereumBlockDataReducer.latestTransactions.value,
    status: state.ethereumBlockDataReducer.latestTransactions.status,
  };
};
