import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const backendUrl = `http://localhost:8080/api/v1/images/image/download/${id}`;

  const res = await fetch(backendUrl, { cache: "no-store" });

  if (!res.ok) {
    return new NextResponse("Image not found", { status: res.status });
  }

  const contentType =
    res.headers.get("content-type") ?? "application/octet-stream";
  const body = await res.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      // optional caching:
      // "Cache-Control": "public, max-age=3600",
    },
  });
}
