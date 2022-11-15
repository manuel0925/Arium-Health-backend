const App = require('./app');


const StartApp = async ()=>{
  await new App().init()
}

StartApp();

  