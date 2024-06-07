import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Components/ui/Layout";
import LandingPage from "./Components/ui/LandingPage";
import Login from "./Components/ui/Login";
import Signup from "./Components/ui/Signup";
import AdminLayout from "./Components/ui/AdminLayout";
import UserDashboard from "./Components/User/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddBook from "./Components/Admin/AddBook";
import BookDetails from "./Components/Admin/BookDetails";
import EditBookDetails from "./Components/Admin/EditBookDetails";
import UserLayout from "./Components/ui/UserLayout";
import UserBookDetails from "./Components/User/UserBookDetails";
import AdminLogin from "./Components/ui/AdminLogin";
import Checkout from "./Components/User/Checkout";
import { CartProvider } from "./Context/CartContext";

export default function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin_login" element={<AdminLogin />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/add_book" element={<AddBook />} />
              <Route path="/admin/book_details" element={<BookDetails />} />
              <Route
                path="/admin/edit_book_details"
                element={<EditBookDetails />}
              />
            </Route>
            <Route element={<UserLayout />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/book_details" element={<UserBookDetails />} />
              <Route path="/user/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          margin: "8px",
          zIndex: "99",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            // color: "var(--color-grey-700)",
            zIndex: "10000",
          },
        }}
      />
    </>
  );
}
