import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import "./styles/HomePage.css";
import "./styles/Basic.css";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
import ListyourSpace from "./components/ListyourSpace";
import ParkingOwnerDashboard from "./parkingOwner/pages/ParkingOwnerDashboard";
import ReservationRequest from "./parkingOwner/components/ReservationRequest";
import ManageSpace from "./parkingOwner/components/ManageSpace";
import CreateRequest from "./parkingOwner/components/CreateRequest";
import CreateSpace from "./parkingOwner/components/CreateSpace";
import AccountInformation from "./components/AccountInformation";
import ReservationHistory from "./components/ReservationHistory";
import Earning from "./parkingOwner/components/Earning";
import MessagesContainer from "./components/MessagesContainer";
import Dashboard from "./parkingOwner/components/Dashboard";
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Signup";
import ForgetPass from "./pages/ForgetPass";
import ResetPass from "./pages/ResetPass";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UpdateSpace from "./parkingOwner/components/UpdateSpace";
import ViewSpace from "./parkingOwner/components/ViewSpace";
import ViewRequest from "./parkingOwner/components/ViewRequest";
import { ParkingOwnerProvider } from "./context/ReservationContext";
import { MainAppProvider } from "./context/MainAppContext";
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgetpassword" element={<ForgetPass />} />
      <Route path="/resetpassword/:token" element={<ResetPass />} />
    
      <Route
        path="/searchResult/:searchInput/:arrivalDate/:arrivalTime/:leaveDate/:leaveTime/:totalHours"
        element={
          <MainAppProvider>
            <MainApp />
          </MainAppProvider>
        }
      />
      <Route path="/aboutus" element={<AboutUs />} />

      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Login />}
      >
        <Route index element={<AccountInformation />} />
        <Route path="booking" element={<ReservationHistory />} />
        <Route path="listyourspace" element={<ListyourSpace />} />
        <Route path="message" element={
        <ParkingOwnerProvider>
        <MessagesContainer />
        </ParkingOwnerProvider>
        }/>
      </Route>

      <Route path="/reservation/:spaceId" element={<Reservation />} />
      <Route path="/listyourspace" element={<ListyourSpace />} />

      {/* Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <ParkingOwnerProvider>
              <ParkingOwnerDashboard />
            </ParkingOwnerProvider>
          ) : (
            <Login />
          )
        }
      >
        <Route index element={<Dashboard />} />
        {/* Default Dashboard Container */}
        <Route path="reservation-request" element={<ReservationRequest />} />
        <Route
          path="reservation-request/view-request/:reservationId"
          element={<ViewRequest />}
        />
        <Route
          path="reservation-request/create-request"
          element={<CreateRequest />}
        />
        <Route path="earning" element={<Earning />} />
        <Route path="manage-space" element={<ManageSpace />} />
        <Route path="manage-space/create-space" element={<CreateSpace />} />
        <Route path="edit-space/:spaceId" element={<UpdateSpace />} />
        <Route
          path="manage-space/view-space/:spaceId"
          element={<ViewSpace />}
        />
      </Route>
    </Routes>
  );
};
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
