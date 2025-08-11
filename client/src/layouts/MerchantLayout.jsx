import MerchantNavBar from "../components/navbars/MerchantNavBar";

export default function MerchantLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MerchantNavBar />
      <main className="flex-grow p-4 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
