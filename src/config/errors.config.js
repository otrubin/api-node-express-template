module.exports = {
  server_error: {
    code: "server_error",
    message: "Server error"
  },

  unknown_error: {
    code: "unknown_error",
    message: "Unknown error"
  },

  auth_email_already_register: {
    code: "auth_email_already_register",
    message: "E-mail is already in use."
  },
  auth_user_not_found: {
    code: "auth_user_not_found",
    message: "User not found."
  },
  auth_invalid_password: {
    code: "auth_invalid_password",
    message: "Invalid Password."
  },

  // см. auth.middleware.js
  auth_email_not_verified: {
    code: "auth_email_not_verified",
    message: "E-mail not verified."
  },

  password_reset_user_not_found: {
    code: "password_reset_user_not_found",
    message: "User not found."
  },
  password_reset_link_not_shared: {
    code: "password_reset_link_not_shared",
    message: "Password reset page link not shared."
  },
  password_reset_token_not_found: {
    code: "password_reset_token_not_found",
    message: "Password reset token not found."
  },
  password_reset_new_password_not_found: {
    code: "password_reset_new_password_not_found",
    message: "New password not found."
  },
  password_reset_expired_token: {
    code: "password_reset_expired_token",
    message: "Еxpired token."
  },

  email_verify_user_not_found: {
    code: "email_verify_user_not_found",
    message: "User not found."
  },
  email_verify_link_not_shared: {
    code: "email_verify_link_not_shared",
    message: "Email verify page link not shared."
  },
  email_verify_token_not_found: {
    code: "email_verify_token_not_found",
    message: "Email verify token not found."
  },
  email_verify_expired_token: {
    code: "email_verify_expired_token",
    message: "Еxpired token."
  },

  //tags
  tag_not_found: {
    code: "tag_not_found",
    message: "Tag not found."
  },
  tag_title_already_use: {
    code: "tag_title_already_use",
    message: "The tag title is already in use: "
  },

  params_not_received: {
    code: "params_not_received",
    message: "Parameters not received: "
  },
}