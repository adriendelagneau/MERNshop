const OrderNumber = require("../models/OrderNumberModel");



module.exports.createOrderNumber = async (req, res) => {
    const newNumber = new OrderNumber(req.body);

    try {
      const savedNumber = await newNumber.save();
      res.status(200).json(savedNumber);
    } catch (err) {
      res.status(500).json(err);
    }
}


module.exports.getOrderNumber = async (req, res) => {
    try {
        const number = await OrderNumber.findOne();
       
        res.status(200).json(number.number);
      } catch (err) {
        res.status(500).json(err);
      }
}

module.exports.updateOrderNumber = async (req, res) => {
    
    try{
        const titi = await OrderNumber.updateOne(
            { _id: "628fce51fa5af0ee0f19b817" },
            { $inc: { number: 1} }
        )
    
        const number = await OrderNumber.findOne();
       
        res.status(200).json(number.number);
    
      }catch(err){
        res.status(500).json(err);
    }
}