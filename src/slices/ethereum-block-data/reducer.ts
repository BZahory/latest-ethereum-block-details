import { TransactionResponse } from 'alchemy-sdk';
import { ResponseStatus } from '../../constants';
import { GET_LATEST_BLOCK, GET_LATEST_ETHER_PRICE } from './constants';

export interface ReducerState {
  latestTransactions: { value: TransactionResponse[]; error: any; status: ResponseStatus };
  ethPrice: { value: number | undefined; error: any; status: ResponseStatus };
}

export const initialState: ReducerState = {
  latestTransactions: { value: [], error: undefined, status: ResponseStatus.Unfetched },
  ethPrice: { value: undefined, error: undefined, status: ResponseStatus.Unfetched },
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
    default:
      return state;
  }
}
