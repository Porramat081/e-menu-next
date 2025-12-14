import Image from "next/image";

export default function ThumbnailPic({
  imgUrl,
  alt = "",
}: {
  imgUrl: string;
  alt: string;
}) {
  return (
    <div className="rounded-full w-15 h-15 overflow-clip border">
      <Image
        src={"/api/image/" + imgUrl?.split("/")[imgUrl?.split("/")?.length - 1]}
        alt={alt}
        width={300}
        height={300}
        loading="eager"
        className="object-cover object-center origin-center p-1"
      ></Image>
    </div>
  );
}
