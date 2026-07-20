import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const Home = lazy(() => import("./pages/Home"));
const FrontendLayout = lazy(() => import("./components/FrontendLayout"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Research = lazy(() => import("./pages/Research"));
const Services = lazy(() => import("./pages/Services"));
const Team = lazy(() => import("./pages/Team"));

const AdminAppointments = lazy(() => import("./pages/admin/Appointments"));
const AdminBlog = lazy(() => import("./pages/admin/Blog"));
const AdminResearch = lazy(() => import("./pages/admin/Research"));
const AdminMessages = lazy(() => import("./pages/admin/Messages"));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Frontend routes with Navbar and Footer */}
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <FrontendLayout />
              </Suspense>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/research" element={<Research />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin routes with AdminLayout */}
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route
              path="/admin"
              element={<Navigate to="/admin/appointments" replace />}
            />
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/research" element={<AdminResearch />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
