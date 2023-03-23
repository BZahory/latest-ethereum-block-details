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
  }, []);

  const { transactions, status } = useAppSelector(getLatestEthereumBlockTransactions);

  return status === ResponseStatus.Fetched && transactions.length > 0 ? (
    <div className='flex flex-col w-full gap-y-1 items-center'>
      {transactions.map((tx) => (
        <TransactionBlock key={tx.hash} transaction={tx} />
      ))}
    </div>
  ) : (
    <span>No tx available</span>
  );
}

export default App;
