import { UniqueValuePipe } from './unique-value.pipe';

describe('UniqueValuePipe', () => {
  it('create an instance', () => {
    const pipe = new UniqueValuePipe();
    expect(pipe).toBeTruthy();
  });
});
