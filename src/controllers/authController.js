import {generateToken, successResponse, errorResponse} from '../utils/helpers';
import {createUser, getProfile} from '../services/userService';

/**
 * Registers a new user.
 *
 * @param {Request} req The request from the endpoint.
 * @param {Response} res The response returned by the method.
 * @memberof AuthController
 * @return {JSON} A JSON response with the registered user's details and a JWT.
 */
export const userSignup = async (req, res) => {
  try {
    const {body} = req;
    const user = await createUser(body);
    user.token = generateToken({email: user.email});
    // TODO: delete password field
    // user = extractUserData(user);
    const {token} = user;
    res.cookie('token', token, {maxAge: 86400000, httpOnly: true});

    successResponse(res, {...user}, 201);
  } catch (error) {
    errorResponse(res, {
      message: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const {userId} = req.params;
    // const validated = validateProfileRequest(parseInt(userId));
    // if (validated) {
    const profile = await getProfile(userId);

    successResponse(res, {...profile}, 200);
    // }
  } catch (error) {
    errorResponse(res, {
      message: error.message,
    });
  }
};

/**
*  Login an existing user
*
* @param {object} req request object
* @param {object} res reponse object
* @return {object} JSON response
*/
export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await findUserBy({email});
    if (!user) {
      throw new ApiError(401, 'Password and email combination is invalid');
    }

    if (!comparePassword(password, user.password)) {
      throw new ApiError(401, 'Password and email combination is invalid');
    }
    user.token =
      generateToken({email: user.email});
    const loginResponse = extractUserData(user);
    const {token} = loginResponse;
    res.cookie('token', token, {maxAge: 86400000, httpOnly: true});
    successResponse(res, {...loginResponse});
  } catch (error) {
    errorResponse(res, {code: error.status, message: error.message});
  };
};
/**
 *  successfully logout a user
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @return { JSON } - A JSON object containing success or failure details.
 * @memberof Auth
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {httpOnly: true});
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    // eslint-disable-next-line max-len
    return successResponse(res, {message: 'You have been successfully logged out'}, 200);
  } catch (error) {
    return errorResponse(res, {message: error.message, code: error.status});
  }
};
