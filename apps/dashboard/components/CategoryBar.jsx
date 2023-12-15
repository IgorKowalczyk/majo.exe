import clsx from "clsx";

export function CategoryBar({ percent = 50, ...props }) {
 return (
  <div {...props}>
   <div className="relative text-gray-500 flex w-full mb-2 h-5">
    <div
     className="flex items-center justify-end"
     style={{
      width: "10%",
     }}
    >
     <span className="block left-1/2 translate-x-1/2">10</span>
    </div>
    <div
     className="flex items-center justify-end"
     style={{
      width: "20%",
     }}
    >
     <span className="block left-1/2 translate-x-1/2">30</span>
    </div>
    <div
     className="flex items-center justify-end"
     style={{
      width: "30%",
     }}
    >
     <span className="hidden left-1/2 translate-x-1/2">60</span>
    </div>
    <div
     className="flex items-center justify-end"
     style={{
      width: "40%",
     }}
    >
     <span className="hidden left-1/2 translate-x-1/2">100</span>{" "}
    </div>
    <div className="absolute bottom-0 flex items-center left-0">0</div>
    <div className="absolute bottom-0 flex items-center right-0">100</div>
   </div>
   <div className="relative w-full flex items-center h-2">
    <div className="flex-1 flex items-center h-full overflow-hidden rounded-full">
     <div
      className="h-full bg-rose-500"
      style={{
       width: "10%",
      }}
     />
     <div
      className="h-full bg-orange-500"
      style={{
       width: "20%",
      }}
     />
     <div
      className="h-full bg-yellow-500"
      style={{
       width: "30%",
      }}
     />
     <div
      className="h-full bg-emerald-500"
      style={{
       width: "40%",
      }}
     />
    </div>
    <div
     className="absolute right-1/2 -translate-x-1/2 w-5"
     style={{
      left: `${percent}%`,
     }}
    >
     <div
      className={clsx(
       {
        "bg-rose-500": percent <= 10,
        "bg-orange-500": percent > 10 && percent <= 30,
        "bg-yellow-500": percent > 30 && percent <= 60,
        "bg-emerald-500": percent > 60,
       },
       "ring-2 mx-auto rounded-full ring-background-secondary h-4 w-1"
      )}
     />
    </div>
   </div>
  </div>
 );
}
