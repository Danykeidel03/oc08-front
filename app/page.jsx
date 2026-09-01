import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { MembershipPlans } from "@/components/sections/MembershipPlans";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MembershipPlans />
      </main>
      <SiteFooter />
    </>
  );
}
