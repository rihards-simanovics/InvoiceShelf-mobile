import React from 'react';
import {AssetImage, SelectField} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each role.
   */
  roles?: Array<any>;

  /**
   * An action to fetch the list of roles.
   */
  fetchRoles?: () => void;

  /**
   * Indicates whether editing is allowed.
   */
  disabled?: boolean;

  /**
   * The company ID for filtering roles.
   */
  company_id?: string;
}

/**
 * A modal component for selecting roles.
 *
 * @param props - The properties for the RoleSelectModal component.
 * @returns A rendered SelectField component for role selection.
 */
export const RoleSelectModal = (props: IProps) => {
  const {roles, fetchRoles, disabled, company_id} = props;

  return (
    <SelectField
      {...props}
      items={roles ?? []} // Fallback to empty array if roles is undefined
      apiSearch
      hasPagination
      isRequired
      getItems={fetchRoles}
      displayName="title"
      compareField="id"
      headerProps={{title: t('users.roles'), rightIconPress: null}}
      infiniteScrollProps={{
        hideLoader: false,
        defaultQueryString: {company_id},
      }}
      emptyContentProps={{
        contentType: 'roles',
        image: AssetImage.images.empty_customers,
      }}
      isEditable={!disabled}
      baseSelectProps={{disabled}}
    />
  );
};
