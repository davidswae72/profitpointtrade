export default {
  // Authentication
  register: 'Account/register', // Registration - Post
  login: 'Account/login', // Login - POST
  confirmAccount: 'Account/confirm-email', // Confirm user account with token and id - POST
  resendConfirmation: 'Account/resend-comfirmation-email', // Resent email confirmation - POST
  userSession: 'users/session/get', // Get User session details - Get
  forgotPassword: 'Account/forgot-password', // Send reset password link - POST
  resetPassword: 'Account/password-reset', // Reset Password with token - POST
  changePassword: 'Account/change-password', // Reset Password with token - POST

  // Users
  personal: 'User/personal-details', // Get and Update user personal details - GET - PUT
  contact: 'User/contact-details', // Get and Update user contact details - GET - PUT

  // Business
  business: '/Business', // Get, Update and Delete Business Details - GET - PUT - POST - DEL

  // Grant
  grant: '/Grant', // Get and Update Grant - GET - PUT
  creatGrant: '/Grant/add-grant', // Create a Grant - POST

  // Grant Application
  application: '/GrantApplication', // Apply for grant, submit, update - POST - GrandID, ApplicationID
  getApplication: '/GrantApplication/single', // Get a single application - GET - Application ID
  getUserApplication: '/GrantApplication/user' // Get a single application - GET - Application ID

}
