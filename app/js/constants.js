const AppSettings = {
  appTitle: 'Waybook',
  apiUrl: process.env.API_URL,
  authUrl: process.env.AUTH_URL,
  errors: {
    grantRejected: 'way.admin.grant.rejected',
    unauthorizedRequest: 'way.admin.unauthorized'
  },
  localStorageKeys: {
    auth: 'way.admin.auth'
  },
  roles: {
    guest: 'way.guest',
    admin: 'way.admin'
  }
};

export default AppSettings;
