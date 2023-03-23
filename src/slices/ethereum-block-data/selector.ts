import { RootState } from 'store/index';

export const getLatestEthereumBlockTransactions = (state: RootState) => {
  return {
    transactions: state.ethereumBlockDataReducer.latestTransactions.value,
    status: state.ethereumBlockDataReducer.latestTransactions.status,
    blockNumber: state.ethereumBlockDataReducer.latestTransactions.blockNumber,
  };
};

export const getLatestEtherPrice = (state: RootState) => {
  return {
    price: state.ethereumBlockDataReducer.ethPrice.value,
    status: state.ethereumBlockDataReducer.ethPrice.status,
  };
};

export const getSelectedTransactionErc20Transfers = (state: RootState) => {
  return {
    transfers: state.ethereumBlockDataReducer.selectedErc20Data.transfers,
    status: state.ethereumBlockDataReducer.selectedErc20Data.status,
  };
};
