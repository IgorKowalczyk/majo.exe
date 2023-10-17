import clsx from "clsx";
import Balancer from "react-wrap-balancer";
import { Header4 } from "./Headers";

export function Card({ children }) {
 return <div className="border-accent-primary bg-accent-primary/[5%] rounded-xl border px-6 py-3">{children}</div>;
}

export function GraphCard({ data, className }) {
 return (
  <div className={clsx("bg-background-secondary mt-4 overflow-auto rounded-lg border border-neutral-800 p-4", className)}>
   <div className="flex flex-row items-center justify-between">
    <div className="flex flex-row items-center gap-4">
     {data.icon}
     <div className="flex flex-col">
      <Header4 className="!justify-start">{data.title}</Header4>
      <p className="text-sm">
       <Balancer>{data.description}</Balancer>
      </p>
     </div>
    </div>
    <div className="flex flex-row items-center gap-4">
     {parseInt(data.value) > 0 ? (
      <p className="text-accent-primary border-accent-primary/50 bg-accent-primary/20 flex gap-2 rounded-full border px-2 py-1 text-sm font-bold">
       +{data.value} {data.graph}
      </p>
     ) : parseInt(data.value) < 0 ? (
      <p className="flex gap-2 rounded-full border border-red-400/50 bg-red-400/30 px-2 py-1 text-sm font-bold text-red-400">
       -{data.value} {data.graph}
      </p>
     ) : (
      <p className="flex gap-2 rounded-full border border-white/50 bg-white/20 px-2 py-1 text-sm font-bold text-white">
       {data.value} {data.graph}
      </p>
     )}
    </div>
   </div>
  </div>
 );
}
