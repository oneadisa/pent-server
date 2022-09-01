import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Hashes a password
 * @param {string} password Password to encrypt.
 * @memberof Helpers
 * @return {Promise<string>} Encrypted password.
*/
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, bcrypt.genSaltSync(10));
};

/**
 * Compares a password with a given hash
 * @param {string} password Plain text password.
 * @param {string} hash Encrypted password.
 * @memberof Helpers
 * @return {boolean} returns true if there is a match and false otherwise.
*/
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 *  Synchronously sign the given payload into a JSON Web Token string.
 * @param {string | number | Buffer | object} payLoad Payload to sign.
 * @param {string | number} expiresIn Expressed in seconds or a string
 * describing a time span. Eg: 60, "2 days", "10h", "7d". Default specified
 * is 1day.
 * @memberof Helpers
 * @return {string} JWT token.
 */
export const generateToken = (payLoad, expiresIn = '1d') => {
  return jwt.sign(payLoad, process.env.SECRET, {expiresIn});
};

/**
*  Synchronously sign the given payload into a JSON Web Token
*  string that never expires.
* @static
* @param {string | number | Buffer | object} payLoad Payload to sign.
* @memberof Helpers
* @return {string} JWT token.
*/
export const generateTokenAlive = (payLoad) => {
  return jwt.sign(payLoad, process.env.SECRET);
};

/**
 * Generates a JSON response for success scenarios.
 * @param {Response} res Response object.
 * @param {object} data The payload.
 * @param {number} code HTTP Status code.
 * @memberof Helpers
 * @return {Response} A JSON success response.
*/
export const successResponse = (res, data, code = 200) => {
  return res.status(code).json({
    status: 'success',
    data,
  });
};

/**
 * Generates a JSON response for failure scenarios.
 * @param {Response} res Response object.
 * @param {object} options The payload.
 * @param {number} options.code HTTP Status code, default is 500.
 * @param {string} options.message Error message.
 * @param {object} options.errors A collection of  error message.
 * @memberof Helpers
 * @return {Response} A JSON failure response.
*/
export const errorResponse = (res,
    {code = 500,
      message = 'Some error occurred while processing your Request',
      errors}) => {
  return res.status(code).json({
    status: 'fail',
    error: {
      message,
      errors,
    },
  });
};


/**
* Checks token from request header for user authentication
* @param {object} req - The request from the endpoint
* @memberof Helpers
* @return {Token} Token
*/
export const checkToken = async (req) => {
  const {
    headers: {authorization},
    cookies: {token: cookieToken},
  } = req;
  let bearerToken = null;
  if (authorization) {
    bearerToken = authorization.split(' ')[1] ?
      authorization.split(' ')[1] : authorization;
  }
  return cookieToken || bearerToken || req.headers['x-access-token'] ||
    req.headers.token || req.body.token;
};

/**
   *
   *  Synchronously verify the given JWT token using a secret
   * @param {*} token - JWT token.
   * @return {string | number | Buffer | object } - Decoded JWT payload if
   * token is valid or an error message if otherwise.
   * @memberof Helpers
   */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

/**
   * Generates email verification link
   * @static
   * @param { Request } req - Request object
   * @param { object } options - Contains user's data to be signed within Token.
   * @param { string } options.id - User's unique ID.
   * @param { string } options.email - User's email.
   * @param { string } options.role - User's role.
   * @memberof Helpers
   * @return {URL} - Verification link.
   */
export const generateVerificationLink = (req, {id, email, role}) => {
  const token = generateToken({id, email, role});
  // eslint-disable-next-line max-len
  const host = req.hostname === 'localhost' ? `${req.hostname}:${process.env.PORT}` :
    req.hostname;
  return `${req.protocol}://${host}/api/auth/verify?token=${token}`;
};


/**
* Extracts a new review object from the one supplied
* @param {object} review - The user data from which a new review
 object will be extracted.
* @memberof Helpers
* @return { object } - The new extracted user object.
*/
export const extractReviewData = (review) => {
  return {
    id: review.id,
    reviewTitle: review.reviewTitle,
    description: review.description,
    landlord: review.landlord,
    location: review.location,
    amenities: review.amenities,
    numberOfReviews: review.numberOfReviews,
    ratings: review.ratings,
    userId: review.userId,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
};

/**
* Extracts a new user object from the one supplied
* @param {object} user - The user data from which a new user
 object will be extracted.
* @memberof Helpers
* @return { object } - The new extracted user object.
*/
export const extractUserData = (user) => {
  return {
    id: user.id,
    isVerified: user.isVerified,
    token: user.token,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
* Extracts a new review Image object from the one supplied
* @param {object} reviewMedia - The user data from which a new review Image
 object will be extracted.
* @memberof Helpers
* @return { object } - The new extracted user object.
*/
export const extractReviewMediaData = (reviewMedia) => {
  return {
    id: reviewMedia.id,
    publicId: reviewMedia.publicId,
    url: reviewMedia.url,
    userId: reviewMedia.userId,
    reviewId: reviewMedia.reviewId,
    createdAt: reviewMedia.createdAt,
    updatedAt: reviewMedia.updatedAt,
  };
};

