const { Router } = require('express');
const usuarioController = require('../controlador/usuario.controller');
const { postMiddleware,putMiddleware } = require('../validacion/usuario.validator');


const UsuariosRouter = Router();

UsuariosRouter.get('/usuarios', usuarioController.getAll)
UsuariosRouter.get('/usuarios/:userId',usuarioController.getOne)
UsuariosRouter.post('/usuarios',postMiddleware() , usuarioController.create)
UsuariosRouter.put('/usuarios/:userId',putMiddleware(), usuarioController.update)
UsuariosRouter.delete('/usuarios/:userId', usuarioController.delete)

module.exports = UsuariosRouter;