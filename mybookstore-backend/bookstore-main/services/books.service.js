
import bookStoreModel from "../models/bookStore.model.js";
import commonHelper from "../helpers/db.common.helper.js";

const {
  createOne,
  updateOne,
  retrieveManyWithPagination,
  retrieveById,
  deleteOne
} = commonHelper;

const createBook = async (data) => {
  return await createOne(bookStoreModel, { ...data });
},
retrieveBookById = async (bookId) => {
  return await retrieveById(bookStoreModel,{_id: bookId});
},
deleteBookById = async (bookId) => {
  return await deleteOne(bookStoreModel, { _id: bookId });
},
updateBook = async (filter, data) => {
  return await updateOne(bookStoreModel, { ...filter }, { ...data });
},
retrieveAllBooks = async (filter, sort, limit, offset, select) => {
  return await retrieveManyWithPagination(
    bookStoreModel,
    { ...filter },
    { ...sort },
    limit,
    offset,
    select
  );
},
  bookService = {
    createBook,
    retrieveAllBooks,
    retrieveBookById,
    deleteBookById,
    updateBook
  };

export default bookService;
