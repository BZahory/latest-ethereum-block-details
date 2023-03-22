import { Alchemy, Network } from 'alchemy-sdk';
import { ALCHEMY_API_KEY } from '../../constants';
import { Dispatch } from 'redux';
import { GET_LATEST_BLOCK } from './constants';

const alchemy = new Alchemy({ apiKey: ALCHEMY_API_KEY, network: Network.ETH_MAINNET });

export const updateLatestBlock = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: GET_LATEST_BLOCK.LOADING });

  try {
    const latestBlockNumber = await alchemy.core.getBlockNumber();

    const latestBlock = await alchemy.core.getBlockWithTransactions(latestBlockNumber);

    const latestBlockTxs = latestBlock.transactions;

    dispatch({ payload: { transactions: latestBlockTxs }, type: GET_LATEST_BLOCK.SUCCESS });
  } catch (e) {
    dispatch({ payload: { error: e }, type: GET_LATEST_BLOCK.ERROR });
  }
};
