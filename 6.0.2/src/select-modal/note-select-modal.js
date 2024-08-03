import React from 'react';
import {SelectField, View} from '@/components';
import t from 'locales/use-translation';
import {TouchableOpacity} from 'react-native';
import {Text} from '@/components';
import {ITheme} from '@/interfaces';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';
import {defineSize} from '@/helpers/size';

interface IProps {
  /**
   * An array of objects with data for each note.
   */
  notes?: Array<any>;

  /**
   * An action to fetch the list of notes.
   */
  fetchNotes?: () => void;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * Callback function to handle selection.
   */
  onSelect?: (note: any) => void;
}

let notesReference = React.createRef();

/**
 * A modal component for selecting notes.
 *
 * @param props - The properties for the NoteSelectModal component.
 * @returns A rendered SelectField component for note selection.
 */
export const NoteSelectModal = (props: IProps) => {
  const {notes, fetchNotes, theme, onSelect} = props;

  return (
    <SelectField
      {...props}
      items={notes}
      getItems={fetchNotes}
      apiSearch
      hasPagination
      onlyPlaceholder
      paginationLimit={defineSize(15, 15, 15, 20)}
      reference={(ref) => (notesReference = ref)}
      headerProps={{title: t('notes.select')}}
      emptyContentProps={{contentType: 'notes'}}
      onSelect={onSelect}
      customView={
        PermissionService.isAllowToView(routes.NOTES) ? (
          <TouchableOpacity onPress={() => notesReference?.onToggle?.()}>
            <Text
              primary
              h4
              style={{paddingBottom: 10}}
              color={theme?.viewLabel?.thirdColor}
            >
              {t('notes.insert_note')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="mt-32"></View>
        )
      }
    />
  );
};
