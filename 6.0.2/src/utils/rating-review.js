// Importing the StoreReview module from Expo
import * as StoreReview from 'expo-store-review';

/**
 * Opens the rating and review modal for the app.
 *
 * This function checks if the review prompt is available on the device and,
 * if so, requests the user to leave a review for the app.
 *
 * @returns {Promise<void>} A promise that resolves when the review request is made.
 */
export const openRatingReviewModal = async () => {
  try {
    // Check if the review prompt is available on the device
    const isAvailable = await StoreReview.isAvailableAsync();

    // Exit if the review prompt is not available
    if (!isAvailable) {
      return;
    }

    // Request the user to leave a review
    StoreReview.requestReview();
  } catch (e) {
    // Optionally handle any errors that occur during the review request
    console.error('Error requesting review:', e);
  }
};
