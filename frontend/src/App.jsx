import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home.jsx";
import DownloadPage from "./pages/DownloadPage.jsx";
import Contact from "./pages/Contact.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import QualityAndAssurance from "./pages/QualityAndAssurance.jsx";
import CertificatesAndApprovals from "./pages/CertificationsAndApprovals.jsx";
import WeightCalculator from "./pages/WeightCalculator.jsx";


// products
import StraightCopperTube from "./pages/products/StraightCopperTube.jsx";
import PancakeCoil from "./pages/products/PancakeCoil.jsx";
import CopperFittings from "./pages/products/CopperFittings.jsx";
import ProductMainPage from "./pages/products/ProductMainPage.jsx";

//industries
import HvacRefrigiration from "./pages/industries/HvacRefrigiration.jsx";
import MedicalGas from "./pages/industries/MedicalGas.jsx";
import HouseHoldAndFuelGas from "./pages/industries/HouseHoldAndFuelGas.jsx";
import PlumbingAndWaterSupply from "./pages/industries/PlumbingAndWaterSupply.jsx";
import IndustrialAndProcessApplications from "./pages/industries/IndustrialAndProcessApplications.jsx";

// industry
import IndustrymainPage from "./pages/IndustrymainPage.jsx";

// legal
import PrivacyPolicy from "./pages/legal/PrivacyPolicy.jsx";
import TermsOfService from "./pages/legal/TermsOfService.jsx";

import NotFound from "./pages/NotFound.jsx";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Blogs from "./pages/admin/Blogs.jsx";
import AdminContact from "./pages/admin/AdminContact.jsx";
import BlogPage from "./pages/BlogPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PageMeta from "./components/PageMeta.jsx";
import PressureCalculatorPage from "./pages/PressureCalculatorPage.jsx";
import CopperEstimator from "./pages/CopperEstimator.jsx";
import UnitConverterPage from "./pages/UnitConverterPage.jsx";
import ToolsPage from "./pages/ToolsPage.jsx";
// import HVACSolutions from "./components/HVACsolutions.jsx";

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      <ScrollToTop />
      <PageMeta />
      {/* Hide Navbar/Footer in Admin */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/downloads" element={<DownloadPage />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/blogs" element={<BlogPage />} />

        {/* Param is a slug; BlogDetail also resolves a raw id so links shared
            before slugs existed keep working. */}
        <Route path="/blog/:slug" element={<BlogDetail />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="/quality" element={<QualityAndAssurance />} />

        <Route path="/certifications" element={<CertificatesAndApprovals />} />

        <Route path="/weight-calculator" element={<WeightCalculator />} />
        
        <Route path="/pressure-calculator" element={<PressureCalculatorPage />} />

        <Route path="/project-estimator" element={<CopperEstimator />} />
        <Route path="/copper-estimator" element={<CopperEstimator />} />

        <Route path="/unit-converter" element={<UnitConverterPage />} />

        <Route path="/tools" element={<ToolsPage />} />

        <Route path="/products" element={<ProductMainPage />} />

        <Route path="/straight-copper-tubes" element={<StraightCopperTube />} />

        <Route path="/pancake-copper-coil" element={<PancakeCoil />} />

        <Route path="/copper-fittings" element={<CopperFittings />} />

        <Route path="/hvac-refrigeration" element={<HvacRefrigiration />} />

        <Route path="/medical-gas" element={<MedicalGas />} />

        <Route path="/household-fuel-gas" element={<HouseHoldAndFuelGas />} />

        <Route
          path="/plumbing-water-supply"
          element={<PlumbingAndWaterSupply />}
        />

        <Route
          path="/industrial-process-application"
          element={<IndustrialAndProcessApplications />}
        />
        <Route
          path="/industry"
          element={<IndustrymainPage />}
        />

        {/* Legal */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* Bare /admin. Without this it fell through to the catch-all, so the
            404 page rendered with the admin chrome rules applied (no navbar,
            no footer) — a soft 404 at 200 that looked broken rather than
            missing. It is also the URL a person guesses to reach the CMS. */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <ProtectedRoute>
              <AdminContact />
            </ProtectedRoute>
          }
        />

        {/* The route was previously misspelled "enguiries" — keep anyone's
            existing bookmark working instead of dropping them on a blank page. */}
        <Route
          path="/admin/enguiries"
          element={<Navigate to="/admin/enquiries" replace />}
        />

        {/* Catch-all. Must stay last — anything below it is unreachable. */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFloat />}
    </div>
  );
};

export default App;
