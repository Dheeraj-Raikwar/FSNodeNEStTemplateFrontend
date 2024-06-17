import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  variantType : "light" | "splitted";
  items: AccordionItemProps[];
}

const AUAccordion: React.FC<AccordionProps> = ({ items, variantType = 'light' }) => {
  return (
    <>
      <Accordion variant={variantType} >
        {items.map((item, key) => (
          <AccordionItem key={key} aria-label={item.title} title={item.title}
          classNames={{ title: "text-app-012 text-small" }}
          >
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </>
    
  );
}

export default AUAccordion;
