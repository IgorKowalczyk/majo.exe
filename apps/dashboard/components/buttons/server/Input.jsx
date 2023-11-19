import clsx from "clsx";

export function Input({ placeholder, type, name, value, onChange, className, ...props }) {
 return <input type={type} name={name} value={value} onChange={onChange} className={clsx("focus:!border-button-primary w-full rounded-md border border-neutral-800 bg-transparent px-3 py-2 shadow-sm outline-none !ring-0 duration-200", className)} placeholder={placeholder} {...props} />;
}

export function Textarea({ placeholder, name, value, onChange, className }) {
 return <textarea name={name} value={value} onChange={onChange} className={clsx("focus:!border-button-primary w-full rounded-md border border-neutral-800 bg-transparent px-3 py-2 shadow-sm outline-none !ring-0 duration-200", className)} placeholder={placeholder} />;
}

export function Checkbox({ name, value, onChange, className, checked }) {
 return <input type="checkbox" name={name} value={value} onChange={onChange} checked={checked} className={clsx("checked:bg-button-primary checked:hover:bg-button-primary focus:!border-button-primary focus:outline-button-primary focus:ring-button-primary focus:checked:bg-button-primary cursor-pointer rounded-md border border-neutral-800 bg-transparent p-1 shadow-sm outline-none !ring-0 duration-200", className)} />;
}

export function InputWithIcon({ icon, text, required, placeholder, className, readOnly = false, ...props }) {
 return (
  <label className="w-full" htmlFor={text}>
   <span className="flex items-center gap-1 opacity-90">
    {text}
    {required && !readOnly && <span className="text-red-500">*</span>}
    {readOnly && <span className="text-sm text-gray-500">(read only)</span>}
   </span>
   <div className="relative my-2 flex">
    <div
     className={clsx(
      {
       "opacity-50": readOnly,
      },
      "absolute inset-y-0 left-0 flex items-center pl-3"
     )}
    >
     {icon}
    </div>
    <Input id={text} placeholder={placeholder} {...props} className={clsx("pl-10", className)} readOnly={readOnly} />
   </div>
  </label>
 );
}
