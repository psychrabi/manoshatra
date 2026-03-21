import { Suspense } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";

const FrontendLayout = () => (
  <div className="min-h-screen bg-brand-beige flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
);

export default FrontendLayout;