import DoctorSchema from '../models/DoctorSchema';
import ReviewSchema from '../models/ReviewSchema';

export const createRiviews = async (req, res) => {
	if (!req.body.doctor) {
		req.body.doctor = req.params.userId;
	}
	if (!req.body.user) {
		req.body.user = req.userId;
	}

	const newreview = new ReviewSchema(req.body);

	try {
		const savereview = await newreview.save();
		await DoctorSchema.findByIdAndUpdate(req.body.doctor, {
			$push: { reviews: savereview._id },
		});

		res.status(200).json({ success: true, message: ' created riview' });
	} catch (error) {
		res
			.status(400)
			.json({ success: true, message: ' Failed to create riview' });
	}
};
