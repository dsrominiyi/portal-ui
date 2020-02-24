import React, { FunctionComponent, ReactNode, useEffect, useState, useRef, RefObject } from 'react';
import { Portal } from 'react-portal';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames/bind';

import CloseIcon from 'uikit-icons/lib/Close';

import { preventBodyScroll, allowBodyScroll } from '../../helpers/domHelper';

import styles from './styles.scss';

interface Props {
  isVisible: boolean;
  body: ReactNode[];
  header?: ReactNode;
  footer?: ReactNode;
  hideModal(): void;
}

type MouseDownTargetState = [
  HTMLElement | undefined,
  React.Dispatch<React.SetStateAction<HTMLElement | undefined>>
];

const cx = classnames.bind(styles);

const otherModalsDetected = () => document.querySelectorAll(`.${styles.modal}`).length > 1;

// transition times should match those defined in the stylesheet
const overlayTransitionMs = 300;
const dialogTransitionMs = 300;

export const Modal: FunctionComponent<Props> = ({
  isVisible,
  body,
  header,
  footer,
  hideModal
}: Props) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [mouseDownTarget, setMouseDownTarget]: MouseDownTargetState = useState();
  const dialogRef: RefObject<HTMLDivElement> = useRef(null);

  const detectMouseDownTarget = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // prevents nested modals from dismissing their parents
    setMouseDownTarget(event.target as HTMLElement);
  };
  const hideOnOverlayClick = (event: React.MouseEvent<HTMLElement>) => {
    const isClickOnOverlay =
      mouseDownTarget &&
      !dialogRef.current?.contains(mouseDownTarget) &&
      !dialogRef.current?.contains(event.target as HTMLElement);
    return isClickOnOverlay && hideModal();
  };
  const hideOnEsc = (event: KeyboardEvent) => ['Esc', 'Escape'].includes(event.key) && hideModal();

  useEffect(() => {
    document.body.addEventListener('keyup', hideOnEsc);
    const cleanUp = () => document.body.removeEventListener('keyup', hideOnEsc);
    return cleanUp;
  }, []);

  useEffect(() => {
    if (isVisible) {
      preventBodyScroll();
      setOverlayVisible(true);
      setTimeout(() => setDialogVisible(true), overlayTransitionMs);
    } else {
      // ensure nested modals don't allow body scroll when mounting or on dismissal
      if (hasMounted && !otherModalsDetected()) {
        allowBodyScroll();
      }
      setDialogVisible(false);
      setTimeout(() => setOverlayVisible(false), dialogTransitionMs);
    }
    setHasMounted(true);
  }, [isVisible]);

  return (
    <Portal>
      <CSSTransition
        in={isOverlayVisible}
        timeout={overlayTransitionMs}
        classNames={{
          enter: styles.overlayEnter,
          enterActive: styles.overlayEnterActive,
          exit: styles.overlayExit,
          exitActive: styles.overlayExitActive
        }}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={styles.modalOverlay}
          onMouseDown={detectMouseDownTarget}
          onMouseUp={hideOnOverlayClick}
        >
          <div
            ref={dialogRef}
            className={cx({ modal: true, visible: isDialogVisible })}
            onMouseDown={detectMouseDownTarget}
          >
            <div className={styles.closeIcon} onClick={hideModal}>
              <CloseIcon viewBox="0.5 0 20 20" />
            </div>
            {header && <div className={styles.header}>{header}</div>}
            <div className={styles.body}>{body}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

Modal.displayName = 'Modal';
export default Modal;
