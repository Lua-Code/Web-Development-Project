import * as userService from '../services/userService.js';

export const getProfile = async (req, res) => {
    try{
        const userId = req.session.userId;
        const user = await userService.getUserProfile(userId);
        res.json(user);
    }
    catch(err){
        res.status(500).json({message: "failed to load"});
    }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const updated = await userService.updateUserProfile(userId, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
