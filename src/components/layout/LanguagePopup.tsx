"use client";

import Image from "next/image";
import { Lang } from "@/lib/language";

type LanguagePopupProps = {
  lang?: Lang;
  onSelect: (lang: Lang) => void;
};

const languages = [
  {
    code: "bs" as Lang,
    label: "Bosanski",
    flag: "/icons/flags/ba.png",
  },
  {
    code: "sl" as Lang,
    label: "Slovenščina",
    flag: "/icons/flags/si.png",
  },
  {
    code: "de" as Lang,
    label: "Deutsch",
    flag: "/icons/flags/de.png",
  },
];

export default function LanguagePopup({ onSelect }: LanguagePopupProps) {
  return (
    <div className="language-popup">
      <div className="language-card">
        <div className="language-logo language-logo-real">
          <Image
            src="/images/logo/juskograd-logo.png"
            alt="JUSKO GRAD logo"
            width={190}
            height={64}
            priority
          />
        </div>

        <h2 className="language-title-multi">
          <span>Izaberite jezik</span>
          <span>Izberite jezik</span>
          <span>Sprache wählen</span>
        </h2>

        <div className="language-buttons">
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => onSelect(item.code)}
              type="button"
            >
              <span className="language-flag-img">
                <img src={item.flag} alt={item.label} />
              </span>

              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
