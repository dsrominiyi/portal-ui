import reducer, { initialState } from '.';

describe('user reducer', () => {
  it('returns the initial state by default', () => {
    const state = reducer(undefined);

    expect(state).toBe(initialState);
  });
});
