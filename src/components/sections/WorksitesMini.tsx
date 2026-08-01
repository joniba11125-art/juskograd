"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Lang } from "@/lib/language";

type WorksitesMiniProps = {
  lang: Lang;
};

type WorksiteAlbum = {
  title: Record<Lang, string>;
  location: Record<Lang, string>;
  category: Record<Lang, string>;
  description: Record<Lang, string>;
  images: string[];
};

const texts = {
  bs: {
    kicker: "RADILIŠTA / GALERIJA",
    title: "Odabrana radilišta iz izvedbe.",
    intro:
      "Kratak pregled nekoliko izvedenih radilišta kroz fotografije sa terena.",
    photos: "fotografija",
  },
  sl: {
    kicker: "RADILIŠČA / GALERIJA",
    title: "Izbrana radilišča iz izvedbe.",
    intro:
      "Kratek pregled nekaj izvedenih radilišč skozi fotografije s terena.",
    photos: "fotografij",
  },
  de: {
    kicker: "BAUSTELLEN / GALERIE",
    title: "Ausgewählte Baustellen aus der Ausführung.",
    intro:
      "Ein kurzer Überblick über einige ausgeführte Baustellen mit Fotos vor Ort.",
    photos: "Fotos",
  },
};

const albums: WorksiteAlbum[] = [
  {
    title: {
      bs: "Rušilački i građevinski radovi na Kemijskom fakultetu",
      sl: "Rušitvena in gradbena dela na Kemijski fakulteti",
      de: "Abbruch- und Bauarbeiten an der Chemischen Fakultät",
    },
    location: {
      bs: "Aškerčeva, Ljubljana",
      sl: "Aškerčeva, Ljubljana",
      de: "Aškerčeva, Ljubljana",
    },
    category: {
      bs: "Rušilački i građevinski radovi",
      sl: "Rušitvena in gradbena dela",
      de: "Abbruch- und Bauarbeiten",
    },
    description: {
      bs: "Priprema prostora i izvođenje rušilačkih i građevinskih radova na objektu Kemijskog fakulteta u Ljubljani.",
      sl: "Priprava prostora ter izvedba rušitvenih in gradbenih del na objektu Kemijske fakultete v Ljubljani.",
      de: "Vorbereitung von Flächen sowie Ausführung von Abbruch- und Bauarbeiten an der Chemischen Fakultät in Ljubljana.",
    },
    images: [
      "/images/worksites/askerceva/jusko-grad-rusitvena-dela-askrceva-1-225x300.jpg",
      "/images/worksites/askerceva/jusko-grad-rusitvena-dela-askrceva-3-300x225.jpg",
      "/images/worksites/askerceva/jusko-grad-rusitvena-dela-askrceva-4-300x225.jpg",
      "/images/worksites/askerceva/jusko-grad-rusitvena-dela-askrceva-6-225x300.jpg",
    ],
  },
  {
    title: {
      bs: "Vanjsko uređenje objekata",
      sl: "Zunanja ureditev objektov",
      de: "Außenanlagen rund um Objekte",
    },
    location: {
      bs: "Škofljica",
      sl: "Škofljica",
      de: "Škofljica",
    },
    category: {
      bs: "Vanjsko uređenje",
      sl: "Zunanja ureditev",
      de: "Außenanlagen",
    },
    description: {
      bs: "Uređenje površina oko objekata, priprema terena, pristupa i završnih vanjskih radova.",
      sl: "Ureditev površin okoli objektov, priprava terena, dostopov in zaključnih zunanjih del.",
      de: "Gestaltung von Flächen rund um Objekte, Geländevorbereitung, Zugänge und abschließende Außenarbeiten.",
    },
    images: [
      "/images/worksites/skofljica/jusko-grad-zunanja-ureditev-skofljica-1-225x300.jpg",
      "/images/worksites/skofljica/jusko-grad-zunanja-ureditev-skofljica-4-225x300.jpg",
      "/images/worksites/skofljica/jusko-grad-zunanja-ureditev-skofljica-7-225x300.jpg",
      "/images/worksites/skofljica/jusko-grad-zunanja-ureditev-skofljica-10-225x300.jpg",
    ],
  },
  {
    title: {
      bs: "Izgradnja komunikacijske mreže",
      sl: "Izdelava komunikacijskega omrežja",
      de: "Ausbau eines Kommunikationsnetzes",
    },
    location: {
      bs: "Njemačka",
      sl: "Nemčija",
      de: "Deutschland",
    },
    category: {
      bs: "Komunikacijska infrastruktura",
      sl: "Komunikacijska infrastruktura",
      de: "Kommunikationsinfrastruktur",
    },
    description: {
      bs: "Priprema trasa, zemljani radovi i izvedba infrastrukture za komunikacijske veze.",
      sl: "Priprava tras, zemeljska dela in izvedba infrastrukture za komunikacijske povezave.",
      de: "Trassenvorbereitung, Erdarbeiten und Infrastruktur für Kommunikationsleitungen.",
    },
    images: [
      "/images/worksites/nemcija-komunikacijsko-omrezje/jusko-grad-izdelava-komunikacijskega-omrezja-nemcija-1.jpg",
      "/images/worksites/nemcija-komunikacijsko-omrezje/jusko-grad-izdelava-komunikacijskega-omrezja-nemcija-3.jpg",
      "/images/worksites/nemcija-komunikacijsko-omrezje/jusko-grad-izdelava-komunikacijskega-omrezja-nemcija-5.jpg",
      "/images/worksites/nemcija-komunikacijsko-omrezje/jusko-grad-izdelava-komunikacijskega-omrezja-nemcija-8.jpg",
    ],
  },
  {
    title: {
      bs: "Polaganje betonskih ivičnjaka i uređenje trotoara",
      sl: "Polaganje betonskih robnikov in ureditev pločnika",
      de: "Verlegung von Betonrandsteinen und Gehweggestaltung",
    },
    location: {
      bs: "Straža pri Novem mestu",
      sl: "Straža pri Novem mestu",
      de: "Straža bei Novo mesto",
    },
    category: {
      bs: "Ivičnjaci i trotoari",
      sl: "Robniki in pločniki",
      de: "Randsteine und Gehwege",
    },
    description: {
      bs: "Polaganje betonskih ivičnjaka, priprema podloge i uređenje pješačkih površina.",
      sl: "Polaganje betonskih robnikov, priprava podlage in ureditev pohodnih površin.",
      de: "Verlegung von Betonrandsteinen, Untergrundvorbereitung und Gestaltung von Gehflächen.",
    },
    images: [
      "/images/worksites/straza-robnik/jusko-grad-polaganje-betonskih-robnikov-straza-1-150x150.jpg",
      "/images/worksites/straza-robnik/jusko-grad-polaganje-betonskih-robnikov-straza-3-150x150.jpg",
      "/images/worksites/straza-robnik/jusko-grad-polaganje-betonskih-robnikov-straza-5-150x150.jpg",
      "/images/worksites/straza-robnik/jusko-grad-polaganje-betonskih-robnikov-straza-8-150x150.jpg",
    ],
  },
];

export default function WorksitesMini({ lang }: WorksitesMiniProps) {
  const [tick, setTick] = useState(0);
  const [fadeTick, setFadeTick] = useState(0);
  const t = texts[lang];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFadeTick((current) => current + 1);

      window.setTimeout(() => {
        setTick((current) => current + 1);
      }, 420);
    }, 6200);

    return () => window.clearInterval(timer);
  }, []);

  const activeIndexes = useMemo(() => {
    return albums.map((album, index) => {
      return (tick + index) % album.images.length;
    });
  }, [tick]);

  return (
    <section id="radilista" className="worksites-mini-section">
      <div className="worksites-mini-inner">
        <div className="worksites-mini-head">
          <p className="section-kicker">{t.kicker}</p>
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </div>

        <div className="worksites-mini-grid">
          {albums.map((album, index) => (
            <article className="worksites-mini-card" key={album.title.sl}>
              <div className="worksites-mini-image">
                <Image
                  key={`${album.title.sl}-${activeIndexes[index]}`}
                  className="worksites-mini-fade-image"
                  src={album.images[activeIndexes[index]]}
                  alt={album.title[lang]}
                  fill
                  sizes="(max-width: 760px) 100vw, 360px"
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                />
              </div>

              <div className="worksites-mini-content">
                <span>{album.category[lang]}</span>
                <h3>{album.title[lang]}</h3>
                <p>{album.description[lang]}</p>

                <div className="worksites-mini-meta">
                  <strong>{album.location[lang]}</strong>
                  <em>
                    {album.images.length} {t.photos}
                  </em>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

