"use client";

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ad } from "@prisma/client";

export default function AdModal({
  ad,
  onClose,
}: {
  ad: Ad;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{ad.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faCircleXmark} className="size-24" />
          </button>
        </div>

        <div className="p-4">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-64 object-cover rounded mb-4"
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Price</p>
              <p>€{ad.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">Category</p>
              <p>{ad.category}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Description</p>
            <p className="whitespace-pre-line">{ad.description}</p>
          </div>

          <div>
            <p className="font-semibold">Contact</p>
            <p>{ad.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
