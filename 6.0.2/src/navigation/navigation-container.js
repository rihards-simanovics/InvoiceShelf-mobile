import {connect} from 'react-redux';
import Navigation from './navigation';
import {commonSelector} from 'stores/common/selectors';
import {fetchBootstrap, checkOTAUpdate} from 'stores/common/actions';

// Map state to props for the navigation component
const mapStateToProps = (state) => ({
  ...commonSelector(state),
  endpointApi: state?.common?.endpointApi,
  isLogin: state?.auth?.isLogin,
  idToken: state?.auth?.idToken,
});

// Map dispatch to props for the navigation component
const mapDispatchToProps = {
  checkOTAUpdate,
  fetchBootstrap,
};

// Connect the Navigation component to the Redux store
export const ApplicationNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
