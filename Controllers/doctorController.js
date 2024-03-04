import DoctorSchema from "../models/DoctorSchema.js";

export const DoctorUpdate = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await DoctorSchema.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: "true",
      message: "Doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Failed to updated",
      data: updatedDoctor,
    });
  }
};

export const DoctorDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await DoctorSchema.findByIdAndDelete(id);

    res.status(200).json({
      success: "true",
      message: "Doctor Delete successfully",
      data: deletedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Failed to Delete",
      data: deletedDoctor,
    });
  }
};
export const singleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const singleDoctor = await DoctorSchema.findById(id).select("-password");
    res.status(200).json({
      success: "true",
      message: "Get Single Doctor successfully",
      data: singleDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Failed to Get Single Doctor",
      data: singleDoctor,
    });
  }
};

export const allDoctors = async (req, res) => {
  try {
    const {query} = req.query;
    let DoctorAll;

    if (query) {
      // if we have any query
      DoctorAll = await DoctorSchema.find({
        // if isApproved: "approved", then get all doctors
        isApproved: "approved",
        // here only search with name or specialization
        $or: [
          { name: { $regex: query, options: "i" } },
          { specialization: { $regex: query, options: "i" } },
        ],
      }).select("-password");
    } else {
          // if we don't have any query
      DoctorAll = await DoctorSchema.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: "true",
      message: "Get All Doctors successfully",
      data: DoctorAll,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Failed to Get All Doctors",
      data: DoctorAll,
    });
  }
};
