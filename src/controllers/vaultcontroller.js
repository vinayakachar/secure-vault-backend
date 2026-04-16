import asyncHandler from "../utils/asyncHandler.js";
import File from '../models/File.js'; 
import fs from 'fs';
import path from 'path';

const getMyFiles = asyncHandler(async (req, res) => {
    const files = await File.find({ owner: req.user.id });

    res.status(200).json({
        message: "Your secure files retrieved",
        count: files.length,
        files
    });
});


const deleteFile = asyncHandler(async (req, res) => {
    const fileId = req.params.id;

    const file = await File.findById(fileId);

    if (!file) {
        return res.status(404).json({ message: "File not found" });
    }


    if (file.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this file" });
    }

   
    fs.unlink(file.filePath, async (err) => {
        if (err) {
            console.error("Failed to delete physical file:", err);
            
        }

        await File.findByIdAndDelete(fileId);

        res.status(200).json({ message: "File permanently deleted from vault" });
    });
});

export {getMyFiles, deleteFile};