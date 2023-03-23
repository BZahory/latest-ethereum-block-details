import { AssetTransfersResult, TransactionResponse } from 'alchemy-sdk';
import { ResponseStatus } from '../../constants';
import {
  CLEAR_SELECTED_TRANSACTION,
  GET_ERC_20_TRANSFERS,
  GET_LATEST_BLOCK,
  GET_LATEST_ETHER_PRICE,
} from './constants';

export interface ReducerState {
  latestTransactions: {
    value: TransactionResponse[];
    error: any;
    status: ResponseStatus;
    blockNumber: number | undefined;
  };
  ethPrice: { value: number | undefined; error: any; status: ResponseStatus };
  selectedErc20Data: {
    transfers: AssetTransfersResult[];
    error: any;
    status: ResponseStatus;
  };
}

export const initialState: ReducerState = {
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

export default function ethereumBlockDataReducer(
  state = initialState,
  { type, payload }: { type: string; payload?: any },
): ReducerState {
  switch (type) {
    case GET_LATEST_BLOCK.LOADING:
      return {
        ...state,
        latestTransactions: {
          ...state.latestTransactions,
          error: initialState.latestTransactions.error,
          status: ResponseStatus.Loading,
        },
      };
    case GET_LATEST_BLOCK.SUCCESS:
      return {
        ...state,
        latestTransactions: {
          ...state.latestTransactions,
          value: payload.transactions,
          status: ResponseStatus.Fetched,
          blockNumber: payload.blockNumber,
        },
      };
    case GET_LATEST_BLOCK.ERROR:
      return {
        ...state,
        latestTransactions: {
          ...state.latestTransactions,
          value: initialState.latestTransactions.value,
          error: payload.error,
          status: ResponseStatus.Error,
        },
      };
    case GET_LATEST_ETHER_PRICE.LOADING:
      return {
        ...state,
        ethPrice: {
          ...state.ethPrice,
          error: initialState.ethPrice.error,
          status: ResponseStatus.Loading,
        },
      };
    case GET_LATEST_ETHER_PRICE.SUCCESS:
      return {
        ...state,
        ethPrice: {
          ...state.ethPrice,
          value: payload.price,
          status: ResponseStatus.Fetched,
        },
      };
    case GET_LATEST_ETHER_PRICE.ERROR:
      return {
        ...state,
        ethPrice: {
          ...state.ethPrice,
          value: initialState.ethPrice.value,
          error: payload.error,
          status: ResponseStatus.Error,
        },
      };
    case GET_ERC_20_TRANSFERS.LOADING:
      return {
        ...state,
        selectedErc20Data: {
          ...state.selectedErc20Data,
          error: initialState.selectedErc20Data.error,
          status: ResponseStatus.Loading,
          transfers: initialState.selectedErc20Data.transfers,
        },
      };
    case GET_ERC_20_TRANSFERS.SUCCESS:
      return {
        ...state,
        selectedErc20Data: {
          ...state.selectedErc20Data,
          transfers: payload.transfers,
          status: ResponseStatus.Fetched,
        },
      };
    case GET_ERC_20_TRANSFERS.ERROR:
      return {
        ...state,
        selectedErc20Data: {
          ...state.selectedErc20Data,
          transfers: initialState.selectedErc20Data.transfers,
          error: payload.error,
          status: ResponseStatus.Error,
        },
      };
    case CLEAR_SELECTED_TRANSACTION:
      return {
        ...state,
        selectedErc20Data: initialState.selectedErc20Data,
      };
    default:
      return state;
  }
}
