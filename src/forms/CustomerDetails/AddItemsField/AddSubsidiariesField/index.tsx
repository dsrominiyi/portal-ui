import React, { FunctionComponent } from 'react';

import AddItemsField from '..';
import SubsidiaryForm from '../../SubsidiaryForm';
import SubsidiariesTable from './SubsidiariesTable';

interface Props {
  subsidiaries?: Company[];
  onChange(values: Company[]): void;
}

export const AddSubsidiariesField: FunctionComponent<Props> = ({
  subsidiaries,
  onChange
}: Props) => (
  <AddItemsField
    fieldText="Subsidiaries (optional)"
    itemName="subsidiary"
    form={SubsidiaryForm}
    table={SubsidiariesTable}
    items={subsidiaries}
    onChange={onChange}
  />
);

AddSubsidiariesField.displayName = 'AddSubsidiariesField';
export default AddSubsidiariesField;
