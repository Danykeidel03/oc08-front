import Link from "next/link";
import { backendUrl } from "@/lib/backend";
import { UploadSliderImageForm } from "./UploadSliderImageForm";
import { SliderImageList } from "./SliderImageList";

export const metadata = {
  title: "Panel — slider",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getSliderImages() {
  const res = await fetch(backendUrl("/api/slider-images"), { cache: "no-store" });

  if (!res.ok) {
    throw new Error("No se pudo cargar el slider");
  }

  return res.json();
}

export default async function PanelSliderPage() {
  const images = await getSliderImages();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-10">
      <Link href="/panel" className="text-sm text-[color:var(--color-muted)] underline">
        ← Panel
      </Link>

      <h1 className="text-2xl font-bold text-white">Slider</h1>

      <UploadSliderImageForm />
      <SliderImageList images={images} />
    </main>
  );
}
