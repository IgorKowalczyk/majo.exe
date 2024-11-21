"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { Icons } from "@/components/Icons";

export default function Faq() {
 const items = [
  {
   question: "What is Majo.exe",
   answer: "Majo.exe is a multi-purpose Discord bot that offers a wide range of features such as moderation, image manipulation, leveling, auto-moderation, and much more. It's designed to be easy to use and highly customizable - perfect for any server.",
  },
  {
   question: "Do you offer technical support?",
   answer: "Yes! If you have any issues, we're here to help you. Just join our Discord server and ask for help.",
  },
  {
   question: "Is Majo.exe free?",
   answer: "Yes! Majo.exe is free to use and always will be. We are planning to offer premium features in the future, but the core bot will always be free.",
  },
  {
   question: "How do I invite Majo.exe to my server?",
   answer: "You can invite Majo.exe to your server by clicking the 'Add to server' button on our website. You'll need to have the 'Manage Server' permission to add the bot to your server.",
  },
  {
   question: "How do I report a bug?",
   answer: "If you find a bug, please report it on our GitHub repository. We'll do our best to fix it as soon as possible.",
  },
 ];

 return (
  <div className="mx-auto mt-9 w-full max-w-xl divide-y divide-neutral-800 rounded-xl">
   {items.map((item) => (
    <Disclosure as="div" key={`faq-${item.question}`} className="p-6 py-3">
     {({ open }) => (
      <>
       <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="font-medium text-white duration-200 group-data-[hover]:text-white/80 motion-reduce:duration-0">{item.question}</span>
        {open ? <Icons.minus className="size-5 fill-white/60 duration-200 group-data-[hover]:fill-white/50 motion-reduce:duration-0" /> : <Icons.plus className="size-5 fill-white/60 duration-200 group-data-[hover]:fill-white/50 motion-reduce:duration-0" />}
       </DisclosureButton>

       <Transition enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="w-full transform scale-100 opacity-100" leave="w-full transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="w-full transform scale-95 opacity-0">
        <DisclosurePanel className="mt-2 origin-top text-white/60">{item.answer}</DisclosurePanel>
       </Transition>
      </>
     )}
    </Disclosure>
   ))}
  </div>
 );
}
