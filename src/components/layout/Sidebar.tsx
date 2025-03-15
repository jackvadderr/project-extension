import Link from "next/link";
import { Home, Calendar, Bell, DollarSign, Settings } from "lucide-react";
import { APP_NAME } from "@/constants/constants";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen shadow-md flex flex-col p-5">
      <h2 className="text-xl font-bold mb-6">{APP_NAME}</h2>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <Home size={20} /> Dashboard
        </Link>
        <Link href="/dashboard/financer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <DollarSign size={20} /> Financeiro
        </Link>
        <Link href="/dashboard/events" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <Calendar size={20} /> Eventos
        </Link>
        {/* <Link href="/dashboard/reminders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <Bell size={20} /> Lembretes
        </Link> */}
      </nav>

      <div className="mt-auto">
        <Link href="/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <Settings size={20} /> Configurações
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
