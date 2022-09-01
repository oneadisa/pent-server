import Joi from 'joi';

import ApiError from '../utils/apiError';

/**
 * Validates review parameters upon registration
 *
 * @param {object} review The review object
 * @return {boolean} returns true/false.
 */
export const validateReview = async (review) => {
  // Joi parameters to test against user inputs
  const schema = Joi.object({
    reviewTitle: Joi.string().required()
        .label('Please enter a title for this review'),
    description: Joi.string().required()
        .label('Please provide a description for this review'),
    landlord: Joi.number().required()
        .label('Please enter a rating for the landlord'),
    location: Joi.number().required()
        .label('Please enter a rating for the location'),
    amenities: Joi.number()
        .required().label('Please enter a rating for the amenities'),
    ratings: Joi.number(),
    numberOfReviews: Joi.number(),
    userId: Joi.number(),
  });
  const {error} = await schema.validateAsync(review);
  if (error) {
    throw new ApiError(400, error.message);
  }
  return true;
};
