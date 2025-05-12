"use client";
import { faCircleUser, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="border-b flex justify-between p-4 items-center">
      <Link className="text-indigo-500 text-2xl font-bold" href="/">
        Marketplace
      </Link>
      <nav className="flex gap-4  *:rounded *:px-2 *:py-1">
        <Link
          href={"/NewAdPage"}
          className="border inline-flex items-center gap-1.5 mr-6 border-blue-500 text-blue-500"
        >
          <FontAwesomeIcon className="h-4.5" icon={faPlus} />
          <span>New Listing</span>
        </Link>

        {!session?.user && (
          <>
            <button className="border-0">Sign up</button>
            <button
              onClick={() => signIn("google")}
              className="border gap-2 inline-flex items-center "
            >
              <FontAwesomeIcon icon={faCircleUser} className="h-5 " />
              <span>Log in</span>
            </button>
          </>
        )}
        {session?.user && (
          <>
            <Link href={"/account"}>
              <Image
                className="rounded"
                src={session.user.image as string}
                alt={"profileImage"}
                width={38}
                height={38}
              ></Image>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
