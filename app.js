const express = require('express');
const app = express();
const { User, Product, Token } = require('./db');
const path = require('path');
const { useStore } = require('react-redux');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));

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
app.use('/api/passwordReset', require('./routes/passwordReset'));
app.use('/api/passwordResetRequest', require('./routes/passwordResetRequest'));

// Product Routes

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
});

app.delete('/api/products/:id', async(req,res,next) => {
  try{
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  }
  catch(err){
    next(err);
  }
});

app.put('/api/products/:id', async(req,res,next) => {
  try{
    const product = await Product.findByPk(req.body.id);
    await product.update(req.body);
    res.status(200).send(product);
  }
  catch(err){
    next(err);
  }
});

// WishList Routes

app.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.createWishListFromWishListItems());
  }
  catch(ex){
    next(ex);
  }

});

app.put('/api/wishlist', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.addToWishList(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/wishlist', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.getWishList());
  }
  catch(ex){
    next(ex);
  }
});

// User Routes

app.post('/api/users', async(req,res,next) => {
  try{
      res.status(200).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users', async(req,res,next) => {
  try{
    res.status(200).send(await User.findAll())
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id', async(req,res,next) => {
  try{
    res.status(200).send(await useStore.findByPk(req.params.id))
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/users/:id', async(req,res,next) => {
  try{
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }
  catch(err){
    next(err);
  }
});

app.put('/api/users/:id', async(req,res,next) => {
  try{
    const user = await User.findByPk(req.body.id);
    await user.update(req.body);
    res.status(200).send(user);
  }
  catch(err){
    next(err);
  }
});

//Token Routes
app.get('/api/tokens', async(req,res,next) => {
  try{
    const token = await Token.findOne({where: {userId: req.body.userId}})
    res.send(token);
  }
  catch(err){
    next(err);
  }
})


app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err });
});



module.exports = app;
