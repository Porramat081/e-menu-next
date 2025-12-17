import Image from "next/image";

export default function ImageProduct({ imageUrl }: { imageUrl: string }) {
  const target_url = imageUrl?.split("/")[imageUrl?.split("/").length - 1];
  const exact_url = target_url
    ? "/api/image/" + target_url
    : "/pic/default_product.png";

  return (
    <Image
      loading="eager"
      src={exact_url}
      alt={`menu-image`}
      fill
      sizes="100%"
      className="object-cover object-center origin-center"
    ></Image>
  );
}
