import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full relative overflow-hidden bg-[#1a1a1a]">
      <Image
        src="/heroImage.png"
        alt="Today's special offer"
        width={1920}
        height={600}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  );
}
