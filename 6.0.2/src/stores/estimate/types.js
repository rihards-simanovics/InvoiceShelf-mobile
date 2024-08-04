import t from 'locales/use-translation';

// Form identifiers
export const ESTIMATES_FORM = 'estimate/ESTIMATES_FORM';
export const CREATE_ESTIMATE_FORM = 'estimate/CREATE_ESTIMATE_FORM';

// Action types for fetching initial details
export const FETCH_INITIAL_DETAILS = 'estimate/FETCH_INITIAL_DETAILS';

// Spinner action type
export const SPINNER = 'estimate/SPINNER';

// Action types for fetching estimates
export const FETCH_ESTIMATES = 'estimate/FETCH_ESTIMATES';
export const FETCH_ESTIMATES_SUCCESS = 'estimate/FETCH_ESTIMATES_SUCCESS';

// Action types for fetching a single estimate
export const FETCH_SINGLE_ESTIMATE = 'estimate/FETCH_SINGLE_ESTIMATE';
export const FETCH_NEXT_ESTIMATE_NUMBER = 'estimate/FETCH_NEXT_ESTIMATE_NUMBER';

// Action types for adding and updating estimates
export const ADD_ESTIMATE = 'estimate/ADD_ESTIMATE';
export const ADD_ESTIMATE_SUCCESS = 'estimate/ADD_ESTIMATE_SUCCESS';
export const UPDATE_ESTIMATE = 'estimate/UPDATE_ESTIMATE';
export const UPDATE_ESTIMATE_SUCCESS = 'estimate/UPDATE_ESTIMATE_SUCCESS';

// Action types for removing estimates
export const REMOVE_ESTIMATE = 'estimate/REMOVE_ESTIMATE';
export const REMOVE_ESTIMATE_SUCCESS = 'estimate/REMOVE_ESTIMATE_SUCCESS';

// Action types for estimate items
export const ADD_ESTIMATE_ITEM = 'estimate/ADD_ESTIMATE_ITEM';
export const ADD_ESTIMATE_ITEM_SUCCESS = 'estimate/ADD_ESTIMATE_ITEM_SUCCESS';
export const REMOVE_ESTIMATE_ITEM = 'estimate/REMOVE_ESTIMATE_ITEM';
export const REMOVE_ESTIMATE_ITEM_SUCCESS =
  'estimate/REMOVE_ESTIMATE_ITEM_SUCCESS';

// Action types for converting to invoice and changing status
export const CONVERT_TO_INVOICE = 'estimate/CONVERT_TO_INVOICE';
export const CHANGE_ESTIMATE_STATUS = 'estimate/CHANGE_ESTIMATE_STATUS';

// Action type for clearing estimate
export const CLEAR_ESTIMATE = 'estimate/CLEAR_ESTIMATE';

// Action type for fetching estimate templates success
export const FETCH_ESTIMATE_TEMPLATES_SUCCESS =
  'estimate/FETCH_ESTIMATE_TEMPLATES_SUCCESS';

// Action type for sending estimate
export const SEND_ESTIMATE = 'estimate/SEND_ESTIMATE';

// Estimate tab identifiers
export const ESTIMATES_TABS = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  ALL: 'ALL',
};

// Tab names with translations
export const TAB_NAME = {
  DRAFT: t(`estimates.tabs.draft`),
  SENT: t(`estimates.tabs.sent`),
  ALL: t(`estimates.tabs.all`),
};

// Filter options for estimate status
export const FILTER_ESTIMATE_STATUS = [
  {label: 'DRAFT', value: 'DRAFT'},
  {label: 'SENT', value: 'SENT'},
  {label: 'VIEWED', value: 'VIEWED'},
  {label: 'EXPIRED', value: 'EXPIRED'},
  {label: 'ACCEPTED', value: 'ACCEPTED'},
  {label: 'REJECTED', value: 'REJECTED'},
];

// Estimate action types
export const ESTIMATE_ACTIONS = {
  SEND: 'send',
  DELETE: 'delete',
  EDIT: 'edit',
  CONVERT_TO_INVOICE: 'convert_to_invoice',
  MARK_AS_SENT: 'mark_as_sent',
  MARK_AS_ACCEPTED: 'mark_as_accepted',
  MARK_AS_REJECTED: 'mark_as_rejected',
};

// Status constants
export const MARK_AS_SENT = 'SENT';
export const MARK_AS_ACCEPT = 'ACCEPTED';
export const MARK_AS_REJECT = 'REJECTED';
