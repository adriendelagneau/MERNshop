const KEY ="sk_test_51KAWq5ENA1NVOuj2IUZnrYvvITve6UynUCnAlhADiOmZCG9qEBGI6HxNoSg655L5U0dXzaihtE9Mq1mQrsbDtraN006e0496si"
const stripeAPI = require("stripe")(KEY);

module.exports.payment = async (req,res) => {
 
  const domainUrl = process.env.CLIENT_URL
  const { line_items } = req.body
  // check req body has line items and emeail
  if (!line_items) {
      return res.status(400).json({
          error: 'missing require session parameters'
      })
  }
  let session
  try {
      session = await stripeAPI.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'],
      
          line_items,
          success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${domainUrl}/cancel`,
          shipping_address_collection: { allowed_countries: ['FR']}
      })
      
      res.status(200).json({
          sessionId: session.id,
          
      })
  } catch (error) {
      console.log(error)
      res.status(400).json({
          error: 'an error occured, unable to create session'
      })
  }
}

module.exports.paymentInfos = async (req,res) => {
 
  try{
    const session = await stripeAPI.checkout.sessions.retrieve(req.params.id);
        res.status(200).send(session)
   }catch(err){
       res.status(400).send(err)
   }
}