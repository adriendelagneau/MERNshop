const NewsLetterModel = require('../models/NewsLetterModel')
const sendEmail = require("../utils/email");

module.exports.createNewsLetter = async (req, res) => {
    const newNewsLetter = new NewsLetterModel(req.body);

    try {
        const savedNewsLetter = await newNewsLetter.save();
        res.status(200).json(savedNewsLetter);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.getNewsLetter = async (req, res) => {
    try {
        
        const emailList = await NewsLetterModel.find();
        res.status(200).json(emailList);
    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports.news = async (req, res) => {
    console.log("rrrr")
    const { subject, text} = req.body
   
    try{
        const emailList = await NewsLetterModel.find();
        emailList.map(m => sendEmail(m.email, subject, text))
        res.status(204).json("newsletter send")
    }catch(err) {
        res.status(400).json(err)
    }
}