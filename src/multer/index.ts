import multer, { memoryStorage } from "multer";
import { BadRequest } from "@tsed/exceptions";

const upload = multer({
	storage: memoryStorage(),
	fileFilter: (_req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(new BadRequest("Only image files are allowed"));
		}
	},
});

export default upload;
