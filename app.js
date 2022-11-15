const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const RootRouter = require('./rutas');
//require('dotenv').config()

class App {
  app = express();
  port = process.env.NODE_PORT || 3000;

  async initDb(){
    const dataBaseName  = 'develop'
    try {
      await mongoose.connect(`mongodb+srv://develop:develop@cluster0.q0i9x.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`)
      console.log('Db connected')
    } catch (error) {
      console.log('error', error)
    }

    
  }

  initMiddleware(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  initRoutes(){
    this.app.use('/api/v1',RootRouter)
  }

  async init(){
    this.initMiddleware();
    this.initRoutes();

    await this.initDb();

    this.app.listen(this.port)
    try {
      
      console.log(`App runningcc on port ${this.port}`)
    } catch (error) {
      console.log('error', error)
    }
  }
  

}

module.exports = App;