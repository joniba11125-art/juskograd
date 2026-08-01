"use client";

import { Mail, Phone } from "lucide-react";
import { Lang } from "@/lib/language";

type MobileContactBarProps = {
  lang: Lang;
};

const content = {
  bs: {
    call: "Pozovi",
    inquiry: "Upit",
  },
  sl: {
    call: "Pokliči",
    inquiry: "Povpraševanje",
  },
  de: {
    call: "Anrufen",
    inquiry: "Anfrage",
  },
};

export default function MobileContactBar({ lang }: MobileContactBarProps) {
  const t = content[lang];

  return (
    <div className="mobile-contact-bar">
      <a href="tel:+38670749086" className="mobile-contact-action">
        <Phone size={18} strokeWidth={2.2} />
        {t.call}
      </a>

      <a href="#contact" className="mobile-contact-action primary">
        <Mail size={18} strokeWidth={2.2} />
        {t.inquiry}
      </a>
    </div>
  );
}



