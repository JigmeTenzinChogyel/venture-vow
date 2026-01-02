type HeroContentProps = {
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
};

export default function HeroContent({
  title,
  highlight,
  subtitle,
  description,
}: HeroContentProps) {
  return (
    <div className="mb-12">
      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
        {title}
        <br />
        <span className="text-orange-500">{highlight}</span>
      </h1>

      {/* Subheading */}
      <p className="text-xl md:text-2xl text-gray-200 mb-4">{subtitle}</p>

      {/* Supporting Text */}
      <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}
