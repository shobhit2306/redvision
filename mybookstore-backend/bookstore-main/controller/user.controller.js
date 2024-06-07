import validator from "../configuration/validation.config.js";
import bcrypt from "bcrypt";
import helpers from "../helpers/index.helper.js";
import userService from "../services/user.service.js";
import bookService from "../services/books.service.js";
import orderService from "../services/order.service.js";
import responseHelper from "../helpers/response.helper.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import registerValidator from "../validators/register.validator.js";
import authByEmailValidator from "../validators/auth.email.validator.js";
import APPSQUADZ from "../helpers/message.helper.js";
import __dirname from "../configuration/dir.config.js";
import moment from "moment";

const {
    generateToken,
  } = helpers,
  { validationThrowsError } = validator,
  { send200, send403, send400, send401, send404 } = responseHelper,
  {
    createUser,
    retrieveUserByEmail,
    updateUser,
    retrieveUser,
  } = userService,
  {retrieveBookById}=bookService,
  {
    createOrder,
    retrieveAllOrders,
    retrieveOrderByUser,
    retrieveOrderById,
    deleteOrderById,
    updateOrder}=orderService,
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
    }
  } = APPSQUADZ

const register = [
    registerValidator.name,
    registerValidator.phoneNo,
    registerValidator.email,
    registerValidator.password,
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, { status: false, message: VLD_ERR, data: errors });
      else {
        const {
          body: {
            password,
            email,
          }
        } = req;
        let user = null;
        const existingUser = await retrieveUserByEmail(email);
            if (existingUser) {
              send403(res, {
                status: false,
                message: "Error",
                data: [{ msg: NUMBER_ALR_RGSTD }],
              });         
            }else { 
              const userObj = {
                ...req.body,
                password: await bcrypt.hash(password, await bcrypt.genSalt(10))
              };
              const created = await createUser(userObj);
              user = await updateUser(
                { _id: created._id },
                {
                  loginToken: generateToken(created),
                  loginTime: moment().utc().toDate(),
                }
              );
            }
 
              send200(res, {
                status: true,
                message: USER_REG_SUCCESS,
                data: user,
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
          body: { email, password }
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
          const {
            password: existingPassword,
            _id: existingUserId
          } = existingUser;

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
                      loginToken: generateToken(existingUser),
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
    },
  ],
  profile = [
    jwtAuthGuard,
    async (req, res) => {
      const {
          user: { _id },
        } = req,
        profile = await retrieveUser({ _id });
      profile.loginToken = profile.password = undefined;
      send200(res, { status: true, message: USER_PROFILE, data: profile });
    },
  ],
  placeOrder = [
    jwtAuthGuard,
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, { status: false, message: VLD_ERR, data: errors });
      else {
        const {
          body: {
            items,
            total,
          },
          user
        } = req;

              const orderObj = {
                order_user:user,
                order_item: items,
                total:total
              };
              const created = await createOrder(orderObj);
 
              send200(res, {
                status: true,
                message: "Order placed successfully",
                data: created,
              }); 
      }
    },
  ],
  allOrders=[
    jwtAuthGuard,
    async (req, res) => {
      let {
        query: {
          page=1,
          limit = 1000
        },
        user
      } = req,
      // offset = page && limit ? Math.abs(page - 1) * limit : 0,
      offset =0,
      sortObj = {
        createdAt: -1,
      },
      filterObj = {order_user:user._id};
      let allOrders = await retrieveAllOrders(
        filterObj,
        sortObj,
        limit,
        offset
      );
    let  orderData=[]
      for await (const obj of allOrders.docs) {
        let itemsArray=[]
        for await (const element of obj.order_item) {
          const item = await retrieveBookById(element);
          itemsArray.push(item);
      }
      let order = {items :itemsArray,total :obj.total}
        orderData.push(order);
    }
      let allData={
        userData:user,
        orders:orderData
      }
      send200(res, { status: true, message: "All orders", data: allData });
    },
  ],
  userDomain = {
    register,
    authByEmail,
    profile,
    placeOrder,
    allOrders
  };

export default userDomain;
