import { RootState } from 'store/index';

export const getLatestEthereumBlockTransactions = (state: RootState) => {
  return {
    transactions: state.ethereumBlockDataReducer.latestTransactions.value,
    status: state.ethereumBlockDataReducer.latestTransactions.status,
  };
};

export const getLatestEtherPrice = (state: RootState) => {
  return {
    price: state.ethereumBlockDataReducer.ethPrice.value,
    status: state.ethereumBlockDataReducer.ethPrice.status,
  };
};
