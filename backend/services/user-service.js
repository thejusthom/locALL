import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

// Initialize active refresh tokens array
let activeRefreshTokens = [];

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, 'mySecretKey', { expiresIn: '2m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, 'myRefreshSecretKey');
};

// Verify the validity of the access token
export const verifyAccessToken = (token) => {
    try {
      return jwt.verify(token, 'mySecretKey');
    } catch (err) {
      console.log(err);
      throw new Error('JWT token expired');
    }
};
  
// Verify the validity of the refresh token
export const verifyRefreshToken = async (token) => {
    try {
      return jwt.verify(token, 'myRefreshSecretKey');
    } catch (err) {
      console.log(err);
      throw new Error('JWT token expired');
    }
};

// Get All Users using find method
export const getAll = async () => {
    return User.find();
}

// Add User to database using save method 
export const save = async (newUser) => {
    const user = new User(newUser);
    return user.save();
}

// Get a User by id using findById 
export const getById = async (id) => {
    const user = await User.findById(id).exec();
    return user;
}

//Get users by providing params
export const getByParams = async (params = {}) => {
    const users = await User.find(params).exec();
    return users;
}

// Updating the user by giving id and updated body
export const update = async (updatedUser, id) => {
    const updated = await User.findByIdAndUpdate(id, updatedUser).exec();
    return updated;
}

// Deleting the user by providing id
export const remove = async (id) => {
    return await User.findByIdAndDelete(id).exec();
}

//Validating login
export const login = async (user) => {
  const foundUser = await User.findOne(user).exec();

  if (!foundUser) {
      throw new Error('User not found');
  }
  
  const refreshToken = generateRefreshToken(foundUser);
  activeRefreshTokens.push(refreshToken);
  console.log(activeRefreshTokens);
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  const accessToken = generateAccessToken(foundUser);
  return { user: foundUser, accessToken, refreshToken };
}

//Logout
export const logout = async (userId) => {
    const user = await User.findById(userId).exec();
    if (user) {
      activeRefreshTokens = activeRefreshTokens.filter((token) => token !== user.refreshToken);
      await user.save();
    }
};

// Refreshing the access token
export const refreshTokens = async (refreshToken) => {
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }
  
    // if (!activeRefreshTokens.includes(refreshToken)) {
    //   throw new Error('Refresh token is not valid');
    // }
  
    try {
      const user = jwt.verify(refreshToken, 'myRefreshSecretKey');
      user._id=user.id;
      activeRefreshTokens = activeRefreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
      activeRefreshTokens.push(newRefreshToken);
  
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  };