import debounce from './debounce';

export const preventBodyScroll = () => {
  const { scrollY } = window;
  document.body.style.position = 'fixed';
  document.body.style.top = document.body.style.top || `-${scrollY}px`;
};

export const allowBodyScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  return scrollY && window.scrollTo(0, -parseInt(scrollY, 10));
};

export const triggerOnEnter = (action: () => void, debounceWait?: number) => (
  event: React.KeyboardEvent<Element | HTMLElement>
) => {
  if (event.key === 'Enter') {
    debounce(action, debounceWait)();
  }
};
