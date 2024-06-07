import { Router } from "express";
import userDomain from "../controller/user.controller.js";
import APPSQUADZ from "../helpers/message.helper.js";
import commonBookDomain from "../controller/commonBooks.controller.js";
const userRouter = Router(),
  {
    register,
    authByEmail,
    profile,
    placeOrder,
    allOrders
  } = userDomain,
  {    retrieveAllBook,
    retrieveOneBook}=commonBookDomain,
  {
    ROUTES: {
      USER_ENDPOINTS: {
        REGISTER,
        AUTH_EMAIL,
        PROFILE,
        BOOK_DETAILS,
        ALL_BOOKS,
        MY_ORDER,
        PLACE_ORDER
      },
    },
  } = APPSQUADZ;

userRouter.post(REGISTER, register);
userRouter.post(AUTH_EMAIL, authByEmail);
userRouter.get(PROFILE, profile);
userRouter.get(BOOK_DETAILS,retrieveOneBook)
userRouter.get(ALL_BOOKS,retrieveAllBook)
userRouter.post(PLACE_ORDER,placeOrder)
userRouter.get(MY_ORDER,allOrders)
export default userRouter;
