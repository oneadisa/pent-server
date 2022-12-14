import Joi from 'joi';

import ApiError from '../utils/apiError';

/**
 * Validates review image parameters upon registration
 *
 * @param {object} review The review image object
 * @return {boolean} returns true/false.
 */
export const validateReviewMedia = async (review) => {
  // Joi parameters to test against user inputs
  const schema = Joi.object({
    publicId: Joi.string().required(),
    url: Joi.string(),
    reviewId: Joi.number(),
    userId: Joi.number(),
  });
  const {error} = await schema.validateAsync(review);
  if (error) {
    throw new ApiError(400, error.message);
  }
  return true;
};
