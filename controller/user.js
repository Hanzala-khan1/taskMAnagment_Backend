const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken")
require('dotenv').config();

module.exports = {
   ////////////////////////////////////////////////////////////////////////////////////////

   //////////////// request to create user /////////////////
   async addUser(req, res, next) {
      try {
         createError
         const checkuser = await User.findOne({ email: req.body.email })
         if (checkuser) {
            return next(createError(404, "A user with this email already exist"))
         }
         const salt = bcrypt.genSaltSync(10)
         const hash = await bcrypt.hashSync(req.body.password, salt)
         let user = new User({
            ...req.body,
            password: hash
         })
         await user.save()
         let { password, ...info } = user;
         return res.status(200).send({
            success: true,
            message: "registered",
            status: 200,
            data: info._doc
         })
      }
      catch (error) {
         next(error)
      }
   },
   ////////////////////////////////////////////////////////////////////////////////////////////

   //////////////// login request for user /////////////////
   async login(req, res, next) {
      try {
         const checkuser = await User.findOne({ email: req.body.email })
         if (!checkuser) {
            return next(createError(404, "invalid email"))
         }
         const checkpassword = await bcrypt.compareSync(req.body.password, checkuser.password);
         if (!checkpassword) {
            return next(createError(404, "invalid password"))
         }
         let { isAdmin, password, ...info } = checkuser._doc;
         // info = info._doc;
         const token = await jwt.sign(
            { id: checkuser._id, isAdmin: checkuser.isAdmin },
            process.env.jwt_secret)
         return res.status(200).send({
            success: true,
            message: "logged in",
            status: 200,
            data: { info, token }
         })
      }
      catch (error) {
         next(error)
      }
   },
   /////////////////////////////////////////////////////////////////////////////////////

   ///////////// get all user /////////////////
   async getAll(req, res, next) {
      try {
         const findUser = await User.find()
         return res.status(200).json({
            success: true,
            message: "ALL users",
            status: 200,
            data: findUser
         })
      }
      catch (error) {
         next(error)
      }
   },
   ///////////////////////////////////////////////////////////////////////////////////

   ///////////// get single  user /////////////////
   async getOne(req, res, next) {
      try {
         const findUser = await User.findOne({ _id: req.params.id })
         return res.status(200).json({
            success: true,
            message: "User Data",
            status: 200,
            data: findUser
         })
      }
      catch (error) {
         next(error)
      }
   },
   ///////////////////////////////////////////////////////////////////////////////////

   ///////////// get single  user /////////////////
   async updatePassword(req, res, next) {
      try {
         const findUser = await User.findOne({ _id: req.params.id })
         const oldPasswordd = findUser.password;
         // return res.send(oldPasswordd)
         const compare = await bcrypt.compare(req.body.oldPassword, oldPasswordd);
         if (!compare) {
            return res.status(400).json({
               success: true,
               message: "Incorrect Old password",
               status: 400,
               data: []
            })
         }
         const salt = await bcrypt.genSalt(10);
         const Password = await bcrypt.hash(req.body.newPassword, salt)
         const updateUser = await User.findOneAndUpdate({ _id: req.params.id },
            {
               $set: { password: Password }
            }, { new: true })
         return res.status(200).json({
            success: true,
            message: "User Data",
            status: 200,
            data: updateUser
         })
      }
      catch (error) {
         next(error)
      }
   }
}