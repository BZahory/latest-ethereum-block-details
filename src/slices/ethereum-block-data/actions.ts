import {
  Alchemy,
  AssetTransfersCategory,
  AssetTransfersResult,
  Network,
  toHex,
  TransactionResponse,
} from 'alchemy-sdk';
import { ALCHEMY_API_KEY } from '../../constants';
import { Dispatch } from 'redux';
import {
  CLEAR_SELECTED_TRANSACTION,
  GET_ERC_20_TRANSFERS,
  GET_LATEST_BLOCK,
  GET_LATEST_ETHER_PRICE,
} from './constants';
import axios from 'axios';

const alchemy = new Alchemy({ apiKey: ALCHEMY_API_KEY, network: Network.ETH_MAINNET });

type GetLatestBlockActionType = {
  type: NonNullable<string>;
  payload: { transactions: TransactionResponse[]; blockNumber: Number } | { error: unknown } | {};
};

type GetLatestEtherPriceActionType = {
  type: NonNullable<string>;
  payload: { price: Number } | { error: unknown } | {};
};

type GetErc20TransfersPayloadActionType = {
  type: NonNullable<string>;
  payload: { transfers: AssetTransfersResult[] } | { error: unknown } | {};
};

type ClearSelectedTransactionPayloadActionType = {
  type: NonNullable<string>;
  payload: {};
};

export const updateLatestBlock = () => async (dispatch: Dispatch<GetLatestBlockActionType>) => {
  dispatch({ type: GET_LATEST_BLOCK.LOADING, payload: {} });

  try {
    const latestBlockNumber = await alchemy.core.getBlockNumber();

    const latestBlock = await alchemy.core.getBlockWithTransactions(latestBlockNumber);

    const latestBlockTxs = latestBlock.transactions;

    dispatch({
      payload: { transactions: latestBlockTxs, blockNumber: latestBlockNumber },
      type: GET_LATEST_BLOCK.SUCCESS,
    });
  } catch (e) {
    dispatch({ payload: { error: e }, type: GET_LATEST_BLOCK.ERROR });
  }
};

export const updateLatestEtherPrice =
  () => async (dispatch: Dispatch<GetLatestEtherPriceActionType>) => {
    dispatch({ type: GET_LATEST_ETHER_PRICE.LOADING, payload: {} });

    try {
      const price: { ethereum: { usd: Number } } = await axios
        .get(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd
    `,
        )
        .then((res) => res.data);

      dispatch({ payload: { price: price.ethereum.usd }, type: GET_LATEST_ETHER_PRICE.SUCCESS });
    } catch (e) {
      dispatch({ payload: { error: e }, type: GET_LATEST_ETHER_PRICE.ERROR });
    }
  };

export const getErc20Transfers =
  (transaction: TransactionResponse, blockNumber: number) =>
  async (dispatch: Dispatch<GetErc20TransfersPayloadActionType>) => {
    dispatch({ type: GET_ERC_20_TRANSFERS.LOADING, payload: {} });

    try {
      const fromAssetTransfers = await alchemy.core
        .getAssetTransfers({
          fromBlock: toHex(blockNumber),
          toBlock: toHex(blockNumber),
          fromAddress: transaction.from,
          category: [
            AssetTransfersCategory.EXTERNAL,
            AssetTransfersCategory.INTERNAL,
            AssetTransfersCategory.ERC20,
            AssetTransfersCategory.ERC721,
            AssetTransfersCategory.ERC1155,
          ],
        })
        .then((res) => res.transfers);

      const toAssetTransfers = await alchemy.core
        .getAssetTransfers({
          fromBlock: toHex(blockNumber),
          toBlock: toHex(blockNumber),
          toAddress: transaction.from,
          category: [AssetTransfersCategory.ERC20],
        })
        .then((res) => res.transfers);

      dispatch({
        payload: { transfers: [...fromAssetTransfers, ...toAssetTransfers] },
        type: GET_ERC_20_TRANSFERS.SUCCESS,
      });
    } catch (e) {
      dispatch({ payload: { error: e }, type: GET_ERC_20_TRANSFERS.ERROR });
    }
  };

export const clearSelectedTransaction =
  () => async (dispatch: Dispatch<ClearSelectedTransactionPayloadActionType>) => {
    dispatch({
      type: CLEAR_SELECTED_TRANSACTION,
      payload: {},
    });
  };
