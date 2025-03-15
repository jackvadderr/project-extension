// /src/app/home/page.tsx
import { auth } from "@/lib/auth";
import Layout from "./layout";

const Page = async () => {

  return (
      <div className="bg-gray-100 rounded-lg p-4 text-center w-full">
        <p className="text-gray-600">Bem vindo! Aqui vai ficar as fotos dos bagulhos la.</p>
      </div>
  );
};

export default Page;