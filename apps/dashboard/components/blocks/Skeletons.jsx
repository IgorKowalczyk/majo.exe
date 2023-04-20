export function GraphSkeleton({ className }) {
 return (
  <div className="flex flex-col items-center justify-center">
   <div className={`relative isolate h-80 w-full overflow-hidden rounded-md border border-white/10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`} />
  </div>
 );
}

export function TextSkeleton({ className }) {
 return <div className={`relative isolate h-6 w-64 overflow-hidden rounded-md border border-white/10 bg-button-secondary/80  before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`} />;
}

export function InputSkeleton({ className }) {
 return <div className={`relative isolate h-10 w-full max-w-[20rem] overflow-hidden rounded-md border border-white/10 bg-button-secondary/80  before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`} />;
}

export function EmbedSkeleton({ className }) {
 return <div className={`relative isolate h-96 w-full overflow-hidden rounded-md border border-white/10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`} />;
}

export function AvatarSkeleton({ className }) {
 return <div className={`relative isolate w-16 h-16 overflow-hidden rounded-full border bg-button-secondary/80 border-white/10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`} />;
}

export function ButtonSkeleton({ className }) {
 return <div className={`relative isolate h-10 w-32 overflow-hidden rounded-md border border-white/10 bg-button-secondary/80  before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`} />;
}
