"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Ad } from "@prisma/client";
import Link from "next/link";
import EditAdModal from "@/components/EditAdModal";

export default function AccountPage() {
  const { data: session } = useSession();
  const [listings, setListings] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      refreshListings();
    }
  }, [session]);

  const refreshListings = () => {
    fetch(`/api/ads/[id]/?user=${session?.user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const response = await fetch(`/api/ads/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete");
        }

        refreshListings();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Delete failed. Please try again.");
      }
    }
  };

  const handleUpdate = async (updatedAd: Ad) => {
    try {
      const response = await fetch(`/api/ads/${updatedAd.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAd),
      });
      const data = await response.json();
      if (data.success) {
        refreshListings();
        setEditingAd(null);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!session) return <div>Please sign in to view your account</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div>Loading...</div>
        ) : listings.length === 0 ? (
          <div>
            No listings found.{" "}
            <Link href="/NewAdPage" className="text-blue-500">
              Create one?
            </Link>
          </div>
        ) : (
          listings.map((ad) => (
            <div key={ad.id} className="border rounded-lg p-4 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => setEditingAd(ad)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="font-semibold text-lg">{ad.title}</h3>
              <p className="text-gray-600">€{ad.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">{ad.description}</p>
            </div>
          ))
        )}
      </div>

      {editingAd && (
        <EditAdModal
          ad={editingAd}
          onClose={() => setEditingAd(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
