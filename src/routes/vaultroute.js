import express from 'express';
import upload from '../middleware/uploadmiddleware.js';
import  verifyToken from '../middleware/authMiddleware.js';
import File from '../models/File.js';
import getMyFiles from '../controllers/vaultcontroller.js';

const router = express.Router();

// PROTECTED ROUTE: Only logged-in users can upload
router.post('/upload', verifyToken, upload.single('myFile'), async (req, res) => {
    try {
        const newFile = await File.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            owner: req.user.id // Taken from the verified JWT token!
        });

        res.status(201).json({ message: "File uploaded to vault", file: newFile });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
});

router.get('/my-files', verifyToken, getMyFiles);

export default router;