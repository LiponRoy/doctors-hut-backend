import DoctorSchema from "../models/DoctorSchema.js";

export const DoctorUpdate = async(req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await DoctorSchema.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: "true",
        message: "Doctor updated successfully",
        data: updatedDoctor,
      });
  } catch (error) {
    res
    .status(500)
    .json({
      success: "false",
      message: "Failed to updated",
      data: updatedDoctor,
    });
  }
};

export const DoctorDelete = async(req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor =await DoctorSchema.findByIdAndDelete(id);

    res
      .status(200)
      .json({
        success: "true",
        message: "Doctor Delete successfully",
        data: deletedDoctor,
      });
  } catch (error) {
    res
    .status(500)
    .json({
      success: "false",
      message: "Failed to Delete",
      data: deletedDoctor,
    });
  }
};
export const singleDoctor = async(req, res) => {
  const id = req.params.id;
  try {
    const singleDoctor =await DoctorSchema.findById(id).select("-password");
    res
      .status(200)
      .json({
        success: "true",
        message: "Get Single Doctor successfully",
        data: singleDoctor,
      });
  } catch (error) {
    res
    .status(500)
    .json({
      success: "false",
      message: "Failed to Get Single Doctor",
      data: singleDoctor,
    });
  }
};

export const allDoctors = async(req, res) => {

  try {
    const DoctorAll =await DoctorSchema.find().select("-password");

    res
      .status(200)
      .json({
        success: "true",
        message: "Get All Doctors successfully",
        data: DoctorAll,
      });
  } catch (error) {
    res
    .status(500)
    .json({
      success: "false",
      message: "Failed to Get All Doctors",
      data: DoctorAll,
    });
  }
};
