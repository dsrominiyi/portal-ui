import React, { FunctionComponent } from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import AddItemsField from '.';

import { capitalise } from '../../../helpers/utilFuncs';

jest.mock('../../../helpers/domHelper');

let component: ShallowWrapper | ReactWrapper;
const fieldText = 'Add items';
const itemName = 'new item';
const item = {
  name: 'item'
};
const item2 = {
  name: 'item2'
};
const form: FunctionComponent<FormProps> = () => <div />;
const table: FunctionComponent<ItemTableProps> = () => <div />;
const onChange = jest.fn();

const getAddButton = () => (component.find('QuestionBox').props() as any).inputFields[0];
const getTable = () => (component.find('QuestionBox').props() as any).inputFields[1];
const getForm = () => (component.find('Modal').props() as any).body[0];

const clickAddButton = () => {
  act(() => {
    getAddButton().props.onClick();
  });
  component.update();
};

const saveItem = (itemToSave?: unknown) => {
  act(() => {
    getForm().props.onChange(itemToSave, true);
  });
  component.update();
  act(() => {
    getForm().props.onSubmit();
  });
  component.update();
};

const setEditMode = (editIndex: number) => {
  act(() => {
    getTable().props.onEdit(editIndex);
  });
  component.update();
};

const deleteItem = (deleteIndex: number) => {
  act(() => {
    getTable().props.onDelete(deleteIndex);
  });
  component.update();
};

const render = (items?: unknown[]) => (
  <AddItemsField
    fieldText={fieldText}
    itemName={itemName}
    form={form}
    table={table}
    items={items}
    onChange={onChange}
  />
);

describe('AddItemsField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(render());
  });

  test('AddItemsField matches snapshot', () => {
    component = shallow(render());
    expect(component).toMatchSnapshot();
  });

  test('AddItemsField with initial items matches snapshot', () => {
    component = shallow(render([item, item2]));
    expect(component).toMatchSnapshot();
  });

  test('clicking the add button reveals the modal', () => {
    clickAddButton();
    const modal = component.find('Modal');

    expect((modal.props() as any).isVisible).toBe(true);
    expect((modal.props() as any).header).toBe(`Add ${capitalise(itemName)}`);
  });

  test('clicking "cancel" in the modal footer dismisses it without saving', () => {
    clickAddButton();
    const cancelButton = shallow((component.find('Modal').props() as any).footer)
      .find('Button')
      .at(0);

    act(() => {
      cancelButton.simulate('click');
    });
    component.update();
    const modal = component.find('Modal');

    expect((modal.props() as any).isVisible).toBe(false);
  });

  test('clicking "Add" in the modal sets the submissionAttempted state value to true', () => {
    clickAddButton();
    const modalSaveButton = shallow((component.find('Modal').props() as any).footer)
      .find('Button')
      .at(1);

    act(() => {
      modalSaveButton.simulate('click');
    });
    component.update();

    expect(getForm().props.submissionAttempted).toBe(true);
  });

  test('clicking "Add" in the modal does not save the item if the form is invalid', () => {
    clickAddButton();
    const modalSaveButton = shallow((component.find('Modal').props() as any).footer)
      .find('Button')
      .at(1);

    act(() => {
      modalSaveButton.simulate('click');
    });
    component.update();

    expect(onChange.mock.calls[1]).toBeUndefined();
  });

  test('saving the form calls onChange with the updated items', () => {
    saveItem(item);

    expect(onChange).toHaveBeenCalledWith([item]);
  });

  test('clicking "Add" in the modal saves the item if the form is valid', () => {
    clickAddButton();
    act(() => {
      getForm().props.onChange(item, true);
    });
    component.update();
    const modalSaveButton = shallow((component.find('Modal').props() as any).footer)
      .find('Button')
      .at(1);

    act(() => {
      modalSaveButton.simulate('click');
    });
    component.update();

    expect(onChange).toHaveBeenCalledWith([item]);
  });

  test('the table is rendered when there are saved items', () => {
    expect(getTable()).toBe(false);

    saveItem(item);

    const items = onChange.mock.calls[1][0];
    expect(getTable().props.items).toEqual(items);
  });

  test('clicking the edit button of a row in the table opens an edit modal', () => {
    saveItem(item);
    setEditMode(0);
    const modal = component.find('Modal');

    expect((modal.props() as any).isVisible).toBe(true);
    expect((modal.props() as any).header).toBe(`Edit ${capitalise(itemName)}`);
    expect(getForm().props.initialValues).toEqual(item);
  });

  test('saving an edited item updates the correct index under items', () => {
    const editedContact = {
      ...item,
      relationship: AdditionalContactRelationship.Parent
    };

    saveItem(item);
    saveItem(item2);
    setEditMode(0);
    saveItem(editedContact);
    const items = onChange.mock.calls[3][0];

    expect(items).toEqual([editedContact, item2]);
  });

  test('attempting to save an item takes no action if state.newItem is undefined', () => {
    saveItem();

    expect(onChange.mock.calls[1]).toBeUndefined();
  });

  test('clicking the delete button of a row in the table removes it from state', () => {
    saveItem(item);
    saveItem(item2);
    deleteItem(0);
    const items = onChange.mock.calls[3][0];

    expect(items).toEqual([item2]);
  });
});
