import express from 'express'
import { adminLogin } from '../controllers/adminController.js'



export const adminRouter = express.Router()



//AUTH //

adminRouter.post('/login', adminLogin)



//PRODUCTS
adminRouter.get('',)