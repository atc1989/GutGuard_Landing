import Image from "next/image";

import RatingStars from "./RatingStars";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <article className="h-full rounded-[30px] border border-white/60 bg-white/78 p-7 shadow-[0_20px_60px_rgba(7,27,84,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(7,27,84,0.1)]">
      <RatingStars rating={rating} />
      <blockquote className="mt-5 min-h-[168px] text-lg leading-8 tracking-[-0.01em] text-slate-700">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-7 flex items-center">
        {avatar ? (
          <Image
            alt={author}
            className="mr-4 h-12 w-12 rounded-full border border-white/80 object-cover"
            height={48}
            src={avatar}
            width={48}
          />
        ) : null}
        <div>
          <p className="text-base font-semibold text-slate-900">{author}</p>
          {role ? <p className="mt-1 text-sm text-slate-500">{role}</p> : null}
        </div>
      </div>
    </article>
  );
}
