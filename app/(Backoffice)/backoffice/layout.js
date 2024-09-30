import BackOfficeHeader from "./_components/Header/Header";
import Sidebar from "./_components/Sidebar/Sidebar";
import "./backoffice.css";

export default function BackOfficeLayout({ children }) {
  const userName = "Paulo";
  return (
    <div className="back-office-layout">
      <BackOfficeHeader userName={userName} />
      <div className="backoffice-content">
        <Sidebar />
        <main className="backoffice-main">{children}</main>
      </div>
    </div>
  );
}