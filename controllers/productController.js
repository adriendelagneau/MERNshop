const Product = require("../models/ProductModel");
const Order = require('../models/OrderModel');
const { find } = require("../models/ProductModel");


module.exports.addReviews = async (req, res) => {

  const {name, comment, rating} = req.body


  const id = req.params.id
  const num = await Product.findById(id)
  const newNumReviews = num.numReviews+1

  try {

    await Product.updateOne(
     { _id: id },
     { $push: { "reviews": {
         "name": name, 
         "comment": comment,
         "rating": rating
     }}},
   )
   await Product.updateOne(
     {_id: id},
    { $set: {numReviews: newNumReviews}}
      );

    const newProduct =  await Product.findById(id)
    res.status(200).json(newProduct)
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
}

module.exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id })
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports.getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
      
    } else {
      products = await Product.find()
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }  
}

module.exports.isAlreadyBought = async (req, res) => {
     
  const productIdd = (req.params.id).toString()

  const userIdd = req.body.userId


  //console.log(typeof( productIdd))
  try {
    

    const orderList = await Order.find({userId: userIdd} )
   const zz= orderList.map((x)=> (x.products) )
   const bool =  zz[0].map((x)=>(x.productId))
  bool.find((e)=> e === productIdd )

  
    

    res.status(200).send(true);
  } catch (err) {
    res.status(200).send(false);
  }
}