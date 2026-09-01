import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Panel — acceso",
  robots: { index: false, follow: false },
};

export default function PanelLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--color-bg)] px-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-2xl font-bold text-white">Panel Orgullo Cazurro</h1>
        <LoginForm />
      </div>
    </main>
  );
}
