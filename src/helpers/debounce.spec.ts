import debounce from './debounce';

const action = jest.fn();

jest.useFakeTimers();

describe('debounce', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.runAllTimers();
  });

  it('calls the action immediately by default', () => {
    debounce(action)();

    expect(action).toHaveBeenCalled();
  });

  it('calls the action with the supplied args', () => {
    const args = ['a', 'b', 'c'];
    debounce(action)(...args);

    expect(action).toHaveBeenCalledWith(...args);
  });

  it('prevents the action from being called again until the timer has expired', () => {
    debounce(action)();
    debounce(action)();

    expect(action).toHaveBeenCalledTimes(1);

    jest.runAllTimers();
    debounce(action)();

    expect(action).toHaveBeenCalledTimes(2);
  });

  it('does not call the action until the timer has expired if immediate = false', () => {
    debounce(action, 300, false)();

    expect(action).not.toHaveBeenCalled();
    jest.runAllTimers();

    expect(action).toHaveBeenCalled();
  });
});
