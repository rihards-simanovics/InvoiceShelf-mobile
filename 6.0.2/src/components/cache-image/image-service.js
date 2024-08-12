import {isEmpty} from '@/constants';

export const IS_UNDER_PROCESSING = 'IS_UNDER_PROCESSING';

/**
 * Service for managing image caching and processing states.
 */
class ImageService {
  images: Array<string>;

  constructor() {
    this.images = [];
  }

  /**
   * Adds an image to the processing list.
   * @param {string} name - The name of the image to add.
   */
  addImage = (name: string) => {
    const isAlreadyExists = this.images.find((imgName) => imgName === name);

    if (isAlreadyExists) {
      return;
    }

    this.images.push(name);
  };

  /**
   * Removes an image from the processing list.
   * @param {string} name - The name of the image to remove.
   */
  removeImage = (name: string) => {
    this.images = this.images.filter((imgName) => imgName !== name);
  };

  /**
   * Checks if an image is currently being processed.
   * @param {string} name - The name of the image to check.
   * @returns {boolean} - True if the image is under process, false otherwise.
   */
  isUnderProcess = (name: string): boolean => {
    if (isEmpty(this.images)) {
      return false;
    }

    return this.images.includes(name);
  };
}

export const CacheImageService = new ImageService();
