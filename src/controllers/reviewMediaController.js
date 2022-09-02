/* eslint-disable max-len */
/* eslint-disable camelcase */
import {
  successResponse, errorResponse,
  extractReviewMediaData,
} from '../utils/helpers';
import {
// findProductBy
} from '../services';
// import cloudinary from 'cloudinary';
import {
  createReviewMedia, findReviewMediaBy, findReviewMediasBy,
  updateReviewMediaBy, findReviewMediasAndCountBy,
  fetchAllReviewMedias, deleteReviewMedia,
} from '../services';


/**
       * Creates a new ReviewMedia.
       *
       * @param {Request} req The request from the endpoint.
       * @param {Response} res The response returned by the method.
       * @memberof BusinnessController
       * @return {JSON} A JSON response with the created
       *  ReviewMedia's details.
       */
export const addReviewMedia = async (req, res) => {
  try {
    const {
      publicId,
      url,
      reviewId,
      userId,
    } = req.body;

    // const result = await cloudinary.v2.uploader.upload( {
    // folder: 'reviews',
    // });

    const reviewMediaInfo = {
      publicId,
      url,
      reviewId,
      userId,
    };
    const review = await findReviewMediaBy({reviewId, userId});
    if (review) {
      const reviewMedia = await updateReviewMediaBy(req.body,
          {reviewId, userId});
      const reviewMediaResponse = extractReviewMediaData(reviewMedia);
      successResponse(res, reviewMediaResponse, 200);
    } else {
      const reviewMedia = await createReviewMedia(reviewMediaInfo);
      successResponse(res, {...reviewMedia}, 201);
    }
  } catch (error) {
    errorResponse(res, {
      code: error.statusCode,
      message: error.message,
    });
  }
};

/**
       * Get all reviewMedias
       *
       * @static
       * @param {Request} req - The request from the browser.
       * @param {Response} res - The response returned by the method.
       * @return { JSON } A JSON response all the created reviewMedias.
       * @memberof BookingController
       */
export const getAllReviewMedias = async (req, res) => {
  try {
    const reviewMedias = await fetchAllReviewMedias();

    return res.status(200).json({
      success: true,
      reviewMedias,
    });
    successResponse(res, {...reviewMedias}, 201);
  } catch (error) {
    errorResponse(res, {
      code: error.statusCode,
      message: error.message,
    });
  }
};


/**
       * Creates accommodation booking.
       *
       * @param {Request} req - The request from the browser.
       * @param {Response} res - The response returned by the method.
       * @return { JSON } A JSON response with the newly created booking.
       * @memberof ReviewMediaController
       */
export const getReviewMediaDetails = async (req, res) => {
  try {
    const id = req.params.reviewImageId;
    const reviewMedia = await findReviewMediaBy({id});
    const reviewMediaResponse = extractReviewMediaData(reviewMedia);
    successResponse(res, reviewMediaResponse, 200);
  } catch (error) {
    errorResponse(res, {code: error.statusCode, message: error.message});
  }
};

/**
       * Get reviews that belong to a particular review.
       *
       * @static
       * @param {Request} req - The request from the browser.
       * @param {Response} res - The response returned by the method.
       * @return { JSON } A JSON response with the newly created booking.
       * @memberof ReviewMediaController
       */
export const getReviewMediasReview = async (req, res) => {
  try {
    const id = req.params.reviewId;
    const {count, rows} = await findReviewMediasAndCountBy({reviewId: id});
    return res.status(200).json({
      success: true,
      count,
      rows,
    });
    // successResponse(res, reviewMedias, 200);
  } catch (error) {
    errorResponse(res, {code: error.statusCode, message: error.message});
  }
};

/**
       * Updates a reviewMedia profile (admin)
       *

       * @param {Request} req - The request from the endpoint.
       * @param {Response} res - The response returned by the method.
       * @return { JSON } A JSON response with the new reviewMedia's
       *  profile update.
       * @memberof ReviewMediaController
       */
export const updateReviewMediaProfile = async (req, res) => {
  try {
    const id = req.params.reviewMediaId;
    const reviewMedia = await updateReviewMediaBy(req.body, {id});
    const reviewMediaResponse = extractReviewMediaData(reviewMedia);
    successResponse(res, reviewMediaResponse, 200);
  } catch (error) {
    errorResponse(res, {code: error.statusCode, message: error.message});
  }
};


/**
          * Deletes a reviewMedia on a travel request.
          *
          * @param {Request} req - The request from the endpoint.
          * @param {Response} res - The response returned by the method.
          * @return { JSON } A JSON response containing with an empty
          *  data object.
          * @memberof ReviewMediaController
          */
export const deleteReviewMediaAction = async (req, res) => {
  try {
    const reviewMediaId = req.params.reviewImageId;
    const rowDeleted = await deleteReviewMedia(reviewMediaId);
    if (!rowDeleted) return errorResponse(res, {});
    successResponse(res, {id: reviewMediaId}, 200);
  } catch (err) {
    errorResponse(res, {});
  }
};

/**
         *
         *  Get profile details
         * @static
         * @param {Request} req - The request from the endpoint.
         * @param {Response} res - The response returned by the method.
         * @param {Response} next - The response returned by the method.
         * @memberof Auth
         */
export const getMyReviewMediaDetails = async (req, res, next) => {
  try {
    const reviewMedias = await findReviewMediasBy({userId: req.user.id});
    if (!reviewMedias) {
      return errorResponse(res, {
        code: 401, message:
                    'This user exists or is logged out. Please login or sign up.',
      });
    }
    return res.status(200).json({
      success: true,
      reviewMedias,
    });
    successResponse(res, {...reviewMedias}, 201);
  } catch (error) {
    errorResponse(res, {});
  }
};

/**
         *
         *  Get profile details
         * @static
         * @param {Request} req - The request from the endpoint.
         * @param {Response} res - The response returned by the method.
         * @param {Response} next - The response returned by the method.
         * @memberof Auth
         */
export const getReviewMediaDetailsUser = async (req, res, next) => {
  try {
    const reviewMedias = await
    findReviewMediasBy({userId: req.params.userId});
    if (!reviewMedias) {
      return errorResponse(res, {
        code: 401, message:
                    'This user exists or is logged out. Please login or sign up.',
      });
    }
    return res.status(200).json({
      success: true,
      reviewMedias,
    });
    successResponse(res, {...reviewMedias}, 201);
  } catch (error) {
    errorResponse(res, {});
  }
};

