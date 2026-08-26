import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[80vh] items-end overflow-hidden sm:min-h-[88vh]"
    >
      <Image
        src="/images/stadium.jpeg"
        alt="Grada del estadio en un día de partido"
        fill
        priority
        fetchPriority="high"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgb(0 0 0 / 0.2) 0%, rgb(0 0 0 / 0.55) 55%, rgb(0 0 0 / 0.92) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-6 pb-16 sm:pb-20">
        <span className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
          Cultural y Deportiva Leonesa
        </span>

        <h1 className="font-display max-w-2xl text-4xl leading-[1.05] font-bold tracking-tight text-white uppercase sm:text-6xl">
          LA CULTURAL NOS UNE. LA GRADA NOS REPRESENTA.
        </h1>

        <p className="max-w-xl text-base text-white/80 sm:text-lg">
          Una temporada más, la afición ultra de la Cultural y Deportiva
          Leonesa estará donde siempre: en casa y allá donde nos lleve el
          escudo.
        </p>

        <LinkButton href="#planes" variant="ghost-white" className="mt-2">
          Hazte socio ✓
        </LinkButton>
      </div>
    </section>
  );
}
