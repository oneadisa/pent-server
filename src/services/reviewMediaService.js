

import {findUserBy} from './';
import db from '../database/models';
import ApiError from '../utils/apiError';
// const { Op } = require('@sequelize/core');
const {ReviewMedia} = db;

/**
 * Creates a new Product Image.
 *
 * @param {object} reviewMediaInfo - The product to be saved in the database.
 * @memberof ReviewMediaService
 * @return {Promise<object>} A promise object with user detail.
 */
export const createReviewMedia = async (reviewMediaInfo) => {
  const user = findUserBy({id: reviewMediaInfo.userId});
  if (!user) throw new ApiError(404, `User with id: ${id} does not exist`);
  const newReviewMedia = await ReviewMedia.create(reviewMediaInfo);

  return newReviewMedia.dataValues;
};

/**
 * Find a product review
 * @param {number | object | string} options - ReviewMedia search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof ReviewMediaService
 */
export const findReviewMediaBy = async (options) => {
  return ReviewMedia.findOne({where: options});
};

/**
 * Find all product reviews given a query
 * @param {number | object | string} options - ReviewMedia search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof ReviewMediaService
 */
export const findReviewMediasBy = async (options) => {
  return ReviewMedia.findAll({where: options});
};

/**
 * Find all product reviews given a query
 * @param {number | object | string} options - ReviewMedia search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof ReviewMediaService
 */
export const findProrductImagesRating = async (options) => {
  await ReviewMedia.findAll({where: options,
    attributes: [
      [sequelize.fn('average', sequelize.col('rating')), 'total_ratings'],
    ],
  });

  // eslint-disable-next-line max-len
  // findAll({where: options}, {attributes: [[sequelize.fn('SUM', sequelize.col('rating')), 'ratings']]});
};

/**
   *
   * updates an existing ReviewMedia by ID
   * @static
   * @param {object} ReviewMediaData user properties to be updated
    * @param {string} id user id
   * @return {Promise<object | null | string> } an object containing the updated
   * properties of the user is returned on success
   * or a null value if update fails, and an error message if a user is not
   *  found
   * @memberof ReviewMediaService
   */
export const updateReviewMediaById = async (ReviewMediaData, id) => {
  const [rowaffected, [product]] = await ReviewMedia.update(
      ReviewMediaData,
      {returning: true, where: {id}},
  );
  if (!rowaffected) throw new ApiError('Not Found');
  return product;
};

/**
 * Function for update query
 *
*@param {object} newValues Object of fields to be updated
*@param {object} obj An object of the keys to be
 * searched e.g {id}, {productEmail}
 * @memberof ReviewMediaService
 * @return {Promise<ReviewMedia>} A promise object with product detail.
 */
export const updateReviewMediaBy = async (newValues, obj) => {
  const product = await findReviewMediaBy(obj);
  if (!product) {
    throw new ApiError(404, `ReviewMedia with ${obj} does not exist`);
  }

  return await product.update(newValues);
};

/**
  * Fetches a product instance based on it's primary key.
  * @param {integer} productId - Primary key of the product to be fetched.
  * @param {object} options - Additional query information
  * @return {Promise<array>} - An instance of ReviewMedia table including
  *  it's relationships.
  * @memberof ReviewMediaService
  */
export const findReviewMediaById = async (productId, options = {}) => {
  return ReviewMedia.findByPk(productId, options);
};

/**
 * Fetches all products
 * @return {Promise<array>} - An instance of notification
 *  table including it's relationships.
 * @memberof ReviewMediaService
 */
export const fetchAllReviewMedias = async () => {
  const products = await ReviewMedia.findAll({});
  return products;
};


/**
    * Updates all products' status to seen for a specific user.
    * @param {integer} productId - The product Id.
    * @return {Promise<array>} - An instance of product table including
    *  it's relationships.
    * @memberof ReviewMediaService
*/
export const deleteReviewMedia = async (productId) => {
  const deleted = await ReviewMedia.destroy({
    where: {id: productId},
  });
  return deleted;
};

/**
 * Find all product reviews given a query and give count
 * @param {number | object | string} options - Donation search value
 * @return {Promise<object>} A promise object with user detail.
 * @memberof DonationService
 */
export const findReviewMediasAndCountBy = async (options) => {
  return await ReviewMedia.findAndCountAll({where: options});
};

