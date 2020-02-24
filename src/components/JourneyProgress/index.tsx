import React, { FunctionComponent } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.scss';

const cx = classNames.bind(styles);

export interface Step {
  title: string;
  url: string;
}

export interface Props {
  steps: Step[];
  activeStep: number;
  onClick?: (stepIndex: number) => void;
}

export const JourneyProgress: FunctionComponent<Props> = ({
  steps,
  activeStep,
  onClick
}: Props) => (
  <div className={styles.journeyWrapper}>
    {steps.map((step: Step, index) => (
      <a
        key={index}
        className={cx({ step: true, active: activeStep === index })}
        href={onClick ? undefined : step.url}
        onClick={onClick && (() => onClick(index))}
        title={step.title}
      >
        <span className={styles.position}>{index + 1}</span>
        <span>{step.title}</span>
      </a>
    ))}
  </div>
);

JourneyProgress.displayName = 'JourneyProgress';
export default JourneyProgress;
