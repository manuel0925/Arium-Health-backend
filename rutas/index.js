const { Router } = require('express');
const UsuariosRouter = require('./usuarios.routes');


const RootRouter = Router();


RootRouter.use(UsuariosRouter)

module.exports = RootRouter;