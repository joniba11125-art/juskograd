"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Lang } from "@/lib/language";
import { useHomepageImage } from "@/lib/homepage-media";

type ReferencesProps = {
  lang: Lang;
};

const content = {
  bs: {
    kicker: "REFERENCE",
    title: "Najviše o izvedbi govore završeni radovi.",
    intro:
      "U referencama su prikazani radovi iz oblasti iskopa, komunalnih priključaka, vanjskih uređenja, potpornih zidova, popločavanja i drugih građevinskih zahvata.",
    hint: "Klikni sliku za veći prikaz",
    close: "Zatvori",
    previous: "Prethodna slika",
    next: "Sljedeća slika",
    projects: [
      {
        title: "Iskopi i priprema terena",
        category: "Niskogradnja",
        image: "/images/projects/project-01-bager.webp",
      },
      {
        title: "Zemljani radovi",
        category: "Građevinska mehanizacija",
        image: "/images/projects/project-02-kubota-bager.webp",
      },
      {
        title: "Infrastrukturni radovi",
        category: "Komunalna infrastruktura",
        image: "/images/projects/project-03-radovi-uz-cestu.webp",
      },
      {
        title: "Komunalni priključci",
        category: "Priključci i instalacije",
        image: "/images/projects/project-04-narandzaste-cijevi.webp",
      },
      {
        title: "Uređenje dvorišta",
        category: "Vanjsko uređenje",
        image: "/images/projects/project-05-poplocano-dvoriste.webp",
      },
      {
        title: "Popločavanje prilaza",
        category: "Tlakovanje",
        image: "/images/projects/project-06-poplocani-prilaz.webp",
      },
      {
        title: "Potporni zid",
        category: "Potporni zidovi",
        image: "/images/projects/project-07-potporni-zid.webp",
      },
      {
        title: "Metalna ograda",
        category: "Ograde i završni radovi",
        image: "/images/projects/project-08-metalna-ograda.webp",
      },
    ],
  },

  sl: {
    kicker: "REFERENCE",
    title: "Največ o izvedbi povedo končani projekti.",
    intro:
      "V referencah so prikazana dela s področja izkopov, komunalnih priključkov, zunanjih ureditev, podpornih zidov, tlakovanja in drugih gradbenih posegov.",
    hint: "Kliknite sliko za večji prikaz",
    close: "Zapri",
    previous: "Prejšnja slika",
    next: "Naslednja slika",
    projects: [
      {
        title: "Izkopi in priprava terena",
        category: "Nizka gradnja",
        image: "/images/projects/project-01-bager.webp",
      },
      {
        title: "Zemeljska dela",
        category: "Gradbena mehanizacija",
        image: "/images/projects/project-02-kubota-bager.webp",
      },
      {
        title: "Infrastrukturna dela",
        category: "Komunalna infrastruktura",
        image: "/images/projects/project-03-radovi-uz-cestu.webp",
      },
      {
        title: "Komunalni priključki",
        category: "Priključki in instalacije",
        image: "/images/projects/project-04-narandzaste-cijevi.webp",
      },
      {
        title: "Ureditev dvorišča",
        category: "Zunanja ureditev",
        image: "/images/projects/project-05-poplocano-dvoriste.webp",
      },
      {
        title: "Tlakovanje dovoza",
        category: "Tlakovanje",
        image: "/images/projects/project-06-poplocani-prilaz.webp",
      },
      {
        title: "Podporni zid",
        category: "Podporni zidovi",
        image: "/images/projects/project-07-potporni-zid.webp",
      },
      {
        title: "Kovinska ograja",
        category: "Ograje in zaključna dela",
        image: "/images/projects/project-08-metalna-ograda.webp",
      },
    ],
  },

  de: {
    kicker: "REFERENZEN",
    title: "Abgeschlossene Projekte zeigen die Qualität der Ausführung am besten.",
    intro:
      "In den Referenzen sehen Sie Arbeiten aus den Bereichen Erdarbeiten, Versorgungsanschlüsse, Außenanlagen, Stützmauern, Pflasterarbeiten und weitere Baumaßnahmen.",
    hint: "Bild anklicken und größer ansehen",
    close: "Schließen",
    previous: "Vorheriges Bild",
    next: "Nächstes Bild",
    projects: [
      {
        title: "Erdarbeiten und Vorbereitung",
        category: "Tiefbau",
        image: "/images/projects/project-01-bager.webp",
      },
      {
        title: "Erd- und Tiefbauarbeiten",
        category: "Baumaschineneinsatz",
        image: "/images/projects/project-02-kubota-bager.webp",
      },
      {
        title: "Infrastrukturarbeiten",
        category: "Kommunale Infrastruktur",
        image: "/images/projects/project-03-radovi-uz-cestu.webp",
      },
      {
        title: "Versorgungsanschlüsse",
        category: "Anschlüsse und Installationen",
        image: "/images/projects/project-04-narandzaste-cijevi.webp",
      },
      {
        title: "Gestaltung von Hof- und Außenflächen",
        category: "Außenanlagen",
        image: "/images/projects/project-05-poplocano-dvoriste.webp",
      },
      {
        title: "Pflasterung der Zufahrt",
        category: "Pflasterarbeiten",
        image: "/images/projects/project-06-poplocani-prilaz.webp",
      },
      {
        title: "Stützmauer",
        category: "Stützmauern",
        image: "/images/projects/project-07-potporni-zid.webp",
      },
      {
        title: "Metallzaun",
        category: "Zäune und Abschlussarbeiten",
        image: "/images/projects/project-08-metalna-ograda.webp",
      },
    ],
  },
};

export default function References({ lang }: ReferencesProps) {
  const t = content[lang];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const overrideImages = [
    useHomepageImage("project-1", "/images/projects/project-01-bager.webp"),
    useHomepageImage("project-2", "/images/projects/project-02-kubota-bager.webp"),
    useHomepageImage("project-3", "/images/projects/project-03-radovi-uz-cestu.webp"),
    useHomepageImage("project-4", "/images/projects/project-04-narandzaste-cijevi.webp"),
    useHomepageImage("project-5", "/images/projects/project-05-poplocano-dvoriste.webp"),
    useHomepageImage("project-6", "/images/projects/project-06-poplocani-prilaz.webp"),
    useHomepageImage("project-7", "/images/projects/project-07-potporni-zid.webp"),
    useHomepageImage("project-8", "/images/projects/project-08-metalna-ograda.webp"),
  ];

  const activeProject =
    activeIndex !== null ? t.projects[activeIndex] : null;

  function openLightbox(index: number) {
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? t.projects.length - 1 : current - 1;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === t.projects.length - 1 ? 0 : current + 1;
    });
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", handleKeyDown);

    if (activeIndex !== null) {
      document.body.classList.add("lightbox-open");
    } else {
      document.body.classList.remove("lightbox-open");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [activeIndex]);

  return (
    <section id="references" className="references-section">
      <div className="section-head references-head">
        <p className="section-kicker">{t.kicker}</p>
        <h2>{t.title}</h2>
        <p>{t.intro}</p>
      </div>

      <div className="references-actions">
        <a href="#radilista" className="references-worksites-link">
          Pogledaj radilišta
        </a>

        <div className="reference-click-hint">
          <span>↗</span>
          {t.hint}
        </div>
      </div>

      <div className="references-grid">
        {t.projects.map((project, index) => (
          <button
            className="reference-card"
            key={project.title}
            type="button"
            onClick={() => openLightbox(index)}
            aria-label={`${project.title} - ${project.category}`}
          >
            <div className="reference-image">
              <Image
                src={overrideImages[index]}
                unoptimized={overrideImages[index].startsWith("blob:")}
                alt={project.title}
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            </div>

            <div className="reference-info">
              <span>{project.category}</span>
              <h3>{project.title}</h3>
            </div>
          </button>
        ))}
      </div>
        {activeProject && (
          <div
            className="refs-viewer"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
            onClick={closeLightbox}
          >
            <button
              className="refs-viewer-close"
              type="button"
              onClick={closeLightbox}
              aria-label={t.close}
            >
              ×
            </button>

            <button
              className="refs-viewer-arrow refs-viewer-arrow-left"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label={t.previous}
            >
              ‹
            </button>

            <div
              className="refs-viewer-panel"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="refs-viewer-photo">
                <img
                  src={overrideImages[activeIndex!]}
                  alt={activeProject.title}
                />
              </div>

              <div className="refs-viewer-caption">
                <span>{activeProject.category}</span>
                <h3>{activeProject.title}</h3>
              </div>
            </div>

            <button
              className="refs-viewer-arrow refs-viewer-arrow-right"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label={t.next}
            >
              ›
            </button>
          </div>
        )}

    </section>
  );
}










