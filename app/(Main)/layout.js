import "../globals.css";
import Header from "../_components/Header/Header";
import Footer from "../_components/Footer/Footer";
import { AuthProvider } from "../context/AuthContext";

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <div className="layout">
        <Header />
        <main> {children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
