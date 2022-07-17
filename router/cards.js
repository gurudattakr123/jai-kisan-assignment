var express = require('express');
var router = express.Router();
var {uniqueEmail} = require('../middlewears/customerInputhandler')
var cardController = require('../controller/cardController')

router.get('/:customerId/cards', cardController.getallCardsPerCustomer) // get all cards for a cusstomer 
router.get('/:customerId/:cardId') // get details of a card for a customer id
router.delete('/:customerId/:cardId')
router.post('/:customerId/cards', cardController.createCard)

module.exports = router;