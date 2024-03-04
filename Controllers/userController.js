import UserSchema from "../models/UserSchema.js";

export const userUpdate = async(req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: "true",
        message: "User updated successfully",
        data: updatedUser,
      });
  } catch (error) {
    res
    .status(500)
    .json({
      success: "false",
      message: "Failed to updated",
      data: updatedUser,
    });
  }
};

export const userDelete = async(req, res) => {
  const id = req.params.id;
  try {
    const deletedUser =await UserSchema.findByIdAndDelete(id);

    res
      .status(200)
      .json({
        success: "true",
        message: "User Delete successfully",
        data: deletedUser,
      });
  } catch (error) {
    res
    .status(500)
    .json({
      success: "false",
      message: "Failed to Delete",
      data: deletedUser,
    });
  }
};
export const singleUser = async(req, res) => {
  const id = req.params.id;
  try {
    const singleUser =await UserSchema.findById(id).select("-password");
    res
      .status(200)
      .json({
        success: "true",
        message: "Get Single User successfully",
        data: singleUser,
      });
  } catch (error) {
    res
    .status(500)
    .json({
      success: "false",
      message: "Failed to Get Single User",
      data: singleUser,
    });
  }
};

export const allUsers = async(req, res) => {

  try {
    const userAll =await UserSchema.find().select("-password");

    res
      .status(200)
      .json({
        success: "true",
        message: "Get All Users successfully",
        data: userAll,
      });
  } catch (error) {
    res
    .status(500)
    .json({
      success: "false",
      message: "Failed to Get All Users",
      data: userAll,
    });
  }
};
