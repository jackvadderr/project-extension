import { auth } from "@/lib/auth";
import { signUp } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#e5e9f2_100%)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col items-center text-center px-6 pt-8 pb-4 border-b border-gray-200">
          <div className="mb-3">
            <img
              src="/R.A.png"
              alt="Logo R.A. Eventos"
              className="h-24 w-24 object-contain rounded-full shadow-lg border-2 border-white"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Criar Conta</h1>
          <p className="text-sm text-gray-500 mt-1">Registre-se para começar a usar o sistema</p>
        </div>

        <div className="px-6 py-6 space-y-6">
          <form
            className="space-y-4"
            action={async (formData) => {
              "use server";
              const res = await signUp(formData);
              if (res.success) redirect("/sign-in");
            }}
          >
            <Input
              name="email"
              placeholder="Email"
              type="email"
              required
              autoComplete="email"
              className="shadow-sm focus:shadow-md"
            />
            <Input
              name="password"
              placeholder="Senha"
              type="password"
              required
              autoComplete="new-password"
              className="shadow-sm focus:shadow-md"
            />
            <Button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold transition-all shadow-md"
            >
              Cadastrar
            </Button>
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
