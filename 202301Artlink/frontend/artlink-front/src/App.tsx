import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Common
import Homepage from "./pages/Common/Home";
import Mypage from "./pages/Common/Mypage";
// Entrance
import Entrance from "./pages/Entrance/Entrance";
import Login from "./pages/Entrance/Login";
import Signup from "./pages/Entrance/Signup";
import LoginGallery from "./pages/Entrance/LoginGallery";
import LoginAdmin from "./pages/Entrance/LoginAdmin";
import SignupGallery from "./pages/Entrance/SignupGallery";
import FindPassword from "./pages/Entrance/FindPassword";
// User
import ArtMemory from "./pages/User/ArtMemory";
import ArtMemoryDetail from "./pages/User/ArtMemoryDetail";
import ArtMemoryEdit from "./pages/User/ArtMemoryEdit";
import ThreeTest from "./pages/ThreeMain";
// Gallery
import ExhibitionBoard from "./pages/Gallery/ExhibitionBoard";
import WorksBoard from "./pages/Gallery/WorksBoard";
import WorksCreate from "./pages/Gallery/WorksCreate";
import WorksDetail from "./pages/Gallery/WorksDetail";
import IoTAdd from "./pages/Gallery/IotAdd";
import IoTBoard from "./pages/Gallery/IoTBoard";

// Manager
import UserBoard from "./pages/Manager/UserBoard";
import UserDetail from "./pages/Manager/UserDetail";
import GalleryBoard from "./pages/Manager/GalleryBoard";
import GalleryDetail from "./pages/Manager/GalleryDetail";
import GalleryCreate from "./pages/Manager/GalleryCreate";
// import GalleryCreate from "./pages/Manager/GalleryCreate";
// Kiosk
import Kiosk from "./pages/Kiosk/KioskHome";
import KioskDetail from "./pages/Kiosk/KioskDetail";
import KioskPrint from "./pages/Kiosk/KioskPrint";
import KioskExit from "./pages/Kiosk/KioskExit";
import ComponentTest from "./ComponentTest";
// Other
import Contact from "./pages/Other/Contact";
import AboutUs from "./pages/Other/AboutUs";
// Only Developer (*** Del After release ***)
import PageManager from "./pages/PageManager";
import NotFound from "./pages/Common/NotFound";
import ExhibitionCreate from "./pages/Gallery/ExhibitionCreate";
import ExhibitionUpdate from "./pages/Gallery/ExhibitionUpdate";
import Team from "./commponents/Contact/Team";
import Policy from "./pages/Other/Policy";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  sub: string;
  role: string;
  id: number;
  exp: number;
  username: string;
  accepted: boolean;
}

function App() {
  // 로그인 여부 판단
  const isLoggedIn = () => {
    const accessToken: string | null = localStorage.getItem("access_token");
    return !!accessToken; // access_token이 있으면 로그인 상태로 간주합니다.
    return true;
  };
  // 갤러리 확인
  const isLoggedInOrgin = () => {
    const accessToken: string | null = localStorage.getItem("access_token");
    let userRole: string | null;
    if (accessToken) {
      const decodedToken = jwt_decode<DecodedToken>(accessToken);
      userRole = decodedToken.role; // 디코딩된 토큰에서 'role' 값을 추출
      if (userRole === "ROLE_ADMIN") {
        return "admin";
      } else if (userRole === "ROLE_USER") {
        return "user";
      } else if (userRole === "ROLE_GALLERY") {
        return "gallery";
      }
    }
    return false;
  };
  // 갤러리 권한 확인
  const isAcceptedGallery = () => {
    const accessToken: string | null = localStorage.getItem("access_token");
    if (accessToken) {
      const decodedToken = jwt_decode<DecodedToken>(accessToken);
      console.log(decodedToken);
      const accepted = decodedToken.accepted;
      return accepted;
    }
    return false;
  };
  isAcceptedGallery;
  return (
    <div className="App">
      <Header />

      <Routes>
        {/* Common */}
        <Route
          path="/home"
          element={isLoggedIn() ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/mypage/user"
          element={
            isLoggedInOrgin() == "user" ? <Mypage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/mypage/gallery"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <Mypage />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />

        {/* Entrance Routes */}
        <Route path="/" element={<Entrance />} />
        <Route
          path="/login"
          element={!isLoggedIn() ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn() ? <Signup /> : <Navigate to="/home" />}
        />
        <Route
          path="/login-gallery"
          element={!isLoggedIn() ? <LoginGallery /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup-gallery"
          element={!isLoggedIn() ? <SignupGallery /> : <Navigate to="/home" />}
        />
        <Route
          path="/login-admin"
          element={!isLoggedIn() ? <LoginAdmin /> : <Navigate to="/home" />}
        />
        <Route
          path="/login/password"
          element={!isLoggedIn() ? <FindPassword /> : <Navigate to="/home" />}
        />
        <Route
          path="/login-gallery/password"
          element={!isLoggedIn() ? <FindPassword /> : <Navigate to="/home" />}
        />

        {/* User Routes */}
        <Route
          path="/art-memory"
          element={
            isLoggedInOrgin() == "user" ? (
              <ArtMemory />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/art-memory/:pk"
          element={
            isLoggedInOrgin() == "user" ? (
              <ArtMemoryDetail />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/art-memory/:pk/edit"
          element={
            isLoggedInOrgin() == "user" ? (
              <ArtMemoryEdit />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/art-memory/:pk/3d"
          element={
            isLoggedInOrgin() == "user" ? (
              <ThreeTest />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Gallery Routes */}
        <Route
          path="/exhibition-board"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <ExhibitionBoard />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />
        <Route
          path="/exhibition-board/create"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <ExhibitionCreate />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />
        <Route
          path="/exhibition-board/:pk"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <WorksBoard />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />
        <Route
          path="/exhibition-board/:pk/update"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <ExhibitionUpdate />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />
        <Route
          path="/exhibition-board/:pk/create"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <WorksCreate />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />
        <Route
          path="/exhibition-board/:pk/:pk"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <WorksDetail />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />
        <Route
          path="/gallery/add-iot"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <IoTAdd />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />
        <Route
          path="/gallery/iot-board"
          element={
            isLoggedInOrgin() == "gallery" ? (
              <IoTBoard />
            ) : (
              <Navigate to="/login-gallery" />
            )
          }
        />

        {/* Manager Routes */}
        <Route
          path="/user-board"
          element={
            isLoggedInOrgin() == "admin" ? (
              <UserBoard />
            ) : (
              <Navigate to="/login-admin" />
            )
          }
        />
        <Route
          path="/user-board/:pk"
          element={
            isLoggedInOrgin() == "admin" ? (
              <UserDetail />
            ) : (
              <Navigate to="/login-admin" />
            )
          }
        />
        <Route
          path="/gallery-board"
          element={
            isLoggedInOrgin() == "admin" ? (
              <GalleryBoard />
            ) : (
              <Navigate to="/login-admin" />
            )
          }
        />
        <Route
          path="/gallery-board/:pk"
          element={
            isLoggedInOrgin() == "admin" ? (
              <GalleryDetail />
            ) : (
              <Navigate to="/login-admin" />
            )
          }
        />
        <Route
          path="/gallery-board/create"
          element={
            isLoggedInOrgin() == "admin" ? (
              <GalleryCreate />
            ) : (
              <Navigate to="/login-admin" />
            )
          }
        />

        {/* Kiosk Routes */}
        <Route path="/kiosk/home" element={<Kiosk />} />
        <Route path="/kiosk/:pk" element={<KioskDetail />} />
        <Route path="/kiosk/print" element={<KioskPrint />} />
        <Route path="/kiosk/exit" element={<KioskExit />} />
        <Route path="/component-test" element={<ComponentTest />} />

        {/* Other Routes */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/team" element={<Team />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/policy" element={<Policy />} />

        {/* Only Developer */}
        <Route path="/3d" element={<ThreeTest />} />
        <Route path="/PM" element={<PageManager />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
