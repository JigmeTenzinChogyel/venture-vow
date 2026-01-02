// components/HeroBackground.tsx
type HeroBackgroundProps = {
  imageUrl?: string;
  overlayOpacity?: number;
};

export default function HeroBackground({
  imageUrl = "/images/hero-background.jpg",
  overlayOpacity = 0.4,
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      {/* Lighter overlay with inline style for dynamic opacity */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
