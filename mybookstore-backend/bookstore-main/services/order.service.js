import orderModel from "../models/order.model.js";
import commonHelper from "../helpers/db.common.helper.js";

const {
  createOne,
  updateOne,
  retrieveOne,
  retrieveManyWithPagination,
  retrieveById,
  deleteOne,
} = commonHelper;

const createOrder = async (data) => {
    return await createOne(orderModel, { ...data });
  },
  retrieveOrderById = async (orderId) => {
    return await retrieveById(orderModel, { _id: orderId });
  },
  retrieveOrderByUser = async (userId) => {
    return await retrieveOne(orderModel, { order_user: userId });
  },
  deleteOrderById = async (orderId) => {
    return await deleteOne(orderModel, { _id: orderId });
  },
  updateOrder = async (filter, data) => {
    return await updateOne(orderModel, { ...filter }, { ...data });
  },
  retrieveAllOrders = async (filter, sort, limit, offset, select) => {
    return await retrieveManyWithPagination(
      orderModel,
      { ...filter },
      { ...sort },
      limit,
      offset,
      select
    );
  },
  orderService = {
    createOrder,
    retrieveAllOrders,
    retrieveOrderById,
    deleteOrderById,
    updateOrder,
    retrieveOrderByUser,
  };

export default orderService;
