import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-brand-bg)]">
      {/* Navbar arriba a pantalla completa */}
      <Navbar />

      {/* Contenido principal centrado */}
      <main className="flex-1 flex justify-center p-6 w-full">
        <div className="w-full max-w-[1280px]">
          {children}
        </div>
      </main>
    </div>
  );
}
