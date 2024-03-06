import express from 'express';
import {
	DoctorDelete,
	DoctorUpdate,
	allDoctors,
	singleDoctor,
} from '../Controllers/doctorController.js';
// geeting riviews router for nestiing route
import reviewsRoutes from './reviewsRoutes.js';
const router = express.Router();

// geeting riviews router for nestiing route
router.use('/:doctorId/reviews', reviewsRoutes);

router.put('/:id', DoctorUpdate);
router.delete('/:id', DoctorDelete);
router.get('/:id', singleDoctor);
router.get('/', allDoctors);

export default router;
