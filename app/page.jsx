import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { MembershipPlans } from "@/components/sections/MembershipPlans";
import { LatestNews } from "@/components/sections/LatestNews";
import { InstagramFeed } from "@/components/sections/InstagramFeed";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MembershipPlans />
        <LatestNews />
        <InstagramFeed />
      </main>
      <SiteFooter />
    </>
  );
}
