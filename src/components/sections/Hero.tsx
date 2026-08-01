"use client";

import { Lang } from "@/lib/language";
import { translations } from "@/data/translations";

type HeroProps = {
  lang: Lang;
};

const workCta = {
  bs: {
    title: "Pogledajte radove",
    text: "Galerija izvedenih projekata",
  },
  sl: {
    title: "Poglejte reference",
    text: "Galerija izvedenih projektov",
  },
  de: {
    title: "Referenzen ansehen",
    text: "Galerie abgeschlossener Projekte",
  },
};

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const cta = workCta[lang];

  return (
    <section className="hero">
      <video
        className="hero-video"
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        poster="/video/hero-poster.webp"
      >
        <source src="/video/hero-desktop-optimized.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="eyebrow">{t.heroEyebrow}</p>
        <h1>{t.heroTitle}</h1>
        <p className="hero-text">{t.heroText}</p>

        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            {t.heroPrimary}
          </a>
          <a href="#references" className="btn btn-secondary">
            {t.heroSecondary}
          </a>

          <a href="#radilista" className="btn btn-worksites">
            Pogledaj radilišta
          </a>
        </div>

        <div className="trust-row">
          <span>{t.trustOne}</span>
          <span>{t.trustTwo}</span>
          <span>{t.trustThree}</span>
        </div>
      </div>
    </section>
  );
}









