import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";
import ToastListener from "@/components/ui/ToastListener";

const SignInPage = async () => {
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
          <h1 className="text-2xl font-bold text-gray-800">Bem-vindo de volta</h1>
          <p className="text-sm text-gray-500 mt-1">Acesse sua conta para continuar</p>
        </div>

        <div className="px-6 py-6 space-y-6">
          <form
            className="space-y-4"
            action={async (formData) => {
              "use server";
              try {
                await executeAction({
                  actionFn: async () => {
                    await signIn("credentials", formData);
                  },
                });
                redirect("/sign-in?success=" + encodeURIComponent("Login realizado com sucesso!"));
              } catch {
                redirect("/sign-in?error=" + encodeURIComponent("Erro ao fazer login. Verifique seus dados."));
              }
            }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 mt-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition-all"
            >
              🔐 Entrar
            </button>
          </form>

          <div className="text-center">
            <Link href="/sign-up" className="text-sm text-blue-600 hover:underline font-medium">
              Não tem acesso?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
