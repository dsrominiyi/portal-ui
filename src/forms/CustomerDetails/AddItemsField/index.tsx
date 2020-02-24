import React, { FunctionComponent, useState, useEffect, Fragment } from 'react';

import QuestionBox from '../../../components/QuestionBox';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

import { capitalise, kebabCase } from '../../../helpers/utilFuncs';

import formStyles from '../../styles.scss';
import modalStyles from '../../../components/Modal/styles.scss';

interface Props {
  fieldText?: string;
  itemName: string;
  form: FunctionComponent<FormProps>;
  table: FunctionComponent<ItemTableProps>;
  items?: unknown[];
  formConfig?: { [key: string]: unknown };
  hasError?: boolean;
  errorText?: string;
  onChange(values: unknown[]): void;
}

interface State {
  items: unknown[];
  newItem?: unknown;
  isModalVisible: boolean;
  editIndex?: number;
  isFormValid: boolean;
  submissionAttempted: boolean;
}

type UseStateArray = [State, React.Dispatch<React.SetStateAction<State>>];

export const AddItemsField: FunctionComponent<Props> = ({
  fieldText,
  itemName,
  form: Form,
  table: Table,
  items: initialItems,
  formConfig,
  hasError,
  errorText,
  onChange
}: Props) => {
  const [state, setState]: UseStateArray = useState({
    items: initialItems || [],
    newItem: undefined,
    isModalVisible: false,
    editIndex: undefined,
    isFormValid: false,
    submissionAttempted: false
  } as State);

  useEffect(() => {
    onChange(state.items);
  }, [state.items]);

  const testIdItemName = kebabCase(itemName);
  const itemDisplayName = capitalise(itemName);

  const dismissModal = (updatedItems?: unknown[]) => {
    setState({
      ...state,
      isModalVisible: false,
      submissionAttempted: false,
      editIndex: undefined,
      items: updatedItems || state.items
    });
  };

  const saveItem = () => {
    const { items, newItem, editIndex } = state;

    if (newItem) {
      const updatedItems =
        typeof editIndex === 'number'
          ? [...items.slice(0, editIndex), newItem, ...items.slice(editIndex + 1)]
          : [...items, newItem];

      dismissModal(updatedItems);
    }
  };

  const renderModal = () => {
    const { items, isModalVisible, editIndex, isFormValid: canSubmit, submissionAttempted } = state;
    const editMode = typeof editIndex === 'number';

    const dismiss = () => dismissModal();
    const save = () => saveItem();

    return (
      <Modal
        isVisible={isModalVisible}
        body={[
          <Form
            key="0"
            additionalClasses={[formStyles.modalForm]}
            initialValues={editMode ? items[editIndex!] : undefined}
            submissionAttempted={submissionAttempted}
            config={formConfig}
            onChange={(values, isFormValid) => {
              setState({ ...state, newItem: values, isFormValid });
            }}
            onSubmit={save}
          />
        ]}
        header={`${editMode ? 'Edit' : 'Add'} ${itemDisplayName}`}
        footer={
          <div className={modalStyles.footerActions}>
            <Button
              label="Cancel"
              onClick={dismiss}
              attributes={{ 'test-id': `dismiss-${testIdItemName}-modal` }}
            />
            <Button
              label={editMode ? 'Update' : 'Add'}
              onClick={() => {
                setState({ ...state, submissionAttempted: true });
                return canSubmit && save();
              }}
              status={Status.Success}
              attributes={{ 'test-id': `save-${testIdItemName}` }}
            />
          </div>
        }
        hideModal={dismiss}
      />
    );
  };

  const renderTable = () => {
    const { items } = state;
    const onEdit = (editIndex: number) => {
      setState({
        ...state,
        isModalVisible: true,
        editIndex
      });
    };
    const onDelete = (deleteIndex: number) => {
      const updatedItems = [...items];
      updatedItems.splice(deleteIndex, 1);
      setState({
        ...state,
        items: updatedItems
      });
    };

    return items.length > 0 && <Table key="1" items={items} onEdit={onEdit} onDelete={onDelete} />;
  };

  return (
    <Fragment>
      <QuestionBox
        text={fieldText}
        hasError={hasError}
        errorText={errorText}
        inputFields={[
          <Button
            key="0"
            label={`Add ${itemDisplayName}`}
            onClick={() => setState({ ...state, isModalVisible: true })}
            status={Status.Success}
            attributes={{ 'test-id': `add-${testIdItemName}` }}
          />,
          renderTable()
        ]}
      />
      {renderModal()}
    </Fragment>
  );
};

AddItemsField.displayName = 'AddItemsField';
export default AddItemsField;
