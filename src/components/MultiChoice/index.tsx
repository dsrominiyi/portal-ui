import React, { FunctionComponent } from 'react';
import QuestionButton from '../Button/QuestionButton';
import styles from './styles.scss';

export interface Props {
  options: string[];
  selectedOption?: string;
  multiSelect?: boolean;
  selectedOptions?: string[];
  disabledOptions?: string[];
  attributes?: { [attr: string]: string };
  onClick(option: string): void;
}

export const updateSelectedOptions = (selectedOptions: string[], option: string) => {
  selectedOptions.includes(option)
    ? selectedOptions.splice(selectedOptions.indexOf(option), 1)
    : selectedOptions.push(option);

  return selectedOptions;
};

export const MultiChoice: FunctionComponent<Props> = ({
  options,
  selectedOption,
  multiSelect,
  selectedOptions = [],
  disabledOptions = [],
  attributes = {},
  onClick
}: Props) => {
  const testId = attributes['test-id'];
  const renderedOptions = options.map((option, index) => (
    <QuestionButton
      key={index}
      label={option}
      isActive={multiSelect ? selectedOptions.includes(option) : option === selectedOption}
      isDisabled={disabledOptions.includes(option)}
      onClick={() => onClick(option)}
      attributes={{ 'test-id': testId ? `${testId}_option-${index + 1}` : '' }}
    />
  ));
  return (
    <div className={styles.options} {...attributes}>
      {renderedOptions}
    </div>
  );
};

MultiChoice.displayName = 'MultiChoice';
export default MultiChoice;
