"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${
        pending ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
      } text-white px-4 py-3 rounded mx-2 mt-4 transition-colors`}
      disabled={pending}
    >
      {pending ? "Processing..." : children}
    </button>
  );
}
