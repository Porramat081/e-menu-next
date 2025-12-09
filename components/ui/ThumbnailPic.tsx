import Image from "next/image";

export default function ThumbnailPic({
  imgUrl,
  alt = "",
}: {
  imgUrl: string;
  alt: string;
}) {
  return (
    <div className="rounded-full w-15 h-15 overflow-clip">
      <Image
        src={imgUrl}
        alt={alt}
        width={300}
        height={300}
        className="object-cover object-center origin-center"
      ></Image>
    </div>
  );
}
