import express from 'express';
import {
	getAllReviews,
	createRiviews,
} from '../Controllers/reviewController.js';
import { isAuth, restrictArea } from '../auth/verifytoken.js';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(getAllReviews)
	.post(isAuth, restrictArea(['patient']), createRiviews);

export default router;
