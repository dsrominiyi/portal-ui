/**
 * Prevents an action from being called more that once every `wait` milliseconds
 * The initial triggering of the action will be delayed by `wait` milliseconds if `immediate` = false
 *
 * e.g. <button onClick={event => debounce(handleClick, 200)(event)} />
 */

let timeout: number | null;

const debounce = (action: (...args: any[]) => void, wait = 300, immediate = true) => (
  ...args: any[]
) => {
  const later = () => {
    timeout = null;
    if (!immediate) {
      action(...args);
    }
  };
  const callNow = immediate && !timeout;

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = (setTimeout as Window['setTimeout'])(later, wait);

  if (callNow) {
    action(...args);
  }
};

export default debounce;
