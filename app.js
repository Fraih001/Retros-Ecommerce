const express = require('express');
const app = express();
const { User, Product } = require('./db');
const path = require('path');
const { useStore } = require('react-redux');
app.use(express.json());
app.use('/dist', express.static('dist'));

const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api/orders', require('./routes/orders'));
app.use('/api/sessions', require('./routes/sessions'));

app.get('/api/products', async(req,res,next)=>{
  try{
    res.status(200).send(await Product.findAll())

  }catch(er){
    next(er);
  }
});

app.get('/api/products/:id', async(req,res,next)=>{
  try{
    const game = await Product.findByPk(req.params.id);
    res.status(200).send(game);

  }catch(er){
    next(er);
  }
})

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err });
});

app.post('/api/users', async(req,res,next) => {
  try{
      res.status(200).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
})

app.get('/api/users', async(req,res,next) => {
  try{
    res.status(200).send(await User.findAll())
  }
  catch(ex){
    next(ex);
  }
})
app.get('/api/users/:id', async(req,res,next) => {
  try{
    res.status(200).send(await useStore.findByPk(req.params.id))
  }
  catch(ex){
    next(ex);
  }
})

app.delete('/api/users/:id', async(req,res,next) => {
  try{
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }
  catch{ex}{
    next(ex);
  }
})

app.put('/api/users', async(req,res,next) => {
  try{
    const user = await User.findByPk(req.body.id);
    console.log(user);
    await user.update(req.body);
    res.status(200).send(user);
  }
  catch(ex){
    next(ex);
  }
})



module.exports = app;
