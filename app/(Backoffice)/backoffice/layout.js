import BackOfficeHeader from "./_components/Header/Header";
import Sidebar from "./_components/Sidebar/Sidebar";
import { AuthProvider } from "../../context/AuthContext";
import "./backoffice.css";

export default function BackOfficeLayout({ children }) {
  return (
    <AuthProvider>
      <div className="back-office-layout">
        <BackOfficeHeader />
        <div className="backoffice-content">
          <Sidebar />
          <main className="backoffice-main">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
