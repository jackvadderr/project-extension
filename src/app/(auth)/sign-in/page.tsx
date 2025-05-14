import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md">
        <div className="text-center p-6 border-b border-gray-200">
          <div
            className="mx-auto mb-4 w-20 h-20 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/favicon.ico')" }}
          ></div>
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
        </div>
        <div className="p-6 space-y-5">
          <form
            className="space-y-4"
            action={async (formData) => {
              "use server";
              await executeAction({
                actionFn: async () => {
                  await signIn("credentials", formData);
                },
              });
            }}
          >
            <Input
              name="email"
              placeholder="Email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-md p-3"
            />
            <Input
              name="password"
              placeholder="Senha"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-md p-3"
            />
            <Button className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium" type="submit">
              Entrar
            </Button>
          </form>
          <div className="text-center">
            <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">
              Nao tem acesso?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;