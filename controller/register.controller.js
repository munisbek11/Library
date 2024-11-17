const RegisterSchemas = require("../schemas/register.schema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, phone, email, password, role, verify_code } =
      req.body;

    const foundUser = await RegisterSchemas.findOne({ email: email });

    if (foundUser) {
      return res.json({
        message: "User has already registered",
      });
    }

    const randomNumber = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    )
      .join("")
      .trim();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_GOOGLE_PASS_KEY,
      },
    });

    const sendEmail = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verification code ov devbook",
      html: `<p style= "color: blue; font-size: 40px">Tasdiqlash kodi: <b style= "color: green; font-size: 35px">${randomNumber}</b></p>`,
    };

    await transporter.sendMail(sendEmail, (error, info) => {
      if (error) {
        res.json({
          message: error.message,
        });
      } else {
        res.json({
          message: info.response,
        });
      }
    });
    const hashedPassword = await bcryptjs.hash(password, 12);

    const userRegister = await RegisterSchemas.create({
      first_name,
      last_name,
      phone,
      email,
      password: hashedPassword,
      role,
      verify_code: randomNumber,
    });
    res.json({
      message: "Added new user",
    });
    setTimeout(async () => {
      await RegisterSchemas.findByIdAndUpdate(userRegister._id, {
        verify_code: "",
      });
    }, 60 * 1000);
  } catch (err) {
    next(err);
  }
};

const verify = async (req,res, next) => {
  try{
    const {email, verify_code_by_client} = req.body

    const foundUser = await RegisterSchemas.findOne({ email: email });

    if (!foundUser) {
      return res.json({
        message: "User not found",
      });
    }

    if(foundUser.verify_code === verify_code_by_client && verify_code_by_client ===! ""){
      await RegisterSchemas.findByIdAndUpdate(foundUser._id, {verify:true})

      const token = jwt.sign(
        {
          email: foundUser.email,
          role: foundUser.role,
        },
        process.env.SECRET_KET,
        { expiresIn: process.env.JWT_TIME }
      );
      res.json({
        message: "Verify succesfuly",
        token
      })
    } else{
      res.json({
        message: "Verify code mistake or not exists"
      })
    }

  }catch(error){
    next(error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await RegisterSchemas.findOne({ email: email });

    if (!foundUser) {
      return res.json({
        message: "User not found",
      });
    }

    const decrypt = await bcryptjs.compare(password, foundUser.password);

    if (!decrypt) {
      res.json({
        message: "Wrong password",
      });
    }

    if (foundUser.verify === true) {
      const token = jwt.sign(
        {
          email: foundUser.email,
          role: foundUser.role,
        },
        process.env.SECRET_KET,
        { expiresIn: process.env.JWT_TIME }
      );

      res.json({
        message: "Successfuly",
        token: token,
      });
    }else{
      res.json({
        message: "You were not verified",
      })
    }
    
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  register,
  login,
  verify
};
