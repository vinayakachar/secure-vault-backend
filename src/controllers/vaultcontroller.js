import asyncHandler from "../utils/asyncHandler.js";
import File from '../models/File.js'; // Ensure the path and .js extension are correct

const getMyFiles = asyncHandler(async (req, res) => {
    // We use the ID from the verified JWT (req.user.id)
    // to filter the database search
    const files = await File.find({ owner: req.user.id });

    res.status(200).json({
        message: "Your secure files retrieved",
        count: files.length,
        files
    });
});

export default getMyFiles;