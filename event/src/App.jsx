import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import About from "./routes/about/about";
import Contact from "./routes/contact/contact";
import Home1 from "./routes/home/home1";
import RegistrationPage from "./routes/registration/registration";
import Sponsors from "./routes/sponsors/sponsors";
import AdminPage from './components/admin/adminpage';
import AdminLogin from './components/signup/signup';
import Run_for_equality from './routes/run-for-equality/run_for_equality';
import Loader from './components/loader/loader'
import NotFound from './components/notfound/notfound';
import ImageView from "./components/admin/ImageView"; 
import { IoCloudOffline } from "react-icons/io5"; 

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname === '/admin-login';
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineMessage, setOfflineMessage] = useState({
    status: "Connection Lost",
    message: "It looks like you're not connected to the internet. Please check your connection and try again.",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
    };

    const handleOnline = () => {
      setIsOnline(true);
    };

    if (!navigator.onLine) {
      handleOffline();
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const handleRetry = () => {
    setIsOnline(false);
    setTimeout(() => {
      setIsOnline(navigator.onLine);
    }, 5000);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {loading && <Loader />}
        {!isOnline && !loading && (
          <div className="container">
            <IoCloudOffline style={{ fontSize: "10vh" }} />
            <h1 className="status">{offlineMessage.status}</h1>
            <p className="message">{offlineMessage.message}</p>
            <button className="retry-button" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        )}
        {isOnline && !loading && (
          <Layout>
            <Routes>
              <Route path="registration" element={<RegistrationPage />} />
              <Route path="" element={<Home1 />} />
              <Route path="/home" element={<Home1 />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path='about' element={<About />} />
              <Route path='sponsors-benefits' element={<Sponsors />} />
              <Route path='contact' element={<Contact />} />
              <Route path='run-for-equality' element={<Run_for_equality />} />
              <Route path="*" element={<NotFound />} /> {/* Handle 404 */}
              {/* <Route path="/:imageUrl" element={<ImageView />} /> */}


            </Routes>
          </Layout>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
