import clsx from "clsx";

export function Card({ children }) {
 return <div className="border-accent-primary bg-accent-primary/[5%] rounded-xl border px-6 py-3">{children}</div>;
}

export function GraphCard({ data, className }) {
 return (
  <div className={clsx("mt-4 overflow-auto rounded-lg border bg-background-secondary p-4 border-neutral-800", className)}>
   <div className="flex flex-row items-center justify-between">
    <div className="flex flex-row items-center gap-4">
     {data.icon}
     <div className="flex flex-col">
      <h1 className="text-xl font-bold">{data.title}</h1>
      <p className="text-sm">{data.description}</p>
     </div>
    </div>
    <div className="flex flex-row items-center gap-4">
     {parseInt(data.value) > 0 ? (
      <p className="border flex gap-2 rounded-full px-2 py-1 text-sm font-bold text-accent-primary border-accent-primary/50 bg-accent-primary/20">
       +{data.value} {data.graph}
      </p>
     ) : parseInt(data.value) < 0 ? (
      <p className="border flex gap-2 rounded-full bg-red-400/30 border-red-400/50 px-2 py-1 text-sm font-bold text-red-400">
       -{data.value} {data.graph}
      </p>
     ) : (
      <p className="border flex gap-2 rounded-full px-2 py-1 text-sm font-bold bg-white/20 border-white/50 text-white">
       {data.value} {data.graph}
      </p>
     )}
    </div>
   </div>
  </div>
 );
}
