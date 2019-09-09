import { ItemsCountPipe } from './items-count.pipe';

describe('ItemsCountPipe', () => {
  it('create an instance', () => {
    const pipe = new ItemsCountPipe();
    expect(pipe).toBeTruthy();
  });
});
