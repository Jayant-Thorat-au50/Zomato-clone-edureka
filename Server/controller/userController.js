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
};

module.exports = userController;
