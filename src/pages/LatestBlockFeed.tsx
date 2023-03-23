import { updateLatestBlock, updateLatestEtherPrice } from 'slices/ethereum-block-data/actions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  getLatestEthereumBlockTransactions,
  getLatestEtherPrice,
} from 'slices/ethereum-block-data/selector';
import { BLOCK_REFRESH_INTERVAL, REFRESH_BUFFER, ResponseStatus } from '../constants';
import TransactionBlock from 'components/TransactionBlock';
import { useEffect, useState } from 'react';
import Erc20TransferModal from 'components/Erc20TransferModal';
import { getCurrentTime } from '../utils';

const LatestBlockFeed = () => {
  const dispatch = useAppDispatch();

  const { status: ethPriceStatus } = useAppSelector(getLatestEtherPrice);
  const { transactions, status, blockNumber } = useAppSelector(getLatestEthereumBlockTransactions);

  const [lastFetch, setLastFetch] = useState<number>(0);

  useEffect(() => {
    const refreshFunc = () => {
      dispatch(updateLatestBlock());
      if (ethPriceStatus !== ResponseStatus.Fetched) dispatch(updateLatestEtherPrice());
      setLastFetch(getCurrentTime());
    };

    let timeout: NodeJS.Timeout | undefined;

    const bufferCompletionTime = lastFetch + REFRESH_BUFFER;

    if (bufferCompletionTime < getCurrentTime()) {
      refreshFunc(); // refresh immediately if not in buffer period
    } else {
      timeout = setTimeout(() => refreshFunc(), bufferCompletionTime - getCurrentTime()); // refresh as soon as buffer is over
    }

    const interval = setInterval(() => {
      refreshFunc();
    }, BLOCK_REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [dispatch, ethPriceStatus, lastFetch]);

  if (transactions.length > 0) {
    return (
      <div className='flex flex-col'>
        <h1 className='text-3xl text-center'>block number: {blockNumber}</h1>
        <div className='flex flex-col w-full gap-y-1 items-center'>
          {transactions.map((tx) => (
            <TransactionBlock key={tx.hash} transaction={tx} />
          ))}
        </div>
        <Erc20TransferModal />
      </div>
    );
  } else if (status === ResponseStatus.Error) {
    return <span>Could not fetch</span>;
  } else if (status === ResponseStatus.Loading) {
    return <span>Loading...</span>;
  } else {
    return <span>Something went wrong.</span>;
  }
};

export default LatestBlockFeed;
