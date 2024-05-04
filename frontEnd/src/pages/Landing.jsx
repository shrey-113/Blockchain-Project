import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router";
function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#02040F]">
      <Outlet />

      <Footer />
    </div>
  );
}

export default LandingPage;
