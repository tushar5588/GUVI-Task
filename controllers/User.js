const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtVerify } = require("../utils/jwtVerify");

exports.signup = async (req, res) => {
  try {
    const name = req?.body?.name;
    const email = req?.body?.email;
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      res.status(200).send({ status: 0, message: "Email already exist" });
    } else {
      const password = await bcrypt.hash(req?.body?.password, 10);
      await User.create({
        name,
        email,
        password,
      });
      const token = jwt.sign({ email, password }, process.env.JWT_PASS, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ status: 1, message: "User added successfully", token: token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};
exports.signin = async (req, res) => {
  try {
    const email = req?.body?.email;
    const password = req?.body?.password;
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      await bcrypt.compare(password, user?.password).then((status) => {
        if (status === true) {
          const password = user?.password;
          const token = jwt.sign({ email, password }, process.env.JWT_PASS, {
            expiresIn: "1d",
          });
          res.status(200).send({
            status: 1,
            message: "User login successfully",
            token: token,
          });
        } else {
          res.status(201).send({ status: 0, message: "Invalid password" });
        }
      });
    } else {
      res.status(202).send({ status: 0, message: "Email does'nt exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};
exports.getUser = async (req, res) => {
  const token = req.query.token;
  try {
    const verified = await jwtVerify(token);
    if (!verified) {
      res.status(403).send({ message: "Unauthorized request" });
    } else {
      const data = {
        name: verified?.name,
        email: verified?.email,
        dob: verified?.dob,
        phone: verified?.phone
      };
      res
        .status(200)
        .send({ message: "User data fetched successfully", data: data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const name = req?.body?.name;
    const dob = req?.body?.dob;
    const phone = req?.body?.phone;
    const token = req?.body?.token;

    const verified = await jwtVerify(token);
    if (!verified) {
      res.status(403).send({ message: "Unauthorized request" });
    } else {
      await User.updateOne({email:verified?.email},{
        name,
        phone,
        dob,
      });
      res.status(200).send({ status: 1, message: "User updated successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};
