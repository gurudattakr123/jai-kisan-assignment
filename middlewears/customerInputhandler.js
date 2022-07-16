const Customer = require('../models/customerSchema')
const uniqueEmail = function (req, res, next) {
    Customer.findOne({ 'emailID': req.body.emailId }, function (error, result) {
      if (result === null) {
        next();
      } else {
        res.status(409).send({error: 'duplicate email id', description: 'Email Id already taken. Please try with different email id', code: 409});
      }
    })
  }

module.exports = {
  uniqueEmail
}