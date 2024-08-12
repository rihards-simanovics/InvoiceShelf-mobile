import * as _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import {CacheImageService, IS_UNDER_PROCESSING} from './image-service';

export const BASE_DIR = `${FileSystem.cacheDirectory}/`;

/**
 * Retrieves the path of the cached image or downloads it if not available.
 * @param {string} uri - The URI of the image to cache.
 * @param {string} imageName - The name of the image.
 * @param {boolean} _isMounted - Indicates if the component is still mounted.
 * @returns {Promise<string | undefined>} - The path of the cached image or undefined.
 */
export async function getPath(
  uri: string,
  imageName: string,
  _isMounted: boolean
): Promise<string | undefined> {
  try {
    const {path, exists, isUnderProcess} = await getCacheEntry(imageName);

    if (!_isMounted) return undefined;

    if (isUnderProcess) return IS_UNDER_PROCESSING;

    if (exists) {
      return path;
    }

    return await downloadImagePath(uri, path, imageName, _isMounted);
  } catch (error) {
    return undefined;
  }
}

/**
 * Downloads the image and saves it to the cache.
 * @param {string} uri - The URI of the image to download.
 * @param {string} path - The path where the image will be saved.
 * @param {string} name - The name of the image.
 * @param {boolean} _isMounted - Indicates if the component is still mounted.
 * @returns {Promise<string | undefined>} - The path of the downloaded image or undefined.
 */
const downloadImagePath = async (
  uri: string,
  path: string,
  name: string,
  _isMounted: boolean
): Promise<string | undefined> => {
  if (!_isMounted) return undefined;

  let filePath = uri;

  try {
    await CacheImageService.addImage(name);
    const result = await FileSystem.createDownloadResumable(
      uri,
      path
    ).downloadAsync();

    if (result?.status === 200) {
      filePath = result?.uri;
    }
  } catch (e) {
    // Handle error if necessary
  } finally {
    CacheImageService.removeImage(name);
  }

  return filePath;
};

/**
 * Retrieves the cache entry for the specified image name.
 * @param {string} imageName - The name of the image.
 * @returns {Promise<{exists: boolean, path: string, isUnderProcess: boolean}>} - The cache entry information.
 */
const getCacheEntry = async (
  imageName: string
): Promise<{
  exists: boolean,
  path: string,
  isUnderProcess: boolean,
}> => {
  const path: string = `${BASE_DIR}${imageName}`;
  let exists: boolean = false;

  if (await CacheImageService.isUnderProcess(imageName)) {
    return {exists, path, isUnderProcess: true};
  }

  const info = await FileSystem.getInfoAsync(path);
  exists = info?.exists;

  return {exists, path, isUnderProcess: false};
};
