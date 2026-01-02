import Link from "next/link";

type HeroCTAProps = {
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
};

export default function HeroCTA({
  primaryText = "Make Your First Vow",
  primaryHref = "/vows/new",
  secondaryText = "Browse Destinations",
  secondaryHref = "/destinations",
}: HeroCTAProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* Primary CTA */}
      <Link
        href={primaryHref}
        className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
      >
        {primaryText}
      </Link>

      {/* Secondary CTA */}
      <Link
        href={secondaryHref}
        className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all w-full sm:w-auto"
      >
        {secondaryText}
      </Link>
    </div>
  );
}
