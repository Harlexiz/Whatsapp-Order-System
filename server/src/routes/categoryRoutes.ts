import express from 'express'
import { fetchCategories } from '../controllers/categoryController.js'


export const categoryRouter = express.Router()




//Fetch all categroy

categoryRouter.get('/all-categories', fetchCategories)




