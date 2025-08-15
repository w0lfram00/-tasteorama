import { useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { useAppDispatch } from "./hooks/reduxForTypeScript";
import { refreshUser } from "./redux/auth/operations";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <SharedLayout />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
