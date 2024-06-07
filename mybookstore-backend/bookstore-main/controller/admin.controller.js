import validator from "../configuration/validation.config.js";
import bcrypt from "bcrypt";
import helpers from "../helpers/index.helper.js";
import userService from "../services/user.service.js";
import orderService from "../services/order.service.js";
import bookService from "../services/books.service.js";
import responseHelper from "../helpers/response.helper.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import registerValidator from "../validators/register.validator.js";
import authByEmailValidator from "../validators/auth.email.validator.js";
import booksValidator from "../validators/books.validator.js";
import APPSQUADZ from "../helpers/message.helper.js";
import __dirname from "../configuration/dir.config.js";
import moment from "moment";

const { generateToken } = helpers,
  { validationThrowsError } = validator,
  { send200, send403, send400, send401, send404 } = responseHelper,
  { createUser, retrieveUserByEmail, updateUser, retrieveUser } = userService,
  { retrieveAllOrders } = orderService,
  { createBook, retrieveBookById, deleteBookById, updateBook } = bookService,
  { verifyToken: jwtAuthGuard } = jwtMiddleware,
  {
    MESSAGES: {
      VLD_ERR,
      USER_REG_SUCCESS,
      USER_NOT_FOUND_ERR,
      LOGIN_SUCCESS,
      NUMBER_ALR_RGSTD,
      USER_INVD_PWD_ERR,
      USER_PROFILE,
      DELETE_SUCCESS_BOOK,
    },
  } = APPSQUADZ;

const createAdmin = [
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, { status: false, message: VLD_ERR, data: errors });
      else {
        const userObj = {
          name: "admin",
          email: "admin@gmail.com",
          phoneNo: 1111111111,
          password: await bcrypt.hash("Admin@123", await bcrypt.genSalt(10)),
          role: "admin",
        };
        const created = await createUser(userObj);
        send200(res, {
          status: true,
          message: "Admin created successfully",
          data: created,
        });
      }
    },
  ],
  addBooks = [
    booksValidator.name,
    booksValidator.author,
    booksValidator.categories,
    booksValidator.description,
    booksValidator.price,
    jwtAuthGuard,
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, { status: false, message: VLD_ERR, data: errors });
      else {
        const {
          body: { name, author, description, categories, price },
        } = req;

        const bookObj = {
          name: name,
          author: author,
          description: description,
          categories: categories,
          price: Number(price),
        };
        const created = await createBook(bookObj);
        send200(res, {
          status: true,
          message: "Book added successfully",
          data: created,
        });
      }
    },
  ],
  authByEmail = [
    authByEmailValidator.email,
    authByEmailValidator.password,

    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, { status: false, message: VLD_ERR, data: errors });
      else {
        const {
          body: { email, password },
        } = req;

        let user = null;
        const existingUser = await retrieveUserByEmail(email);
        if (!existingUser) {
          send404(res, {
            status: false,
            message: "Error",
            data: [{ msg: USER_NOT_FOUND_ERR }],
          });
        } else {
          console.log(existingUser.role, "existingUser.role");
          if (existingUser.role != "admin")
            send401(res, {
              status: false,
              message: "Error",
              data: [{ msg: "Only admin allowed" }],
            });
          else {
            const {
              password: existingPassword,
              _id: existingUserId,
              email: existingUserMail,
              name: existingUserName,
            } = existingUser;
            const tokenData = {
              _id: existingUserId,
              name: existingUserName,
              email: existingUserMail,
            };

            if (!(await bcrypt.compare(password, existingPassword)))
              send401(res, {
                status: false,
                message: "Error",
                data: [{ msg: USER_INVD_PWD_ERR }],
              });
            else {
              user = await updateUser(
                { _id: existingUserId },
                {
                  loginToken: generateToken(tokenData),
                  loginTime: moment().utc().toDate(),
                }
              );
              user.password = undefined;
              send200(res, {
                status: true,
                message: LOGIN_SUCCESS,
                data: user,
              });
            }
          }
        }
      }
    },
  ],
  deleteBook = [
    jwtAuthGuard,
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, {
          status: false,
          message: VLD_ERR,
          data: errors,
        });
      else {
        const {
          body: { bookId },
        } = req;

        deleteBookById(bookId);

        send200(res, {
          status: true,
          message: DELETE_SUCCESS_BOOK,
          data: null,
        });
      }
    },
  ],
  updateBookDetails = [
    jwtAuthGuard,
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, {
          status: false,
          message: VLD_ERR,
          data: errors,
        });
      else {
        const {
          body: { bookId, name, author, description, price, categories },
        } = req;
        await updateBook(
          { _id: bookId },
          {
            name: name,
            author: author,
            description: description,
            price: Number(price),
            categories: categories,
          }
        );
        send200(res, {
          status: true,
          message: `Book details updated`,
          data: null,
        });
      }
    },
  ],
  allUsersOrders = [
    jwtAuthGuard,
    async (req, res) => {
      let {
          query: { page = 1, limit = 1000 },
          user,
        } = req,
        // offset = page && limit ? Math.abs(page - 1) * limit : 0,
        offset = 0,
        sortObj = {
          createdAt: -1,
        },
        filterObj = {};
      let allOrders = await retrieveAllOrders(
        filterObj,
        sortObj,
        limit,
        offset
      );
      let orderData = [];
      for await (const obj of allOrders.docs) {
        let itemsArray = [];
        const userD = await retrieveUser({ _id: obj.order_user });
        for await (const element of obj.order_item) {
          const item = await retrieveBookById(element);
          itemsArray.push(item);
        }
        let order = { order_user: userD, items: itemsArray, total: obj.total };
        orderData.push(order);
      }
      let allData = {
        orders: orderData,
      };
      send200(res, { status: true, message: "All orders", data: allData });
    },
  ],
  userDomain = {
    authByEmail,
    addBooks,
    updateBookDetails,
    deleteBook,
    allUsersOrders,
    createAdmin,
  };

export default userDomain;
