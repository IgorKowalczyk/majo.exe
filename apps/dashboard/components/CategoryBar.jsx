import clsx from "clsx";

export function CategoryBar({ percent = 50, ...props }) {
 return (
  <div {...props}>
   <div className="relative mb-2 flex h-5 w-full text-gray-500">
    <div
     className="flex items-center justify-end"
     style={{
      width: "10%",
     }}
    >
     <span className="left-1/2 block translate-x-1/2">10</span>
    </div>
    <div
     className="flex items-center justify-end"
     style={{
      width: "20%",
     }}
    >
     <span className="left-1/2 block translate-x-1/2">30</span>
    </div>
    <div
     className="flex items-center justify-end"
     style={{
      width: "30%",
     }}
    >
     <span className="left-1/2 hidden translate-x-1/2">60</span>
    </div>
    <div
     className="flex items-center justify-end"
     style={{
      width: "40%",
     }}
    >
     <span className="left-1/2 hidden translate-x-1/2">100</span>{" "}
    </div>
    <div className="absolute bottom-0 left-0 flex items-center">0</div>
    <div className="absolute bottom-0 right-0 flex items-center">100</div>
   </div>
   <div className="relative flex h-2 w-full items-center">
    <div className="flex h-full flex-1 items-center overflow-hidden rounded-full">
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
     className="absolute right-1/2 w-5 -translate-x-1/2"
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
       "mx-auto h-4 w-1 rounded-full ring-2 ring-background-secondary"
      )}
     />
    </div>
   </div>
  </div>
 );
}
