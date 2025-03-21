const MoneyReceipt = require("../models/MoneyReceiptModal");
const { successResponse } = require("../utils/responseHandler");


const createNewMoneyReceipt = async (req, res, next) => {
    try {
        const user = req.user;
        if( !user?.id) throw createError(500, "You can't create ");

        const body = req.body;
        
        const receipt = await MoneyReceipt.create({...body});

        return successResponse(res,{
            message: 'Save money receipt',
            payload: {
                receipt
            }
        })
      
    } catch (error) {
        next(error)
    }
}

const updateMoneyReceiptByID = async (req, res, next) => {
    try {
        const user = req.user;
        if( !user?.id) throw createError(500, "You can't update ");

        const body = req.body;
        
        const receipt = await MoneyReceipt.findByIdAndUpdate(req.params.id, {...body}, {new:true, runValidators:true});

        return successResponse(res,{
            message: 'Update money receipt',
            payload: {
                receipt
            }
        })
      
    } catch (error) {
        next(error)
    }
}

const getAllMoneyReceipt = async (req, res, next) => {
    try {

        const user = req.user;
        if( !user?.id) throw createError(500, "You can't Access ");

        
        const receipts = await MoneyReceipt.find({})
        .sort({createdAt:-1});

        return successResponse(res, {
            statusCode:200,
            message:"Receipts",
            payload:{
                receipts,
            }
        })
    } catch (error) {
        next(error)
    }
}



const deleteReceipt = async (req, res, next) => {
    try {
        const user = req.user;
        if( !user?.id) throw createError(500, "You can't Access ");

        const { id } = req.params;
        const receipt = await MoneyReceipt.findByIdAndDelete(id);
        
        return successResponse(res, {
            statusCode:200,
            message:"Delete successfull",
            payload:{
                receipt,
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNewMoneyReceipt,
    updateMoneyReceiptByID,
    getAllMoneyReceipt,
    deleteReceipt
}