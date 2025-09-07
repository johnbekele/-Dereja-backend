import { ROLE_PERMISSIONS } from './roles.js'

// Middleware to check roles
const authorize = (requiredRoles = []) => {
    // Ensure it's always an array
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]

    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'Auth required' })

        const userRoles = Array.isArray(req.user.role)
            ? req.user.role
            : [req.user.role]
        const hasRole = userRoles.some((role) => roles.includes(role))

        if (!hasRole) {
            return res.status(403).json({
                error: 'Insufficient role',
                required: roles,
                current: userRoles,
            })
        }

        next()
    }
}

// Middleware to check permissions
const requirePermissions = (requiredPermissions = []) => {
    const perms = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions]

    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'Auth required' })

        // Use user's explicit permissions or fallback to role-based permissions
        const userPerms =
            req.user.permissions || ROLE_PERMISSIONS[req.user.role] || []

        const hasAllPerms = perms.every((p) => userPerms.includes(p))
        if (!hasAllPerms) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                required: perms,
                current: userPerms,
            })
        }

        next()
    }
}

export default { authorize, requirePermissions }
