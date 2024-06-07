const APPSQUADZ = {
  APP_NAME: "AppSquadz",
  MESSAGES: {
    CONNECTION_SUCCESS: "Connection to database established",
    CONNECTION_ERR: "Error with database connection",
    ENV_NOT_FOUND_ERR: "No .env found. Please add .env to app root",
    SERVER_STARTED: "AppSquadz server listening on port PORT since TIME",
    JWT_INVD_ERR: "Unable to verify token",
    JWT_EXPIRED_ERR: "Unable to verify token. Please generate new token",
    NO_TOKEN_ERR: "No auth token found in header",
    PASS_TOKEN_INVD_ERR: "Please pass token properly with Bearer <token>",
    VLD_ERR: "Validation errors found",
    NOT_MOD: "Please login with moderator's credential",
    USER_INVD_PWD_ERR:"Invalid credential",
    NUMBER_ALR_RGSTD:"This number is already registered with another account",
    EMAIL_EXISTS_ERR: "Email is already taken",
    USER_NOT_FOUND_ERR:"User not found ,Please sign up",
    USER_REG_SUCCESS: "User signup successful",
    LOGIN_SUCCESS: "Login successful",
    UPDATE_SUCCESS: "Updated successfully",
    USER_INVD_PWD_ERR: "Invalid password. Please try with correct one",
    ACCESS_DENIED: "Access denied. You're not allowed to access this api",
    USER_PROFILE: "User profile",
    DELETE_SUCCESS_BOOK:"Book deleted successfully"
  },
  VALIDATIONS: {
    USER_DETAILS_INVD: "User id is must be valid mongo id",
    EMAIL_REQ: "Email is required field",
    INVD_EMAIL: "Invalid email provided",
    NAME_REQ: "Name is required field",
    PASSWORD_REQ: "Password is required field",
    PHONE_REQ: "Phone number is required field",
    PHONE_INVD: "Phone number should be of 10 digits",
    PASSWORD_INVD:
      "Minimum 8 characters, at least one capital letter, one or more small letter, one number and one special character required",
    ATOKEN_REQ: "Access token is required field",
    TOKEN_REQ: "Token is required field",
    NAME_ALPHA: "Name must be in alphabets only",
    NAME_INVD: "Name must not be empty",
    NAME_INV: "Name must be string",
    USR_ID_REQ: "User id is required field",

  },
  ROUTES: {
    ROUTE_USER: "/user",
    ROUTE_ADMIN: "/admin",
    USER_ENDPOINTS: {
      REGISTER: "/signup",
      AUTH_EMAIL: "/phone/auth",
      PROFILE: "/profile",
      BOOK_DETAILS: "/book/detail",
      ALL_BOOKS: "/book/all",
      ADD_CART: "/cart/add",
      RETRIEVE_CART: "/cart/retrieve",
      REMOVE_CART: "/cart/remove",
      PLACE_ORDER: "/order/place",
      MY_ORDER:"/order/all"
       },
       ADMIN_ENDPOINTS: {
        AUTH_EMAIL: "/email/auth",
        CREATE_ADMIN:"/create",
        ALL_BOOKS: "/book/all",
        BOOK_DETAILS: "/book/detail",
        ADD_BOOK: "/book/add",
        REMOVE_BOOK: "/book/remove",
        UPDATE_BOOK: "/book/update",
        ALL_ORDERS: "/order/all"
         }
  },
};
export default APPSQUADZ;
