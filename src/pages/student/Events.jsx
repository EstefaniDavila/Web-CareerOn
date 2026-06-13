import React from 'react';
import LeftSidebar from '../../components/LeftSidebar';
import { FiCalendar, FiClock, FiVideo } from 'react-icons/fi';

export default function Events() {
  const events = [
    { id: 1, title: 'Feria Laboral UTP 2026', date: '15 de Julio', time: '09:00 AM', mode: 'Presencial - Campus Central' },
    { id: 2, title: 'Webinar: Cómo destacar en entrevistas Tech', date: '20 de Julio', time: '18:00 PM', mode: 'Virtual via Zoom' },
  ];

  return (
    <div className="flex gap-6 w-full items-start">
      <div className="hidden lg:block shrink-0 self-start sticky top-[88px]">
        <LeftSidebar />
      </div>
      
      <div className="flex-1 w-full min-w-0 pb-12 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FiCalendar className="text-[var(--color-brand-primary)]" /> Eventos UTP
          </h2>
          <p className="text-gray-500 text-sm">No te pierdas las charlas y ferias exclusivas para la comunidad UTP.</p>
        </div>

        <div className="grid gap-4">
          {events.map(ev => (
            <div key={ev.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-xl mb-3">{ev.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 mb-4">
                <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-100"><FiCalendar /> {ev.date}</span>
                <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-100"><FiClock /> {ev.time}</span>
                <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-100"><FiVideo /> {ev.mode}</span>
              </div>
              <button className="px-5 py-2 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Agendar Recordatorio
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
