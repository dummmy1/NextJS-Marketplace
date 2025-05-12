import AdList from "@/components/AdList";
import { Ad } from "@prisma/client";

async function getAds() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ads/[id]`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ads");
  }

  return res.json();
}

export default async function Home() {
  const ads: Ad[] = await getAds();

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 px-4">Latest Listings</h1>
        <AdList ads={ads} />
      </main>
    </div>
  );
}
