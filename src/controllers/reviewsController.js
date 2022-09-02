import {successResponse, errorResponse,
  extractReviewData} from '../utils/helpers';
// import {findStoreBy} from '../services';
// import cloudinary from 'cloudinary';
import {v2 as cloudinary} from 'cloudinary';
require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
import {createReview, findReviewBy, updateReviewBy,
  fetchAllReviews, deleteReview, findReviewsBy,
  findReviewMediasAndCountBy, createReviewMedia,
  findBestReviews, findRecentReviews,
} from '../services';


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// cloudinary.config({
//   secure: true,
// });

// console.log(cloudinary.config());
/**
   * Creates a new Review.
   *
   * @param {Request} req The request from the endpoint.
   * @param {Response} res The response returned by the method.
   * @memberof BusinnessController
   * @return {JSON} A JSON response with the created Review's details.
   */
export const addReview = async (req, res) => {
  try {
    const {
      reviewTitle,
      description,
      landlord,
      location,
      amenities,
      numberOfReviews,
      ratings,
      userId,
    } = req.body;
    let imagesArray = [];
    if (typeof req.body.images === 'string') {
      imagesArray.push(req.body.images);
    } else {
      imagesArray = req.body.images;
    }
    const reviewInfo = {
      reviewTitle,
      description,
      landlord,
      location,
      amenities,
      numberOfReviews,
      ratings,
      userId,
    };

    const preReview = await createReview(reviewInfo);
    const review = preReview;
    const imagesLinks = [];
    if (imagesArray !== undefined) {
      console.log(imagesArray);
      for (let i = 0; i < imagesArray.length; i++) {
        const result = await cloudinary.uploader.upload(imagesArray[i], {
          folder: 'pent',
        });
        console.log('success', result);
        imagesLinks.push({
          publicId: result.public_id,
          url: result.secure_url,
        });
        console.log(imagesLinks);
      }

      for (let i = 0; i < imagesLinks.length; i++) {
        const {publicId, url} = imagesLinks[i];
        const reviewMediaInfo = {
          publicId,
          url,
          reviewId: preReview.id,
          userId,
        };
        await createReviewMedia(reviewMediaInfo);
      // await createReviewMedia(imagesLinks[i], review.id,
      // userId );
      }

      // eslint-disable-next-line max-len
      const review = await updateReviewBy({images: imagesLinks[0].url}, {id: preReview.id});
      const {count, rows} = await
      findReviewMediasAndCountBy({reviewId: preReview.id});

      return res.status(200).json({
        success: true,
        preReview,
        review,
        reviewMedia: {
          count,
          rows,
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        review,
      });
    }
  } catch (error) {
    // console.log(error);
    errorResponse(res, {
      code: error.statusCode,
      message: error.message,
    });
  }
};

/**
     * Get all reviews
     *
     * @static
     * @param {Request} req - The request from the browser.
     * @param {Response} res - The response returned by the method.
     * @return { JSON } A JSON response all the created reviews.
     * @memberof BookingController
     */
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await fetchAllReviews();

    return res.status(200).json({
      success: true,
      reviews,
    });
    // successResponse(res, {...reviews}, 201);
  } catch (error) {
    errorResponse(res, {
      code: error.statusCode,
      message: error.message,
    });
  }
};

/**
     * Get all reviews
     *
     * @static
     * @param {Request} req - The request from the browser.
     * @param {Response} res - The response returned by the method.
     * @return { JSON } A JSON response all the created reviews.
     * @memberof BookingController
     */
export const getRecentReviews = async (req, res) => {
  try {
    const reviews = await findRecentReviews();

    return res.status(200).json({
      success: true,
      reviews,
    });
    // successResponse(res, {...reviews}, 201);
  } catch (error) {
    errorResponse(res, {
      code: error.statusCode,
      message: error.message,
    });
  }
};

/**
     * Get all reviews
     *
     * @static
     * @param {Request} req - The request from the browser.
     * @param {Response} res - The response returned by the method.
     * @return { JSON } A JSON response all the created reviews.
     * @memberof BookingController
     */
export const getBestReviews = async (req, res) => {
  try {
    const reviews = await findBestReviews();

    return res.status(200).json({
      success: true,
      reviews,
    });
    // successResponse(res, {...reviews}, 201);
  } catch (error) {
    errorResponse(res, {
      code: error.statusCode,
      message: error.message,
    });
  }
};

/**
     * Get a particular review review details.
     *
     * @param {Request} req - The request from the browser.
     * @param {Response} res - The response returned by the method.
     * @return { JSON } A JSON response with the newly created booking.
     * @memberof ReviewController
     */
export const getReviewDetails = async (req, res) => {
  try {
    const id = req.params.reviewId;
    const review = await findReviewBy({id});
    const reviewResponse = extractReviewData(review);
    successResponse(res, reviewResponse, 200);
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
     * @memberof ReviewController
     */
export const updateReviewRating = async (req, res) => {
  try {
    const id = req.params.reviewId;
    const {rating} = req.body;
    const review = await findReviewBy({id});
    const sum = review.ratings * review.numberOfReviews;
    const newNumberOfReviews = review.numberOfReviews + 1;
    const newRating = (rating + sum)/newNumberOfReviews;
    const newReview = await updateReviewBy({ratings: newRating,
      numberOfReviews: newNumberOfReviews}, {id});
    const reviewResponse = extractReviewData(newReview);
    return successResponse(res, reviewResponse, 200);
    // return res.status(200).json({
    //   success: true,
    //   reviewRating,
    //   reach,
    // });
    // return successResponse(res, reviews, 200);
  } catch (error) {
    errorResponse(res, {code: error.statusCode, message: error.message});
  }
};


/**
     * Updates a review profile (admin)
     *

     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @return { JSON } A JSON response with the new review's
     *  profile update.
     * @memberof ReviewController
     */
export const updateReviewProfile = async (req, res) => {
  try {
    const id = req.params.reviewId;
    const review = await updateReviewBy(req.body, {id});
    const reviewResponse = extractReviewData(review);
    successResponse(res, reviewResponse, 200);
  } catch (error) {
    errorResponse(res, {code: error.statusCode, message: error.message});
  }
};


/**
        * Deletes a review on a travel request.
        *
        * @param {Request} req - The request from the endpoint.
        * @param {Response} res - The response returned by the method.
        * @return { JSON } A JSON response containing with an empty data object.
        * @memberof ReviewController
        */
export const deleteReviewAction = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const rowDeleted = await deleteReview(reviewId);
    if (!rowDeleted) return errorResponse(res, {});
    successResponse(res, {id: reviewId}, 200);
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
export const getMyReviewDetails = async (req, res, next) => {
  try {
    const {count, rows} = await findReviewsBy({userId: req.user.id});
    if (!rows) {
      return errorResponse(res, {
        code: 401, message:
          'User does not exists or is logged out. Please login or sign up.',
      });
    }
    return res.status(200).json({
      success: true,
      count,
      rows,
    });
    // successResponse(res, {...reviews}, 201);
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
export const getReviewDetailsUser = async (req, res, next) => {
  try {
    const {count, rows} = await
    findReviewsBy({userId: req.params.userId});
    if (!rows) {
      return errorResponse(res, {
        code: 401, message:
          'This user exists or is logged out. Please login or sign up.',
      });
    }
    return res.status(200).json({
      success: true,
      count,
      rows,
    });
    // successResponse(res, {...reviews}, 201);
  } catch (error) {
    errorResponse(res, {});
  }
};

