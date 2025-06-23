import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import MainContent from "./MainContent/MainContent";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function PublicLayoutPages() {
  return (
    <div>
      <MainContent>
        <Navbar />
        <Outlet />
        <Footer />
      </MainContent>
      <ThemeToggle />
    </div>
  );
}
