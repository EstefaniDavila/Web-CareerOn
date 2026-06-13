import OffersLeftMenu from "../../components/OffersLeftMenu";
import OffersRightPanel from "../../components/OffersRightPanel";

const mockOffers = [
  { id: 1, title: 'Desarrollador Frontend React', location: 'Arequipa, PE', type: 'Tiempo completo', publishedAt: 'Hace 2 días', status: 'active', applicants: 12 },
  { id: 2, title: 'Diseñador UX/UI Senior', location: 'Remoto', type: 'Medio tiempo', publishedAt: 'Hace 5 días', status: 'active', applicants: 8 },
  { id: 3, title: 'Analista de Datos Jr.', location: 'Lima, PE', type: 'Tiempo completo', publishedAt: 'Hace 10 días', status: 'paused', applicants: 3 },
  { id: 4, title: 'Backend Engineer Node.js', location: 'Remoto', type: 'Tiempo completo', publishedAt: 'Hace 3 días', status: 'closed', applicants: 21 },
];

export default function Offers() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-6 w-full items-start justify-center">
        <OffersLeftMenu />
        <OffersRightPanel offers={mockOffers} />
      </div>
    </div>
  );
}