
const { validationResult } = require('express-validator');
const UserModel = require('../modelo/usuario.model');

module.exports =  {
  async getAll(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){

    try {
      const foundUser = await UserModel.find();

      return res.status(200).json({
        message: 'Users found',
        data: foundUser
      })
    } catch (error) {
      
      return res.status(400).json({
        message: '',
        data: []
      })
    }
  },
  async getOne(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { userId } = req.params;
    try {
      const user = await UserModel.findOne({
        _id: userId
      });

      if(!user) return res.status(400).json({
        success: false,
        message: 'El usuario no existe',
        data: null
      })

      return res.status(200).json({
        success: true,
        message: `User ${userId} found`,
        data: user
      })

    } catch (error) {
      console.log('error', error)
      return res.status(400).json({
        message: 'Erroral buscar el usuario',
        user: null
      })
    }
  },
  async create(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    try {
      const errors = validationResult(req)
      console.log('errors', errors)
      if(errors.errors.length > 0){
        return res.status(400).json({
          message: 'Error con los campos',
          errors: errors.array()
        })
      }

      const user = await UserModel.create(req.body);

      return res.status(201).json({
        message:'Usuario registrado',
        data: user
      })
    } catch (error) {
      
      return res.status(400).json({
        success: false,
        message: 'Error agregando usuario',
        details: 'Este usuario ya está registrado',
        data: null
      })
    }
  },
  async update(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { userId } = req.params;

    const errors = validationResult(req)

    if(errors.errors.length > 0){
      return res.status(400).json({
        message: 'Error con los campos',
        errors: errors.array()
      })
      }
    try {
      const user = await UserModel.findOne({
        _id: userId
      });

      if(!user) return res.status(400).json({
        success: false,
        message: 'El usuario no existe',
        data: null
      })

      await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
      })

      return res.status(200).json({
        message:'User updated',
        data: user,
      })

    } catch (error) {
      console.log('error', error)
      
      return res.status(400).json({
        message: 'Error all actulizar el usuario',
        details: 'Este usuario ya está registrado',
      })
    }
  },
  async delete(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { userId } = req.params;

    try {
      const user = await UserModel.findOneAndDelete({
        _id: userId
      });

      if(!user) return res.status(400).json({
        success: false,
        message: 'El usuario no existe',
        data: null
      })


      return res.status(200).json({
        message:'User deleted',
        data: user
      })

    } catch (error) {
      
      console.log('error', error)
      
      return res.status(400).json({
        message:'Something bad happened'
      })
    }
  }
}