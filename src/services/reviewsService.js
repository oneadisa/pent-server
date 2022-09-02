

import {findUserBy} from './';
import db from '../database/models';
import ApiError from '../utils/apiError';
// const { Op } = require('@sequelize/core');
// import sequelize from 'sequelize';
const {Review} = db;

/**
 * Creates a new Product Review.
 *
 * @param {object} reviewInfo - The review to be saved in the database.
 * @memberof ReviewService
 * @return {Promise<object>} A promise object with user detail.
 */
export const createReview = async (reviewInfo) => {
  const user = findUserBy({id: reviewInfo.userId});
  if (!user) throw new ApiError(404, `User with id: ${id} does not exist`);
  const newReview = await Review.create(reviewInfo);

  return newReview.dataValues;
};

/**
 * Find a review review
 * @param {number | object | string} options - Review search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof ReviewService
 */
export const findReviewBy = async (options) => {
  return Review.findOne({where: options});
};

/**
 * Find all review reviews given a query
 * @param {number | object | string} options - Review search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof ReviewService
 */
export const findReviewsBy = async (options) => {
  return Review.findAndCountAll({where: options});
};

/**
 * Find all review reviews given a query
 * @param {number | object | string} options - Review search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof ReviewService
 */
export const findBestReviews = async (options) => {
  const rating = await Review.findAll({
    order: [['ratings', 'DESC']],
  });

  return rating;
};

/**
 * Find all review reviews given a query
 * @param {number | object | string} options - Review search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof ReviewService
 */
export const findRecentReviews = async (options) => {
  const rating = await Review.findAll({
    order: [['updatedAt', 'DESC']],
  });

  return rating;
};

/**
 * Find all review reviews given a query and give count
 * @param {number | object | string} options - Donation search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof DonationService
 */
export const findReviewsAndCountBy = async (options) => {
  return await Review.findAndCountAll({where: options});
};

/**
   *
   * updates an existing Review by ID
   * @static
   * @param {object} ReviewData user properties to be updated
    * @param {string} id user id
   * @return {Promise<object | null | string> } an object containing the updated
   * properties of the user is returned on success
   * or a null value if update fails, and an error message if a user is not
   *  found
   * @memberof ReviewService
   */
export const updateReviewById = async (ReviewData, id) => {
  const [rowaffected, [review]] = await Review.update(
      ReviewData,
      {returning: true, where: {id}},
  );
  if (!rowaffected) throw new ApiError('Not Found');
  return review;
};

/**
 * Function for update query
 *
*@param {object} newValues Object of fields to be updated
*@param {object} obj An object of the keys to be
 * searched e.g {id}, {reviewEmail}
 * @memberof ReviewService
 * @return {Promise<Review>} A promise object with review detail.
 */
export const updateReviewBy = async (newValues, obj) => {
  const review = await findReviewBy(obj);
  if (!review) {
    throw new ApiError(404, `Review with ${obj} does not exist`);
  }

  return await review.update(newValues);
};

/**
  * Fetches a review instance based on it's primary key.
  * @param {integer} reviewId - Primary key of the review to be fetched.
  * @param {object} options - Additional query information
  * @return {Promise<array>} - An instance of Review table including
  *  it's relationships.
  * @memberof ReviewService
  */
export const findReviewById = async (reviewId, options = {}) => {
  return Review.findByPk(reviewId, options);
};

/**
 * Fetches all reviews
 * @return {Promise<array>} - An instance of notification
 *  table including it's relationships.
 * @memberof ReviewService
 */
export const fetchAllReviews = async () => {
  const reviews = await Review.findAll({});
  return reviews;
};


/**
    * Updates all reviews' status to seen for a specific user.
    * @param {integer} reviewId - The review Id.
    * @return {Promise<array>} - An instance of review table including
    *  it's relationships.
    * @memberof ReviewService
*/
export const deleteReview = async (reviewId) => {
  const deleted = await Review.destroy({
    where: {id: reviewId},
  });
  return deleted;
};

/**
* Get user's request history from database
* @param {integer} id - The user id
* @return {Promise<object>} A promise object with user requests.
* @memberof RequestService
*/
// export const getRequests = async (id) => {
//   return Request.findAll({
// include: [{
//   model: Status,
//   as: 'status',
//   attributes: ['label'],
// },
// {
//   model: User,
//   as: 'manager',
//   attributes: ['lineManager'],
// }],
// where: {requesterId: id},
//   });
// };
