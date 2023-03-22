import { updateLatestBlock } from './actions';

jest.mock('alchemy-sdk', () => ({
  Alchemy: jest.fn().mockImplementation(() => {
    return {
      core: {
        getBlockNumber: async () => 1,
        getBlockWithTransactions: async () => ({
          transactions: ['test1', 'test2'],
        }),
      },
    };
  }),
  Network: jest.fn().mockImplementation(() => {
    return { ETH_MAINNET: 1 };
  }),
}));

test('updateLatestBlock', async () => {
  const dispatch = jest.fn();

  await updateLatestBlock()(dispatch);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch.mock.calls[0]).toEqual([{ type: 'GET_LATEST_BLOCK_LOADING' }]);
  expect(dispatch.mock.calls[1]).toEqual([
    { payload: { transactions: ['test1', 'test2'] }, type: 'GET_LATEST_BLOCK_SUCCESS' },
  ]);
});
