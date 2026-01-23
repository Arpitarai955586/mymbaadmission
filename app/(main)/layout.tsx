import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
