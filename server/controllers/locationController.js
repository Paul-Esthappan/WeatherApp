const User = require("../models/user");

// Save location
// @desc Save location to db
// @route PUT /api/update/save
// @access Private

const saveLocation = async (req, res, next) => {
    try {
        const userId = req.user._id;
        console.log("userid is",userId);
   
        console.log("body",req.body);
        const { location } = req.body;

        await User.findByIdAndUpdate(userId, {
          
            $push: { savedLocations: location }
        });

        res.status(200).json(User.savedLocations);
    } catch (error) {
        next(error);
    }
};

// Unsave location
// @desc Unsave location from db
// @route PUT /api/update/unsave/:id
// @access Private

const unsaveLocation = async (req, res, next) => {
    
    try {

         const userId = req.user._id;
        console.log("userid is",userId);
   
        console.log("body",req.body);
        const { location } = req.body;

        await User.findByIdAndUpdate(userId, {
          
            $pull: { savedLocations: location }
        });

        res.status(200).json({ message: "Unsaved successfully" });
   
       

    } catch (error) {
        next(error);
    }
};

module.exports = { saveLocation, unsaveLocation };
