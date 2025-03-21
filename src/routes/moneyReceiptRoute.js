const { createNewMoneyReceipt, getAllMoneyReceipt, deleteReceipt, updateMoneyReceiptByID } = require('../controllers/MoneyReceiptController');
const { isAuth } = require('../middleware/isAuth');
const moneyRouter = require('express').Router();

moneyRouter.post(`/money_receipt`, isAuth, createNewMoneyReceipt )
moneyRouter.patch(`/money_receipt/:id`, isAuth, updateMoneyReceiptByID )
moneyRouter.get(`/money_receipt`, isAuth,  getAllMoneyReceipt )
moneyRouter.delete(`/money_receipt/:id`, isAuth,  deleteReceipt )

module.exports = moneyRouter;