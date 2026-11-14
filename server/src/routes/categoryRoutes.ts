import express from 'express'
import { addCategory, fetchCategories } from '../controllers/categoryController.js'


export const categoryRouter = express.Router()




//Fetch all categroy

categoryRouter.get('/all-categories', fetchCategories) 

categoryRouter.post('/add-category',  addCategory)  // require admin




