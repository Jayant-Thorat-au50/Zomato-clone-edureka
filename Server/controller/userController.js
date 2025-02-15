const UserModel = require("../Models/UserModel");
const emailValidator = require("email-validator");

const userController = {
  signUp: async (req, res) => {
    const { name, email, mobile, password, confirmPassword, address } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !address
    ) {
      res.send({
        success: false,
        message: "Every field is required",
      });
    }

    try {
      const emailValid = emailValidator.validate(email);

      if (!emailValid) {
        return res.send({
          success: false,
          message: "Invalid email",
        });
      }

      const duplicateEmailEntry = await UserModel.findOne({ email: email });
      const duplicateMobileEntry = await UserModel.findOne({ mobile: mobile });

      if (duplicateEmailEntry || duplicateMobileEntry) {
        return res.send({
          success: false,
          message: "user with this email or mobile number already exists",
        });
      }

      if (password !== confirmPassword) {
        return res.send({
          success: false,
          message: "password and confirm password does not match",
        });
      }

      const userToSave = {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
      };

      const userToBe = new UserModel(userToSave);

      const user = await userToBe.save();

      return res.send({
        success: true,
        message: user,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.send({
            success:false,
            message:'Every field is required'
        })
    }

    const user = await UserModel.findOne({ email: email, password: password });

    if (user) {
      res.send({
        success: true,
        message: user
      });
    } else {
      res.send({
        success: false,
        message: "invalid email or password",
      });
    }
  },
  getUser :async (req, res, next) => {
    // grabbing the id extracted from the token in jwt auth middleware
    // const { userId } = req.params;
  
    const {id} = req.user;
  
    console.log(req.user);
  
    try {
      const User = await UserModel.findById(id);
  
      // sending the user data to the client
     return res.status(200).json({
        success: true,
        User,
      });
    } catch (error) {
      next(new AppError(error.message, 400));
    }
  },
  // user logout
  logout :async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User logged out successfully",
      });
    }

    // deactivating the token existing at the client side
    res.cookie("Token", null, {
      maxAge: 0,
      secure: true,
      httpOnly: true,
    });

    // disable the cookie in the db
    await user.save();

    // sending the response message
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
  },
  // forget passowrd for user
  forgotPassword : async (req, res, next) => {
  const { email } = req.body;

  // validating the extracted fields
  if (!email) {
    next(new AppError("email is required", 400));
  }

  try {
    // validating the email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return next(new AppError("user with this email does not exist", 400));
    }

    // generating reset password token inside the user obj as per the userSchema
    const resetToken = await user.generateResetPasswordToken();

    // saving the user obj with added token
    await user.save();

    // to send the email with reset link to the user
    // here is the link generated with frontend url
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // sendemail utility args
    const subject = "reset password";
    const message = `<a href=${resetUrl}>Click Here</a>`;
    // sending email to email entered
    await sendEmail(email, subject, message);

    // responding user that email sent to the email id
    res.status(200).json({
      success: true,
      message: "an email is sent to your registered email id",
    });
  } catch (error) {
    // if error occurs the token set to the user obj will be disabled
    const user = await UserModel.findOne({ email });
    if (user) {
      user.forgetPasswordToken = undefined;
      user.forgetPasswordExpiry = undefined;
      await user.save();
    }
    console.log(error);

    return next(new AppError(error.message, 400));
  }
},
// user reset password
resetPassword : async (req, res, next) => {
  const { resetToken } = req.params;

  const { newPassword } = req.body;

  // validating extracted fields
  if (!newPassword) {
    next(new AppError("please enter new password", 400));
  }

  try {
    // creating encrypted form of the token received
    const forgetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // validating the token with user obj
    const user = await UserModel.findOne({
      forgetPasswordToken: forgetPasswordToken,
      forgetPasswordExpiry: { $gt: Date.now() },
    });

    // err if link is expired
    if (!user) {
      next(new AppError("link is invalid or expired", 400));
    }

    // updating the new password
    user.password = newPassword;

    // removing the token from user obj
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;

    // saving the user obj
    await user.save();

    return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
},
changePassword : async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  console.log(req.user);

  // validating extracted fields
  if (!oldPassword || !newPassword) {
    next(new AppError("please enter both old password and new password"), 400);
  }

  // getting user id from jwt auth
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).select("+password");

    // validating the the old password with the user obj
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      next(new AppError("Invalid old password", 400));
    }

    // assigning the new password to the user obj
    user.password = newPassword;
    await user.save();

    // sending the response message
    res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
},
userUpdate : async (req, res, next) => {
  const { fullName } = req.body;
  const { userId } = req.params;

  const userTobeUpdated = await UserModel.findById(userId);

  if (!userTobeUpdated) {
    return next(new AppError("Invalid user plaese try again", 400));
  }

  // if the role is admin
  // let's update the courses created by him

  if (userTobeUpdated.role === "ADMIN") {
    await CourseModel.updateMany(
      { createdby: userTobeUpdated.fullName },
      { $set: { createdby: fullName }, $inc: { points: 1 } }
    );
    userTobeUpdated.fullName = fullName;
  } else {
    userTobeUpdated.fullName = fullName;
  }

  // let's update the file profile stored in cloudinary
  // by deleting the previous one

  if (req.file) {
    console.log(req.file);

    try {
      await cloudinary.v2.uploader.destroy(userTobeUpdated.avatar.publicid);

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms-user profiles",
        height: 250,
        width: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        userTobeUpdated.avatar.publicid = result.public_id;
        userTobeUpdated.avatar.secureUrl = result.secure_url;
      }
      fs.rm(`./uploads/${req.file.filename}`);
    } catch (error) {
      return next(
        new AppError("failed to upload the image please try again", 500)
      );
    }
  }

  // save the user to be updated

  await userTobeUpdated.save();

  return res.status(200).json({
    success: true,
    data: userTobeUpdated,
    message: "User updated successfully",
  });
},
// getting the All user data
getAllUserData : async (req, res, next) => {
  try {
    // fetching the entire users collection (array)
    const allUserCount = await UserModel.find({});

    // filtering the user's array for subscribed users
    const subscribedUsers = allUserCount.filter(
      (user) => user.subscription.status === "Active"
    );

    return res.status(200).json({
      success: true,
      message: "data of all users fetched successsfully",
      allUserCount,
      subscribedUsers,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
},
// delete the user by id
deleteUser : async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message), 400);
  }
},
//filter users by role abd subscription status
filterUsers : async (req, res, next) => {
  try {
    console.log(req.body);

    const users = await UserModel.find(req.body);

    console.log(users);

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
}

};

module.exports = userController;
