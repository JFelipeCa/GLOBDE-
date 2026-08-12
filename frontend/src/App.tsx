import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/ui/Navbar';
import { AuthModal } from './components/ui/AuthModal';
import { TicketModal } from './components/ui/TicketModal';
import { BookingWizard } from './components/ui/BookingWizard';
import { Toasts, QuizModal, EsperaModal, Footer } from './components/ui/Extras';
import { Hero, Beneficios, Servicios, Barberos, Catalogo, Fidelizacion, Resenas } from './components/sections/Landing';
import { PanelCliente } from './components/paneles/PanelCliente';
import { PanelBarbero } from './components/paneles/PanelBarbero';
import { PanelAdmin } from './components/paneles/PanelAdmin';

const Contenido: React.FC = () => {
  const { vista } = useApp();

  return (
    <>
      {vista === 'inicio' && (
        <>
          <Hero />
          <Servicios />
          <Beneficios />
          <Barberos />
          <Catalogo />
          <Resenas />
        </>
      )}

      {vista === 'catalogo' && (
        <>
          <Catalogo />
          <Servicios />
          <Barberos />
        </>
      )}

      {vista === 'fidelizacion' && (
        <>
          <Fidelizacion />
          <Resenas />
        </>
      )}

      {vista === 'panel-cliente' && <PanelCliente />}
      {vista === 'panel-barbero' && <PanelBarbero />}
      {vista === 'panel-admin' && <PanelAdmin />}
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col bg-[#FDFBF7]">
        <Navbar />
        <main className="flex-1">
          <Contenido />
        </main>
        <Footer />

        {/* Capas superpuestas */}
        <AuthModal />
        <BookingWizard />
        <TicketModal />
        <QuizModal />
        <EsperaModal />
        <Toasts />
      </div>
    </AppProvider>
  );
}
