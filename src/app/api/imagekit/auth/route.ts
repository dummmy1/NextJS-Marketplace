import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import ImageKit from "imagekit";

export async function GET() {
    console.log("ImageKit Auth API Hit");
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const imagekit = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_ENDPOINT!,
    publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC!,
    privateKey: process.env.IMAGE_KIT_PRIVATE!,
  });

  const authParams = imagekit.getAuthenticationParameters();
  return Response.json(authParams);
}
