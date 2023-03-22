import { updateLatestBlock } from 'slices/ethereum-block-data/actions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getLatestEthereumBlockTransactions } from 'slices/ethereum-block-data/selector';
import { ResponseStatus } from './constants';
import TransactionBlock from 'components/TransactionBlock';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateLatestBlock()); // TODO: remove/replace later (test)
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
