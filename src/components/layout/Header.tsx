"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Lang } from "@/lib/language";
import { translations } from "@/data/translations";

type HeaderProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const languageOptions = [
  { code: "bs" as Lang, label: "Bosanski", flag: "/icons/flags/ba.png" },
  { code: "sl" as Lang, label: "Slovenščina", flag: "/icons/flags/si.png" },
  { code: "de" as Lang, label: "Deutsch", flag: "/icons/flags/de.png" },
];

export default function Header({ lang, setLang }: HeaderProps) {
  const t = translations[lang];
  const [isOverLight, setIsOverLight] = useState(false);

  useEffect(() => {
    function updateHeaderTone() {
      const hero = document.querySelector(".hero");

      if (!hero) {
        setIsOverLight(window.scrollY > 120);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;

      // Kad header više nije preko hero/dark dijela, prebacuje tekst u tamno.
      setIsOverLight(heroBottom < 120);
    }

    updateHeaderTone();

    window.addEventListener("scroll", updateHeaderTone, { passive: true });
    window.addEventListener("resize", updateHeaderTone);

    return () => {
      window.removeEventListener("scroll", updateHeaderTone);
      window.removeEventListener("resize", updateHeaderTone);
    };
  }, []);

  return (
    <header className={`site-header ${isOverLight ? "is-over-light" : ""}`}>
      <a href="/" className="brand" aria-label="JUSKO GRAD početna">
        <span className="brand-logo">
          <Image
            src="/images/logo/juskograd-logo.png"
            alt="JUSKO GRAD logo"
            width={190}
            height={64}
            priority
          />
        </span>
      </a>

      <nav className="main-nav">
        <a href="/#about">{t.navAbout}</a>
        <a href="/#services">{t.navServices}</a>
        <a href="/#references">{t.navReferences}</a>
        <a href="/galerija">Galerija</a>
        <a href="/#contact">{t.navContact}</a>
      </nav>

      <div className="lang-switcher-wrap">
        <span className="lang-icon" aria-hidden="true">🌐</span>

        <div className="lang-switcher">
          {languageOptions.map((item) => (
            <button
              key={item.code}
              className={lang === item.code ? "active" : ""}
              onClick={() => setLang(item.code)}
              type="button"
              title={item.label}
              aria-label={`Promijeni jezik: ${item.label}`}
            >
              <img src={item.flag} alt={item.label} className="flag-img" />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
