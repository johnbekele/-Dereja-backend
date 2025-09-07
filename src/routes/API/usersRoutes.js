import { Router } from 'express'
import userController from '../../controllers/userController.js'
import auth from '../../middleware/AuthorizeRole.js'
import { ROLES } from '../../middleware/roles.js'
import verifyJWT from '../../middleware/verifyJWT.js'

const router = Router()

// Apply JWT verification to all routes
router.use(verifyJWT)

// Helper to safely register routes
const createRoute = (method, path, roles, controllerMethod) => {
    if (typeof controllerMethod !== 'function') {
        controllerMethod = (req, res) =>
            res.status(501).json({ error: 'Method not implemented', path })
    }

    const authMiddleware = auth.authorize(roles)
    router[method](path, authMiddleware, controllerMethod)
    console.log(`✅ Route registered: ${method.toUpperCase()} ${path}`)
}

// Routes
createRoute(
    'get',
    '/users',
    [ROLES.Admin, ROLES.SuperAdmin, ROLES.SupportAgent, ROLES.FinanceOfficer],
    userController.getUsers
)

createRoute(
    'get',
    '/employees/list',
    [ROLES.Admin, ROLES.SuperAdmin],
    userController.getEmployees
)

createRoute(
    'post',
    '/userinfo/:userId',
    [ROLES.Admin, ROLES.SuperAdmin, ROLES.SupportAgent, ROLES.FinanceOfficer],
    userController.findUserProfile
)

createRoute(
    'post',
    '/escalate/:id',
    [ROLES.Admin, ROLES.SuperAdmin],
    userController.escalateUser
)

createRoute(
    'delete',
    '/delete/:id',
    [ROLES.Admin, ROLES.SuperAdmin],
    userController.deleteUser
)

createRoute(
    'put',
    '/freez/access/:id',
    [ROLES.Admin, ROLES.SuperAdmin, ROLES.SupportAgent, ROLES.FinanceOfficer],
    userController.freezUser
)

createRoute(
    'put',
    '/restore/access/:id',
    [ROLES.Admin, ROLES.SuperAdmin, ROLES.SupportAgent, ROLES.FinanceOfficer],
    userController.unfreezUser
)

createRoute(
    'post',
    '/create',
    [ROLES.Admin, ROLES.SuperAdmin],
    userController.createUser
)

export default router
