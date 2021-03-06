const Order = require('./ordersSchema');
// const auth = require('../../authentication/auth')
// const auth = require('../../authentication/auth');



exports.createOrder = (req, res) => {
  console.log(req)
  Order.create({
    cart: req.body.cart,
    user: req.userData.id,
    total: req.body.total,
    quantity: req.body.quantity
  })
  .then(data => {
    res.status(201).json({
      statusCode: 201,
      status: true,
      message: 'Order successfully stored',
      data
    })
  })
  .catch(err => {
    res.status(401).json(err)
  
  })


}


exports.findOrder = (req, res) => {

  Order.find({ user: req.userData.id}, (err, result) => {
    
    if(err) {
      return res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Something went wrong when fetching the products',
        err
      })
    }

    if(!result) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'You do not have any orders',
        err
      })
    }

    res.status(200).json(result)
  })
  
}



