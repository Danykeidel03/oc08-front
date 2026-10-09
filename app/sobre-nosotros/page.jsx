import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_URL } from "@/lib/site";

const title = "Sobre nosotros — Orgullo Cazurro";
const description =
  "Orgullo Cazurro nació en 2008 para defender el escudo de la Cultural y Deportiva Leonesa. Conoce quiénes somos, cómo trabajamos y qué defendemos desde el Fondo Sur.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/sobre-nosotros",
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/sobre-nosotros`,
    siteName: "Orgullo Cazurro",
    images: [
      {
        url: "/images/stadium.jpeg",
        width: 2048,
        height: 1152,
        alt: "Grada del estadio en un día de partido",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/stadium.jpeg"],
  },
};

const PARAGRAPHS = [
  "Orgullo Cazurro nació en 2008 para defender el escudo de la Cultural y Deportiva Leonesa y llevar el nombre de León allá donde jugase nuestro equipo. Desde entonces hemos construido nuestra historia en la grada, en la carretera y en las horas de trabajo que hay detrás de cada partido. Nos une el culturalismo, el orgullo por nuestra tierra y una manera de vivir el fútbol que exige estar, participar y dejarse la voz.",
  "La Cultural forma parte de nuestras vidas. Hemos celebrado sus alegrías y sufrido sus golpes, vivido ascensos y vuelto a levantarnos después de los descensos. En cada una de esas etapas hemos encontrado motivos para seguir. Nuestro compromiso con este escudo permanece cuando cambia la categoría, cuando se alejan los objetivos y cuando toca regresar a casa con una derrota. Es precisamente entonces cuando más sentido tiene estar a su lado.",
  "Nuestro lugar está en el Fondo Sur del Reino de León. Allí convertimos ese compromiso en canciones, banderas, bombos y tifos; en el esfuerzo de quienes empujan al equipo desde el primer minuto y buscan contagiar al resto del estadio. Queremos una Cultural que se entregue y una grada dispuesta a acompañarla con la misma intensidad. Cada partido es una oportunidad de demostrarlo.",
  "Pero el grupo empieza a trabajar mucho antes de que ruede el balón. Hay que organizar los desplazamientos, preparar el material, extender las telas, pintar, cargar y recoger. Detrás de lo que se ve durante unos minutos hay tiempo y esfuerzo de compañeros que aportan lo que pueden para sacar adelante algo de todos. Ese trabajo compartido nos ha permitido crecer y es la base sobre la que queremos seguir haciéndolo.",
  "También nos hemos hecho grupo en los viajes. En los madrugones, las horas de autobús, las previas lejos de casa y los regresos de madrugada. Acompañar a la Cultural nos ha llevado a compartir mucho más que partidos: amistades, recuerdos y una responsabilidad común por el nombre que llevamos en nuestra pancarta. Allí donde estamos, llevamos con nosotros a nuestro equipo y a nuestra ciudad.",
  "León está presente en nuestra forma de entender Orgullo Cazurro. En el nombre, en nuestros símbolos y en el orgullo con el que hablamos de nuestra tierra. Su historia y sus tradiciones tienen un lugar en la grada, como lo tuvo el homenaje a Urraca I. Queremos que las nuevas generaciones conozcan ese legado y encuentren en el culturalismo otra manera de sentirse parte de él.",
  "Nuestra grada tiene, además, cosas que decir. Las pancartas mensaje son una forma de expresar lo que nos preocupa, recordar lo que merece atención y aprovechar la fuerza del grupo para hacer llegar una reivindicación. El fútbol reúne a muchas personas y creemos que esa capacidad de convocatoria también sirve para mostrar apoyo y solidaridad.",
  "Así lo hemos expresado con nuestros mensajes sobre Ceuta, manteniendo presente una reivindicación que hemos llevado también fuera de León. Lo hemos hecho con las pancartas sobre la DANA y con la recogida de ayuda para las personas afectadas. Y lo hemos hecho al dar visibilidad a la salud mental, llevando a la grada una realidad que merece ser escuchada. Son causas distintas que han encontrado espacio en nuestra pancarta y en nuestra voz.",
  "Ese compromiso tiene sentido cuando lo llevamos también al trato entre compañeros: escuchar, acompañar y prestar atención a quien tenemos al lado. Compartir grada implica compartir alegrías, pero también saber estar cuando alguien atraviesa un mal momento. La pertenencia se construye con esos gestos, igual que con las horas de trabajo y los kilómetros recorridos juntos.",
  "Queremos seguir creciendo con gente dispuesta a implicarse. A cantar, viajar, preparar una previa, ayudar con un tifo o aportar una idea. Cada persona que participa hace posible el siguiente paso y ayuda a mantener vivo lo que otros comenzaron en 2008.",
  "Somos Orgullo Cazurro. Seguiremos al lado de la Cultural, representando a León y construyendo nuestra historia juntos.",
];

export default function SobreNosotrosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[45vh] items-end overflow-hidden">
          <Image
            src="/images/stadium.webp"
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
                "linear-gradient(to bottom, rgb(0 0 0 / 0.3) 0%, rgb(0 0 0 / 0.6) 55%, rgb(0 0 0 / 0.95) 100%)",
            }}
          />
          <div className="relative mx-auto w-full max-w-3xl px-6 pb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Desde 2008
            </span>
            <h1 className="font-display mt-3 text-4xl leading-[1.05] font-bold tracking-tight text-white uppercase sm:text-6xl">
              Quiénes somos
            </h1>
          </div>
        </section>

        <article className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 text-base leading-relaxed text-white/85 sm:text-lg">
          {PARAGRAPHS.map((text) => (
            <p key={text.slice(0, 40)}>{text}</p>
          ))}

          <p className="font-display mt-8 border-t border-[var(--color-border)] pt-8 text-xl font-bold tracking-tight text-white uppercase sm:text-2xl">
            La Cultural nos une. La grada nos representa.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
