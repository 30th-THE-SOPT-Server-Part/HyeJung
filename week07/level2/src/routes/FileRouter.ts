import { Router } from "express";
import upload from "../config/multer";
import { FileController } from "../controllers";

const router: Router = Router();

router.post("/upload", upload.single("file"), FileController.uploadFileToS3);
router.post("/uploads", upload.array("files"), FileController.uploadFilesToS3);

export default router;