import axios from 'axios';
import {store} from '@/stores';
import {routes} from '@/navigation';
import {checkConnection, hasValue} from '@/constants';
import {navigateTo} from '@/navigation/navigation-action';
import {logoutSuccess} from 'stores/auth/actions';

// Define the properties for the request options
type IProps = {
  /** The API endpoint path */
  path: string,
  /** HTTP method */
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  /** Optional headers for the request */
  headers?: Object,
  /** Optional body data for the request */
  body?: Object,
  /** Additional Axios properties */
  axiosProps?: any,
  /** Flag to indicate if multipart form data should be used */
  withMultipartFormData?: boolean,
  /** Image data for upload */
  image: any,
  /** Name for the image field in the form data */
  imageName: string,
  /** Flag to indicate if this is a ping request */
  isPing: boolean,
  /** Type of request (e.g., 'create') */
  type: string,
};

/**
 * Class to handle API requests using Axios.
 */
export default class Request {
  /**
   * Sends a GET request to the specified path.
   *
   * @param {string} path - The API endpoint path.
   * @param {Object} options - Additional options for the request.
   * @returns {Promise<any>} The response data from the API.
   */
  static get(path, options = {}) {
    return this.request({method: 'GET', path, ...options});
  }

  /**
   * Sends a POST request to the specified path.
   *
   * @param {string} path - The API endpoint path.
   * @param {Object} data - The data to send in the request body.
   * @param {Object} options - Additional options for the request.
   * @returns {Promise<any>} The response data from the API.
   */
  static post(path, data, options = {}) {
    return this.request({method: 'POST', path, body: data, ...options});
  }

  /**
   * Sends a PUT request to the specified path.
   *
   * @param {string} path - The API endpoint path.
   * @param {Object} data - The data to send in the request body.
   * @param {Object} options - Additional options for the request.
   * @returns {Promise<any>} The response data from the API.
   */
  static put(path, data, options = {}) {
    return this.request({method: 'PUT', path, body: data, ...options});
  }

  /**
   * Sends a DELETE request to the specified path.
   *
   * @param {string} path - The API endpoint path.
   * @param {Object} data - The data to send in the request body.
   * @param {Object} options - Additional options for the request.
   * @returns {Promise<any>} The response data from the API.
   */
  static delete(path, data, options = {}) {
    return this.request({method: 'DELETE', path, body: data, ...options});
  }

  /**
   * Creates form data from the provided body.
   *
   * @param {Object} body - The body data to convert to form data.
   * @param {boolean} withMultipartFormData - Flag to indicate if multipart form data should be used.
   * @returns {FormData|string} The created form data or JSON string.
   */
  static createFormData = (body, withMultipartFormData) => {
    if (!withMultipartFormData) {
      return JSON.stringify(body); // Return JSON string if not using multipart
    }

    const formData = new FormData();
    if (!hasValue(body)) {
      return formData; // Return empty FormData if body is empty
    }
    for (const key in body) {
      body.hasOwnProperty(key) && formData.append(key, body[key]); // Append each key-value pair to FormData
    }
    return formData;
  };

  /**
   * Creates form data for image uploads.
   *
   * @param {Object} body - The body data to include with the image.
   * @param {any} image - The image data to upload.
   * @param {string} imageName - The name for the image field in the form data.
   * @param {string} type - The type of the request.
   * @returns {FormData} The created form data including the image.
   */
  static createImageFormData = (body, image, imageName, type) => {
    const formData = new FormData();

    const uri = image.uri;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append(
      imageName,
      JSON.stringify({
        name: uri.includes('.') ? `${imageName}.${fileType}` : `${imageName}`,
        data: image.base64.trimRight(), // Trim the base64 data
      })
    );

    if (type) {
      formData.append('type', type); // Append type if provided
    }

    if (!hasValue(body)) {
      return formData; // Return FormData if body is empty
    }
    for (const key in body) {
      body.hasOwnProperty(key) && formData.append(key, body[key]); // Append each key-value pair to FormData
    }
    return formData;
  };

  /**
   * Sends a request to the specified API endpoint.
   *
   * @param {IProps} props - The properties for the request.
   * @returns {Promise<any>} The response data from the API.
   */
  static async request(props: IProps) {
    const {
      path,
      method,
      body,
      headers = {},
      image,
      imageName = '',
      isPing = null,
      type = 'create',
      axiosProps,
      withMultipartFormData = false,
      throw_error = true,
    } = props;

    const reduxStore = store.getState();
    const {idToken} = reduxStore.auth;
    const {endpointApi, endpointURL} = reduxStore.common;
    const {selectedCompany} = reduxStore.company;
    let apiUrl = props['base-url'] ? endpointURL : endpointApi;

    if (isPing) {
      apiUrl = isPing; // Use ping URL if specified
    }

    const url = `${apiUrl}${path}`; // Construct the full API URL

    const isConnected = await checkConnection(); // Check network connection

    if (!isConnected) {
      navigateTo({route: routes.LOST_CONNECTION}); // Navigate to lost connection screen
      return;
    }

    const defaultHeaders = {
      Authorization: `Bearer ${idToken}`, // Set authorization header
      Accept: 'application/json',
      'Content-Type': image ? 'multipart/form-data' : 'application/json', // Set content type based on presence of image
      company: selectedCompany?.id ?? 1, // Set company ID
      ...headers, // Merge with any additional headers
    };

    const params = !image
      ? Request.createFormData(body, withMultipartFormData) // Create form data if no image
      : Request.createImageFormData(body, image, imageName, type); // Create image form data if image is present

    return axios({
      method,
      url,
      headers: defaultHeaders,
      data: params,
      ...axiosProps, // Merge with any additional Axios properties
    })
      .then(function (response) {
        const {data} = response;

        if (data && data.hasOwnProperty('error') && throw_error) {
          throw {response: {data: {...data, status: 422}}}; // Throw error if response contains an error
        }

        return data; // Return the response data
      })
      .catch(function ({response}) {
        const {status} = response;
        if (status === 401) {
          store?.dispatch?.(logoutSuccess()); // Logout if unauthorized
        }

        throw response; // Rethrow the response for further handling
      });
  }
}
