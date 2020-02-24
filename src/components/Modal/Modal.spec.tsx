import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { preventBodyScroll, allowBodyScroll } from '../../helpers/domHelper';

import { render as renderModal } from './Modal.stories';

jest.mock('../../helpers/domHelper');
jest.useFakeTimers();

let component: ReactWrapper;
const hideModal = jest.fn();
document.body.addEventListener = jest.fn();
document.body.removeEventListener = jest.fn();

describe('Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    component = mount(renderModal(['body'], 'header', 'footer')({ isVisible: true, hideModal }));
  });

  test('visible Modal matches snapshot', () => {
    act(() => {
      jest.runAllTimers();
    });
    component.update();

    expect(component).toMatchSnapshot();
  });

  test('hidden Modal matches snapshot', () => {
    component.setProps({ isVisible: false });
    act(() => {
      jest.runAllTimers();
    });
    component.update();

    expect(component).toMatchSnapshot();
  });

  test('page body scroll is prevented when the modal is visible', () => {
    expect(preventBodyScroll).toHaveBeenCalled();
  });

  test('page body scroll is allowed when the modal is hidden', () => {
    component.setProps({ isVisible: false });

    expect(allowBodyScroll).toHaveBeenCalled();
  });

  test('a keyup event listener is added to document.body on mount', () => {
    expect(document.body.addEventListener).toHaveBeenCalledWith('keyup', expect.any(Function));
  });

  test('the keyup event listener calls hideModal if the escape key is pressed', () => {
    const keyboardEvent = { key: 'Esc' };
    const keyupListener = (document.body.addEventListener as jest.Mock).mock.calls[0][1];
    keyupListener(keyboardEvent);

    expect(hideModal).toHaveBeenCalled();
  });

  test('the keyup event listener is removed on unmount', () => {
    component.unmount();

    expect(document.body.removeEventListener).toHaveBeenCalledWith('keyup', expect.any(Function));
  });

  test('clicking the modal overlay calls hideModal', () => {
    const dialogDiv = (component.find('.modal').getElement() as any).ref.current;
    dialogDiv.contains = jest.fn(() => false);
    component.find('.modalOverlay').simulate('mousedown', { target: {} });
    component.find('.modalOverlay').simulate('mouseup', { target: {} });

    expect(hideModal).toHaveBeenCalled();
  });

  test('clicking the modal dialog then releasing the click on the overlay does not call hideModal', () => {
    const dialogDiv = (component.find('.modal').getElement() as any).ref.current;
    dialogDiv.contains = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    component.find('.modalOverlay').simulate('mousedown', { target: {} });
    component.find('.modalOverlay').simulate('mouseup', { target: {} });

    expect(hideModal).not.toHaveBeenCalled();
  });

  test('clicking the modal overlay calls hideModal if the ref is not available', () => {
    const dialogRef = (component.find('.modal').getElement() as any).ref;
    dialogRef.current = null;
    component.find('.modalOverlay').simulate('mousedown', { target: {} });
    component.find('.modalOverlay').simulate('mouseup', { target: {} });

    expect(hideModal).toHaveBeenCalled();
  });

  test('clicking the close icon calls hideModal', () => {
    component.find('.closeIcon').simulate('click');

    expect(hideModal).toHaveBeenCalled();
  });

  test('mousedown event bubbling from the modal dialog is prevented', () => {
    const event = { stopPropagation: jest.fn() };
    component.find('.modal').simulate('mousedown', event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
