const Order = require("../models/OrderModel");
const sendEmail = require("../utils/email");

const OrderNumber = require("../models/OrderNumberModel");



module.exports.createOrder = async (req, res) => {
 const message = req.body
 const template = "toto"

  const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();

      await sendEmail(req.body.userEmail, "Success order", message, template);///////////////////
      const titi = await OrderNumber.updateOne(
        { _id: "6294bd9fde84553953a0d397" },
        { $inc: { number: 1} }
    )

    const number = await OrderNumber.findOne();
      res.status(200).json(savedOrder);////////////////////////////////
    } catch (err) {
      res.status(500).json(err)
    }
}

module.exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedOrder);
      } catch (err) {
        res.status(500).json(err);
      }
}

module.exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports.getUserOrders = async (req, res) => {
 
  try {
      const orders = await Order.aggregate([
          {$match: { userId: req.params.userId }},
          {
            $project: {
              commande: "$orderNumber" ,
              date: {$substr : ["$createdAt", 0,10]} ,
              prix: "$amount",
              status: "$status"
            },
          },  
      ]);
      res.status(200).json({orders});
    } catch (err) {
      res.status(500).json(err);
    }
}

module.exports.getYearlyIncome = async (req, res) => {

  const productId = req.query.pid
  
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  
  const date2 = new Date()
  const toto = new Date(date2.setMonth(date2.getMonth() - 1));
  const lastYear = new Date(toto.setFullYear(toto.getFullYear() - 1));
 

    try {
      const income = await Order.aggregate([
        { $match: {   
            createdAt: { $gte: new Date (lastYear), $lt: new Date(lastMonth)},
            ...(productId && {
              products: { $elemMatch: { productId } },
              }) 
        }},
        {
          $project: {
            date: "$createdAt" ,
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },  
        {
          $group: {
            _id: "$month",
            createdAt: {$max: "$date"},
            total: { $sum: "$sales" },
          },
        },
        { $sort: {"createdAt": 1} }
      ]);
      
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
}

module.exports.getMounthlyIncome = async (req, res) => {
  const date = new Date();
const toto = new Date (date.setDate(1))
const titi = new Date (toto.setHours(1,0,0))


const date2 = new Date();
const toto2 = new Date (date2.setDate(1))
const titi2 = new Date (toto2.setHours(1,0,0))
const tata2 = new Date(titi2.setMonth(titi2.getMonth() - 2));




    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: new Date (tata2), $lt: new Date(titi)} } },
        {
          $project: {
            date: "$createdAt" ,
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },  
        {
          $group: {
            _id: "$month",
            createdAt: {$max: "$date"},
            total: { $sum: "$sales" },
          },
        },
        { $sort: {"createdAt": 1} }
      ]);
     
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
}




module.exports.getMounthlyOrders = async (req, res) => {
  const date = new Date();
  const toto = new Date (date.setDate(1))
  const titi = new Date (toto.setHours(1,0,0))
  
  
  const date2 = new Date();
  const toto2 = new Date (date2.setDate(1))
  const titi2 = new Date (toto2.setHours(1,0,0))
  const tata2 = new Date(titi2.setMonth(titi2.getMonth() - 2));


    try {
      const incomex = await Order.aggregate([
        { $match: { createdAt: { $gte: new Date (tata2), $lt: new Date(titi)} } },
        {
          $project: { 
            month: { $month: "$createdAt" },
          },
        }, 
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        }, 
       // { $sort: {"createdAt": 1} }
      ]);
      
      res.status(200).json(incomex);
    } catch (err) {
      res.status(500).json(err);
    }
}