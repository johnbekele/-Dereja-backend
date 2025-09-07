// roles.js

export const ROLES = {
    SuperAdmin: 'SuperAdmin',
    Admin: 'Admin',
    Dispatcher: 'Dispatcher',
    SupportAgent: 'SupportAgent',
    FinanceOfficer: 'FinanceOfficer',
    EndUser: 'EndUser',
    Viewer: 'Viewer',
}

// Define permissions
export const PERMISSIONS = {
    // User actions
    VIEW_ROUTES: 'viewRoutes',
    VIEW_CONNECTIONS: 'viewConnections',
    BUY_TICKET: 'buyTicket',
    REFILL_ACCOUNT: 'refillAccount',
    REPORT_ISSUE: 'reportIssue',
    CONTACT_SUPPORT: 'contactSupport',

    // Dispatcher actions
    MANAGE_ROUTES: 'manageRoutes',
    MANAGE_TRIPS: 'manageTrips',
    VIEW_BOOKINGS: 'viewBookings',
    ASSIGN_TRIPS: 'assignTrips',

    // Support actions
    VIEW_TICKETS: 'viewTickets',
    RESPOND_TICKETS: 'respondTickets',
    UPDATE_TICKETS: 'updateTickets',
    MANAGE_SUPPORT: 'manageSupport',

    // Finance actions
    VIEW_FINANCE: 'viewFinance',
    MANAGE_PAYMENTS: 'managePayments',
    VIEW_REPORTS: 'viewReports',
    GENERATE_REPORTS: 'generateReports',

    // Admin / SuperAdmin
    MANAGE_USERS: 'manageUsers',
    SYSTEM_SETTINGS: 'systemSettings',
    FULL_ACCESS: 'fullAccess',
}

export const ROLE_PERMISSIONS = {
    SuperAdmin: Object.values(PERMISSIONS),
    Admin: [
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.SYSTEM_SETTINGS,
        PERMISSIONS.MANAGE_ROUTES,
        PERMISSIONS.MANAGE_TRIPS,
        PERMISSIONS.VIEW_BOOKINGS,
        PERMISSIONS.ASSIGN_TRIPS,
        PERMISSIONS.VIEW_FINANCE,
        PERMISSIONS.MANAGE_PAYMENTS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.GENERATE_REPORTS,
        PERMISSIONS.MANAGE_SUPPORT,
    ],
    Dispatcher: [
        PERMISSIONS.MANAGE_ROUTES,
        PERMISSIONS.MANAGE_TRIPS,
        PERMISSIONS.VIEW_BOOKINGS,
        PERMISSIONS.ASSIGN_TRIPS,
        PERMISSIONS.VIEW_ROUTES,
        PERMISSIONS.VIEW_CONNECTIONS,
    ],
    SupportAgent: [
        PERMISSIONS.VIEW_TICKETS,
        PERMISSIONS.RESPOND_TICKETS,
        PERMISSIONS.UPDATE_TICKETS,
        PERMISSIONS.MANAGE_SUPPORT,
        PERMISSIONS.CONTACT_SUPPORT,
    ],
    FinanceOfficer: [
        PERMISSIONS.VIEW_FINANCE,
        PERMISSIONS.MANAGE_PAYMENTS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.GENERATE_REPORTS,
    ],
    EndUser: [
        PERMISSIONS.VIEW_ROUTES,
        PERMISSIONS.VIEW_CONNECTIONS,
        PERMISSIONS.BUY_TICKET,
        PERMISSIONS.REFILL_ACCOUNT,
        PERMISSIONS.REPORT_ISSUE,
        PERMISSIONS.CONTACT_SUPPORT,
    ],
    Viewer: [
        PERMISSIONS.VIEW_ROUTES,
        PERMISSIONS.VIEW_CONNECTIONS,
        PERMISSIONS.VIEW_BOOKINGS,
        PERMISSIONS.VIEW_REPORTS,
    ],
}
