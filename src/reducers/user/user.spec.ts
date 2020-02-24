import reducer, { initialState } from '.';

describe('user reducer', () => {
  it('returns the initial state by default', () => {
    const state = reducer(undefined, { type: 'TEST' });

    expect(state).toBe(initialState);
  });

  test('the USER_UPDATE_NAME action updates the username state property', () => {
    const newName = 'newName';
    const state = reducer(undefined, { type: 'USER_UPDATE_NAME', payload: newName });
    expect(state.user.username).toBe(newName);
  });
});
