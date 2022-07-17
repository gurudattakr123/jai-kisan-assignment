var express = require('express');
var router = express.Router();
var {uniqueEmail} = require('../middlewears/customerInputhandler')
var customerController = require('../controller/customerController')


router.get('/', customerController.getallCustomers)
router.get('/:customerId', customerController.getCustomerDetails)
router.delete('/:customerId', customerController.deleteCustomer)
router.post('/', uniqueEmail, customerController.createCustomer)


module.exports = router;
