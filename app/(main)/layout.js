import Header from "../_components/header/Header";
import Footer from "../_components/Footer/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
