import React, { FunctionComponent } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { utc as moment, duration } from 'moment';
import styles from './styles.scss';

export interface ConfigPercentages {
  green: number;
  amber: number;
}

interface Props {
  startDate: string;
  endDate: string;
  currentDate?: string;
  configPercentages?: ConfigPercentages;
}

export const TimeRemaining: FunctionComponent<Props> = ({
  startDate,
  endDate,
  currentDate,
  configPercentages
}: Props) => {
  const startDateUtc = moment(startDate, 'YYYY-MM-DD');
  const endDateUtc = moment(endDate, 'YYYY-MM-DD');
  const currentDateUtc = currentDate ? moment(currentDate, 'YYYY-MM-DD') : moment();

  const policyLength = Math.floor(duration(endDateUtc.diff(startDateUtc)).asDays() + 1);
  const daysRemaining = Math.ceil(duration(endDateUtc.diff(currentDateUtc)).asDays() + 1);

  const displayText =
    daysRemaining > 0 ? `${daysRemaining} day${daysRemaining === 1 ? '' : 's'}` : 'Lapsed';
  const percentageRemaining = daysRemaining / policyLength;
  const greenFloat = configPercentages ? configPercentages.green : 0.331;
  const amberFloat = configPercentages ? configPercentages.amber : 0.2501;
  const pathColour =
    percentageRemaining > greenFloat ? 'green' : percentageRemaining > amberFloat ? 'amber' : 'red';

  return (
    <CircularProgressbar
      value={daysRemaining}
      minValue={0}
      maxValue={policyLength}
      text={displayText}
      counterClockwise={false}
      strokeWidth={5}
      classes={{
        root: styles.circularProgressBar,
        trail: styles.circularProgressBarTrail,
        path: styles[pathColour],
        text: styles.circularProgressBarText,
        background: styles.circularProgressBarBackground
      }}
    />
  );
};

TimeRemaining.displayName = 'TimeRemaining';
export default TimeRemaining;
