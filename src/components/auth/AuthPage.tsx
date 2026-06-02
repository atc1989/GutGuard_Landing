import AuthForm from "@/components/auth/AuthForm";
import Navbar from "@/components/landing/Navbar";

interface AuthPageProps {
  initialError?: string;
  initialRecovery?: boolean;
  mode: "login" | "signup";
}

export default function AuthPage({ initialError, initialRecovery, mode }: AuthPageProps) {
  const title = initialRecovery ? "Reset password" : mode === "signup" ? "Sign up" : "Login";

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-72px)] bg-white px-6 pb-20 pt-24 sm:px-10 lg:pt-48">
        <section className="mx-auto w-full max-w-[1290px]">
          <h1 className="mb-8 pb-2 text-[2.85rem] font-normal tracking-[-0.07em] text-black">{title}</h1>
          <AuthForm initialError={initialError} initialRecovery={initialRecovery} mode={mode} />
        </section>
      </main>
    </>
  );
}
