import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        className={
          (pending ? "bg-gray-500" : "bg-blue-600") +
          "text-fuchsia-50 px-4 py-3 rounded mx-2"
        }
        disabled={pending}
      >
        {pending && <span>Saving !</span>}
        {!pending && <span>{children}</span>}
      </button>
    </>
  );
}
