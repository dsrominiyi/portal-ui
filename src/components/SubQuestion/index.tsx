import React, { FunctionComponent, ReactNode, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.scss';

interface Props {
  visible?: boolean;
  items?: ReactNode[];
}

// transition time should match the one defined in the stylesheet
const transitionMs = 200;

export const SubQuestion: FunctionComponent<Props> = ({ visible, items }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const setHeight = () => {
    const containerDiv = containerRef.current as HTMLInputElement;
    const itemsDiv = itemsRef.current as HTMLInputElement;
    containerDiv.style.height = visible ? `${itemsDiv.scrollHeight}px` : '';
    containerDiv.style.overflow = visible ? 'visible' : 'hidden';
  };

  const observer = new MutationObserver(setHeight);

  useEffect(() => {
    const containerDiv = containerRef.current as HTMLInputElement;
    if (containerDiv) {
      setHeight();
      observer.observe(containerDiv, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [visible]);

  return (
    <CSSTransition
      in={visible}
      timeout={transitionMs}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive
      }}
      mountOnEnter
      unmountOnExit
    >
      <div ref={containerRef} className={styles.subQuestionContainer}>
        <div ref={itemsRef} className={styles.insetQuestionWrapper}>
          {items}
        </div>
      </div>
    </CSSTransition>
  );
};

SubQuestion.displayName = 'SubQuestion';
export default SubQuestion;
