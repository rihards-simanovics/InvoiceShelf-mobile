import React, {Component} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ListView} from '../list-view';
import {MainLayout, DefaultLayout} from '../layouts';
import {InfiniteScroll} from '../infinite-scroll';
import {ScrollView} from '../scroll-view';
import {defineSize} from '@/helpers/size';
import {commonSelector} from 'stores/common/selectors';
import {IProps} from './type.d';
import {isIosPlatform} from '@/helpers/platform';

/**
 * Screen component that renders a modal with customizable layouts and content.
 */
class Screen extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      visible,
      onToggle,
      headerProps,
      onSearch,
      bottomDivider = false,
      listViewProps,
      defaultLayout,
      children,
      bottomAction,
      searchInputProps,
      searchFieldProps,
      isPagination = false,
      infiniteScrollProps,
      scrollViewProps,
      customView,
      theme,
    } = this.props;

    // Determine the children to render based on pagination
    const listViewChildren = isPagination ? (
      <View style={styles.listViewContainer}>
        <InfiniteScroll {...infiniteScrollProps}>
          <ListView {...listViewProps} />
        </InfiniteScroll>
      </View>
    ) : (
      <View style={styles.listViewContainer}>
        <ScrollView scrollViewProps={scrollViewProps}>
          <ListView {...listViewProps} />
        </ScrollView>
      </View>
    );

    return (
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={onToggle && onToggle}
        hardwareAccelerated={true}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          {!defaultLayout ? (
            <MainLayout
              headerProps={{
                ...headerProps,
                containerStyle: styles.header,
              }}
              onSearch={onSearch}
              bottomDivider={bottomDivider}
              bottomAction={bottomAction}
              inputProps={searchInputProps}
              searchFieldProps={{
                ...searchFieldProps,
                inputContainerStyle: {
                  height: 38,
                },
                inputFieldStyle: styles.inputField(theme),
                containerStyle: {marginTop: 14},
              }}
            >
              {listViewChildren}
            </MainLayout>
          ) : (
            <DefaultLayout
              headerProps={{
                ...headerProps,
                containerStyle: styles.header,
              }}
              bottomAction={bottomAction}
            >
              {children ? children : listViewChildren}
            </DefaultLayout>
          )}
        </View>
        {customView}
      </Modal>
    );
  }
}

// Map state to props using the common selector
const mapStateToProps = (state) => commonSelector(state);

// Export the connected SlideModal component
export const SlideModal = connect(mapStateToProps)(Screen);

// Styles for the SlideModal component
const styles = StyleSheet.create({
  listViewContainer: {
    paddingBottom: defineSize(0, 0, 0, 30),
    flex: 0.99,
  },
  modalContainer: {
    flex: 1,
    marginTop: -20,
  },
  header: {
    height: 120,
    paddingTop: 60,
  },
  inputField: (theme) => ({
    marginTop: theme?.mode === 'dark' && isIosPlatform ? 14 : 10,
    marginBottom: 14,
  }),
});
