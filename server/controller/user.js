const TryCatch = require("../../middleware/TryCatch");
const User = require("../../model/User/User");
const ErrorHandler = require("../../utils/errorHandel");
const sendToken = require("../../utils/jwtToken");
const checkPostBody = require("../../utils/QueryCheck");
const Fee = require("../../model/admin/Fee");
const SchoolClass = require("../../model/SchoolClass/Schoolclass");
const SchoolExam = require("../../model/ExamSchema/exammodel");
const nodemailer = require("nodemailer");
// const multer = require("multer");
const getDataUri = require("../../utils/dataUri");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../../utils/apifeature");
// const upload = require("../../middleware/multer");

// create user

const AddUser1 = TryCatch(async (req, res, next) => {
  // Check required fields based on the user role
  const role = req.user.role;
  if (role === "admin") {
    await checkPostBody(["email", "password"], req);
  } else if (role === "teacher") {
    await checkPostBody(["email", "password", "classId", "name"], req);
  }

  // Set additional request body fields
  req.body.CreateByuser = req.user.id;
  req.body.schoolId = req.user.schoolId;
  if (req.file) {
    // file upload
    const file = req.file;
    const fileUri = getDataUri(file);
    // using cloudnary
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    // Create user
    var user = await User.create({
      ...req.body,
      userimage: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });
  } else {
    // Create user
    var user = await User.create({
      ...req.body,
      userimage: {
        public_id: "aoasncmxslmrzek6uz0t",
        url: "https://res.cloudinary.com/dgtrp5bxo/image/upload/v1689078341/149071_qq9pk2.png",
      },
    });
  }

  // sending mail
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    //  host: "smtp.ethereal.email",
    //  port: 587,
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      //  user: "isai.thompson93@ethereal.email",
      user: "vaibhav.aurasoft@gmail.com",
      pass: "avjulakvbjgyfdmg",
    },
  });
  const info = await transporter.sendMail({
    from: '"vaibhav rathore" <isai.thompson93@ethereal.email>', // sender address
    to: `${user.email}`, // list of receivers
    subject: `Account created for ${req.body.role} `, // Subject line
    text: "created account", // plain text body
    html: `<p>Dear User,</p>
    <p>We are delighted to welcome to our Aurasoft school management system. .</p>
    <p>Here are your school credentials:</p>
    <ul>
      <li>Email: ${user.email}</li>
      <li>Password: ${req.body.password}</li>
    </ul> 
    <p>Thank you for joining us, and we hope you enjoy using our school management system.</p>
    <p>Sincerely,</p>
    <p>Aurasoft School Management System Team</p>
    <img src="https://res.cloudinary.com/dgtrp5bxo/image/upload/c_thumb,w_200,g_face/v1689076432/aurasoftblack_lsevrd.png"/>
    `, // html body
  });

  res.status(201).json({
    success: true,
    user,
  });
});

// create user with image

const AddUser = TryCatch(async (req, res, next) => {
  // if image are there
  if (req.file) {
    // file upload
    const file = req.file;
    const fileUri = getDataUri(file);
    // using cloudnary
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    // Create user
    var user = await User.create({
      ...req64acfd1b2fdab1902063b4d1.body,
      userimage: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });
  } else {
    // Create user
    var user = await User.create({
      ...req.body,
      userimage: {
        public_id: "aoasncmxslmrzek6uz0t",
        url: "https://res.cloudinary.com/dgtrp5bxo/image/upload/v1689078341/149071_qq9pk2.png",
      },
    });
  }

  // sending mail
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    //  host: "smtp.ethereal.email",
    //  port: 587,
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      //  user: "isai.thompson93@ethereal.email",
      user: "vaibhav.aurasoft@gmail.com",
      pass: "avjulakvbjgyfdmg",
    },
  });
  const info = await transporter.sendMail({
    from: '"vaibhav rathore" <isai.thompson93@ethereal.email>', // sender address
    to: `${user.email}`, // list of receivers
    subject: `Account created for ${req.body.role} `, // Subject line
    text: "created account", // plain text body
    html: `<p>Dear User,</p>
    <p>We are delighted to welcome to our Aurasoft school management system. .</p>
    <p>Here are your school credentials:</p>
    <ul>
      <li>Email: ${user.email}</li>
      <li>Password: ${req.body.password}</li>
    </ul> 
    <p>Thank you for joining us, and we hope you enjoy using our school management system.</p>
    <p>Sincerely,</p>
    <p>Aurasoft School Management System Team</p>
    <img src="https://res.cloudinary.com/dgtrp5bxo/image/upload/c_thumb,w_200,g_face/v1689076432/aurasoftblack_lsevrd.png"/>
    `, // html body
  });

  res.status(201).json({
    success: true,
    user,
  });
});

// Get user by ID
const UserbyId = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    // return next(new ErrorHandler("User not found", 404));
    res.status(404).json({
      success: false,
      user,
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all users
const AllUser = TryCatch(async (req, res) => {
  // Super admin fetching all users
  const query = req.query;
  const searchQuery = {
    ...query,
  };
  // const data = (await User.find(query)).reverse();
  const apifeatures = new ApiFeatures(
    User.find(searchQuery),
    req.query
  ).search();

  const data = await apifeatures.query;
  // const apifeatures = new ApiFeatures(User.find(), req.query).search();
  // const data = await apifeatures.query;

  const totalUser = data.length;
  // const totaluser = data.reverse();
  res.status(200).json({ totalUser: totalUser, data });
});

const UpdateUser = TryCatch(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // super admin
  if (req.file) {
    // udate image
    // file upload
    const file = req.file;
    const fileUri = getDataUri(file);
    // using cloudnary
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...req.body,
          userimage: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } else {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  }
  // other user
});

// Delete user
const DeleteUser = TryCatch(async (req, res) => {
  const userId = req.params.id;
  var user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  var user = await User.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});

// User login
const UserLogin = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(`Please enter email or password`, 400));
  }

  // Find user by email
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(500).json({ error: "Invalid email" });
  }

  // Compare passwords
  const passMatch = await user.comparePassword(password);
  if (!passMatch) {
    return res.status(500).json({ error: "Invalid Password" });
  }

  // Generate and send token
  sendToken(user, 200, res);
});

// Logout user
const LogOut = TryCatch(async (req, res, next) => {
  await res.clearCookie("token", { path: "/" });
  await res.status(200).send("User Logout");
});

// Get user details
const UserDetails = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({
    sucess: true,
    user,
  });
});

module.exports = {
  AddUser,
  AllUser,
  UserLogin,
  UpdateUser,
  DeleteUser,
  LogOut,
  UserDetails,
  UserbyId,
};
