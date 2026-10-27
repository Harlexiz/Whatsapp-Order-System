import express from 'express'
import { adminLogin, adminLogout, getCurrentAdmin } from '../controllers/adminController.js'
import { loginRateLimiter } from '../middleware/rateLimiter.js'
import { requireAdmin } from '../middleware/requireAdmin.js'



export const adminRouter = express.Router()



//AUTH //

adminRouter.post('/login', loginRateLimiter, adminLogin)

adminRouter.post('/logout', adminLogout)
// authRoutes.post('/logout', auth.logout);

adminRouter.get('/me', requireAdmin, getCurrentAdmin)


//PRODUCTS
