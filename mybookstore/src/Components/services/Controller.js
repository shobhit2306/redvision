import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_API_BASE_URL;

export const AuthDataObject = {
  UserLogin: async (data, callback) => {
    axios({
      method: "POST",
      url: `${BASE_URL}user/phone/auth`,
      data: data,
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },
  AdminLogin: async (data, callback) => {
    axios({
      method: "POST",
      url: `${BASE_URL}admin/email/auth`,
      data: data,
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },
  Signup: async (data, callback) => {
    axios({
      method: "POST",
      url: `${BASE_URL}user/signup`,
      data: data,
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },
};

export const AdminDataObject = {
  AddBook: async ({ token, body }, callback) => {
    axios({
      method: "POST",
      url: `${BASE_URL}admin/book/add`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },
  BooksList: async ({ token, searchedValue, category }, callback) => {
    axios({
      method: "GET",
      url: `${BASE_URL}admin/book/all?limit=5&page=1&search=${
        searchedValue ?? "all"
      }&categories=${category ?? ""}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },

  UpdateBook: async ({ token, body }, callback) => {
    axios({
      method: "POST",
      url: `${BASE_URL}admin/book/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },

  Deleteook: async ({ token, bookId }, callback) => {
    axios({
      method: "DELETE",
      url: `${BASE_URL}admin/book/remove`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { bookId },
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },
};

export const UserDataObject = {
  BooksList: async ({ token, searchedValue, category }, callback) => {
    axios({
      method: "GET",
      url: `${BASE_URL}user/book/all?limit=5&page=1&search=${
        searchedValue ?? "all"
      }&categories=${category ?? ""}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },

  Checkout: async ({ token, body }, callback) => {
    axios({
      method: "POST",
      url: `${BASE_URL}user/order/place`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    })
      .then((response) => {
        return callback(response);
      })
      .catch((err) => {
        return callback(err.response);
      });
  },
};
