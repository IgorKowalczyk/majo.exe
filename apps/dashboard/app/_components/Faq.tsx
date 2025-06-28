"use client";

import Link from "next/link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

export const Faq = ({ className, ...props }: React.ComponentProps<"div">) => {
 const items = [
  {
   question: "What is Majo.exe",
   answer:
    "Majo.exe is a multi-purpose Discord bot that offers a wide range of features such as moderation, image manipulation, leveling, auto-moderation, and much more. It's designed to be easy to use and highly customizable - perfect for any server.",
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
   answer:
    "You can invite Majo.exe to your server by clicking the 'Add to server' button on our website. You'll need to have the 'Manage Server' permission to add the bot to your server.",
  },
  {
   question: "How do I report a bug?",
   answer: "If you find a bug, please report it on our GitHub repository. We'll do our best to fix it as soon as possible.",
  },
 ];

 return (
  <div className={cn("mx-auto mt-9 w-full max-w-3xl rounded-xl", className)} {...props}>
   {items.map((item, index) => (
    <Accordion type="single" collapsible key={`faq-${item.question}`}>
     <AccordionItem value={`item-${index + 1}`}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
     </AccordionItem>
    </Accordion>
   ))}

   <div className="mt-6 text-center text-sm text-neutral-400">
    Have more questions?{" "}
    <Link href="/contact" className="underline">
     Contact us.
    </Link>
   </div>
  </div>
 );
};
