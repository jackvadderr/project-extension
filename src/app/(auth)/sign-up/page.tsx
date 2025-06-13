import { auth } from "@/lib/auth";
import { signUp } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import ToastListener from "@/components/ui/ToastListener";

const SignUpPage = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#e5e9f2_100%)] flex items-center justify-center px-4">
      <ToastListener />
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col items-center text-center px-6 pt-8 pb-4 border-b border-gray-200">
          <div className="mb-3">
            <img
              src="/R.A.png"
              alt="Logo R.A. Eventos"
              className="h-24 w-24 object-contain rounded-full shadow-lg border-2 border-white"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Cadastro</h1>
          <p className="text-sm text-gray-500 mt-1">Crie sua conta para começar</p>
        </div>
        <div className="p-6 space-y-5">
          <form
            className="space-y-4"
            action={async (formData) => {
              "use server";
              const res = await signUp(formData);
              if (res.success) {
                redirect("/sign-in?success=1");
              } else {
                const message = encodeURIComponent(res.error || "Erro ao cadastrar.");
                redirect(`/sign-up?error=${message}`);
              }
            }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Digite seu nome"
                required
                autoComplete="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 mt-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition-all"
            >
              ✅ Cadastrar
            </button>
          </form>

          <div className="text-center">
            <span className="text-sm text-gray-600">Já registrado? </span>
            <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
