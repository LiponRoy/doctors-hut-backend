import jwt from 'jsonwebtoken';
import UserSchema from '../models/UserSchema.js';
import DoctorSchema from '../models/DoctorSchema.js';

export const isAuth = (req, res, next) => {
	const authToken = req.headers.authorization;

	if (!authToken || !authToken.startsWith('Bearer')) {
		return res.status(403).json({ message: 'No Token no authorization' });
	}

	try {
		const token = authToken.split(' ')[1];
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decode.id;
		req.role = decode.role;
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(403).json({ message: 'Token has Expired' });
		}
		return res.status(403).json({ message: 'Invalid Token' });
	}
};

export const restrictArea = (roles) => async (req, res, next) => {
	const userId = req.userId;
	console.log('uid ', userId);
	let user;

	const patient = await UserSchema.findById(userId);
	const doctor = await DoctorSchema.findById(userId);

	if (patient) {
		user = patient;
	} else if (doctor) {
		user = doctor;
	}

	if (!roles.includes(user.role)) {
		return res
			.status(403)
			.json({ success: 'false', message: 'You are not Authorized person' });
	}

	next();
};
