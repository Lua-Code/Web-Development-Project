import User from "../models/User.js";

const getUserProfile = async(userId) => {
    const user = await User.findById(userId);
    return user;
};

const updateUserProfile = async(userId, data) => {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {new: true});
    return updatedUser;
};

export default {
    getUserProfile,
    updateUserProfile,
};