import { preventBodyScroll, allowBodyScroll, triggerOnEnter } from './domHelper';
import debounce from './debounce';

jest.mock('./debounce');

window.scrollTo = jest.fn();

describe('domHelper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('preventBodyScroll', () => {
    it('sets the document position to fixed and sets top to the current scroll value', () => {
      const scrollY = 10;
      Object.defineProperty(window, 'scrollY', { value: scrollY });
      preventBodyScroll();

      expect(document.body.style.position).toBe('fixed');
      expect(document.body.style.top).toBe(`-${scrollY}px`);
    });
  });

  describe('allowBodyScroll', () => {
    it('unsets the document position and top and ensures the window is scrolled to its initial scroll value', () => {
      const scrollY = 10;
      document.body.style.top = `-${scrollY}px`;
      allowBodyScroll();

      expect(document.body.style.position).toBe('');
      expect(document.body.style.top).toBe('');
      expect(window.scrollTo).toHaveBeenCalledWith(0, scrollY);
    });
  });

  describe('triggerOnEnter', () => {
    const enterKeyEvent = { key: 'Enter' } as React.KeyboardEvent;
    const nonEnterKeyEvent = { key: 'Esc' } as React.KeyboardEvent;
    const action = jest.fn();
    const debouncedAction = jest.fn();
    (debounce as jest.Mock).mockReturnValue(debouncedAction);

    it('triggers the debounced action if the Enter key is pressed', () => {
      triggerOnEnter(action)(enterKeyEvent);

      expect(debounce).toHaveBeenCalledWith(action, undefined);
      expect(debouncedAction).toHaveBeenCalled();
    });

    it('debounces the action by the supplied wait time', () => {
      const debounceWait = 200;
      triggerOnEnter(action, debounceWait)(enterKeyEvent);

      expect(debounce).toHaveBeenCalledWith(action, debounceWait);
      expect(debouncedAction).toHaveBeenCalled();
    });

    it('does not trigger the action if the enter key is not pressed', () => {
      triggerOnEnter(action)(nonEnterKeyEvent);

      expect(debounce).not.toHaveBeenCalled();
      expect(debouncedAction).not.toHaveBeenCalled();
    });
  });
});
