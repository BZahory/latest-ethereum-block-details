import { updateLatestBlock, updateLatestEtherPrice } from 'slices/ethereum-block-data/actions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  getLatestEthereumBlockTransactions,
  getLatestEtherPrice,
} from 'slices/ethereum-block-data/selector';
import { BLOCK_REFRESH_INTERVAL, ResponseStatus } from './constants';
import TransactionBlock from 'components/TransactionBlock';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();

  const { status: ethPriceStatus } = useAppSelector(getLatestEtherPrice);
  const { transactions, status, blockNumber } = useAppSelector(getLatestEthereumBlockTransactions);

  useEffect(() => {
    const refreshFunc = () => {
      dispatch(updateLatestBlock());
      if (ethPriceStatus !== ResponseStatus.Fetched) dispatch(updateLatestEtherPrice());
    };

    refreshFunc();
    const interval = setInterval(() => {
      refreshFunc();
    }, BLOCK_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch, ethPriceStatus]);

  if (status === ResponseStatus.Fetched && transactions.length > 0) {
    return (
      <div className='flex flex-col'>
        <h1 className='text-3xl text-center'>block number: {blockNumber}</h1>
        <div className='flex flex-col w-full gap-y-1 items-center'>
          {transactions.map((tx) => (
            <TransactionBlock key={tx.hash} transaction={tx} />
          ))}
        </div>
      </div>
    );
  } else if (status === ResponseStatus.Error) {
    return <span>Could not fetch</span>;
  } else if (status === ResponseStatus.Loading) {
    return <span>Loading...</span>;
  } else {
    return <span>Something went wrong.</span>;
  }
}

export default App;
