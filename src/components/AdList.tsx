"use client";

import { useState } from "react";
import { Ad } from "@prisma/client";
import AdModal from "./AdModal";

export default function AdList({ ads }: { ads: Ad[] }) {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {ads.map((ad) => (
        <div
          key={ad.id}
          onClick={() => setSelectedAd(ad)}
          className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="h-48 bg-gray-200 relative">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{ad.title}</h3>
            <p className="text-gray-600">{ad.category}</p>
            <p className="font-bold mt-2">€{ad.price.toFixed(2)}</p>
          </div>
        </div>
      ))}

      {selectedAd && (
        <AdModal ad={selectedAd} onClose={() => setSelectedAd(null)} />
      )}
    </div>
  );
}
