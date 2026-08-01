"use client";

import { useState } from "react";
import {
  Building2,
  Cable,
  Droplets,
  Construction,
  PanelsTopLeft,
  Route,
} from "lucide-react";
import { Lang } from "@/lib/language";
import { useHomepageImage } from "@/lib/homepage-media";

type ServicesProps = {
  lang: Lang;
};

const serviceIcons = [
  Building2,
  Cable,
  Droplets,
  Construction,
  PanelsTopLeft,
  Route,
];

const content = {
  bs: {
    kicker: "USLUGE",
    title: "Radovi na terenu, priključci i uređenje površina.",
    intro:
      "Izvodimo građevinske radove i radove niskogradnje za privatne, poslovne i javne objekte.",
    tapText: "Detalji",
    items: [
      {
        title: "Niskogradnja",
        text: "Priprema terena, komunalna infrastruktura, učvršćivanje podloga, nasipi i drugi radovi vezani za uređenje zemljišta i pristupa.",
      },
      {
        title: "Kanalizacijski priključci",
        text: "Kanalizacijski priključci, odvodnja, oborinske vode, ukidanje septičkih jama, priključci na kolektorski sistem te ugradnja šahtova i cijevi.",
      },
      {
        title: "Vodovodni priključci",
        text: "Radovi na vodovodnim priključcima, ugradnja vodomjernih šahtova, priprema trasa i drugi radovi vezani za kućne i javne vodovodne instalacije.",
      },
      {
        title: "Građevinska mehanizacija",
        text: "Iskopi, nasipi, planiranje, učvršćivanje i pripremni radovi za objekte, dvorišta, puteve, ceste i komunalne priključke.",
      },
      {
        title: "Vanjska uređenja",
        text: "Uređenje dvorišta, prilaza, staza i okoline objekata. Radovi mogu uključivati popločavanje, asfaltiranje, rubnike, ograde i pripremu površina.",
      },
      {
        title: "Ceste, ulice i trotoari",
        text: "Gradnja, uređenje i sanacija cesta, ulica, trotoara i druge komunalne infrastrukture gdje su važni dobra priprema podloge i precizna izvedba.",
      },
    ],
  },

  sl: {
    kicker: "STORITVE",
    title: "Dela na terenu, priključki in urejanje površin.",
    intro:
      "Izvajamo gradbena in nizkogradbena dela za zasebne, poslovne in javne projekte.",
    tapText: "Podrobnosti",
    items: [
      {
        title: "Nizka gradnja",
        text: "Priprava terena, komunalna infrastruktura, utrjevanje podlag, nasutja in druga dela, povezana z urejanjem zemljišč in dostopov.",
      },
      {
        title: "Kanalizacijski priključki",
        text: "Kanalizacijski priključki, odvodnjavanje, meteorna voda, ukinitve greznic, priklopi na kolektorski sistem ter vgradnja jaškov in cevi.",
      },
      {
        title: "Vodovodni priključki",
        text: "Dela na vodovodnih priključkih, vgradnja vodomernih jaškov, priprava tras in druga dela, povezana s hišnimi priključki ter javnim vodovodnim omrežjem.",
      },
      {
        title: "Gradbena mehanizacija",
        text: "Izkopi, nasipi, planiranje, utrjevanje ter pripravljalna dela za objekte, dvorišča, poti, ceste in komunalne priključke.",
      },
      {
        title: "Zunanje ureditve",
        text: "Urejanje dvorišč, dovozov, poti in okolice objektov. Dela lahko vključujejo tlakovanje, asfaltiranje, robnike, ograje in pripravo površin.",
      },
      {
        title: "Ceste in ulice",
        text: "Gradnja, urejanje in sanacija cest, ulic, pločnikov ter druge komunalne infrastrukture, kjer sta pomembni dobra priprava podlage in natančna izvedba.",
      },
    ],
  },

  de: {
    kicker: "LEISTUNGEN",
    title: "Bauarbeiten vor Ort, Anschlüsse und Außenanlagen.",
    intro:
      "Wir führen Bau- und Tiefbauarbeiten für private, gewerbliche und öffentliche Projekte aus.",
    tapText: "Details",
    items: [
      {
        title: "Tiefbau",
        text: "Geländevorbereitung, kommunale Infrastruktur, Untergrundbefestigung, Aufschüttungen und weitere Arbeiten rund um Grundstücke und Zufahrten.",
      },
      {
        title: "Kanalanschlüsse",
        text: "Kanalanschlüsse, Entwässerung, Regenwasser, Stilllegung von Klärgruben, Anschluss an Sammelsysteme sowie Einbau von Schächten und Rohren.",
      },
      {
        title: "Wasseranschlüsse",
        text: "Arbeiten an Wasseranschlüssen, Einbau von Wasserzählerschächten, Vorbereitung von Leitungsgräben und weitere Arbeiten an privaten und öffentlichen Wasserversorgungsnetzen.",
      },
      {
        title: "Baumaschineneinsatz",
        text: "Erdarbeiten, Aufschüttungen, Planierung, Verdichtung und vorbereitende Arbeiten für Objekte, Höfe, Wege, Straßen und Versorgungsanschlüsse.",
      },
      {
        title: "Außenanlagen",
        text: "Gestaltung von Höfen, Zufahrten, Wegen und Außenflächen rund um Gebäude. Dazu gehören Pflasterarbeiten, Asphaltierung, Randsteine, Zäune und Flächenvorbereitung.",
      },
      {
        title: "Straßen und Wege",
        text: "Bau, Gestaltung und Sanierung von Straßen, Wegen, Gehwegen und kommunaler Infrastruktur mit sorgfältiger Vorbereitung des Untergrunds und präziser Ausführung.",
      },
    ],
  },
};

export default function Services({ lang }: ServicesProps) {
  const t = content[lang];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const collageOne = useHomepageImage("project-6", "/images/projects/project-06-poplocani-prilaz.webp");
  const collageTwo = useHomepageImage("project-5", "/images/projects/project-05-poplocano-dvoriste.webp");
  const collageThree = useHomepageImage("project-8", "/images/projects/project-08-metalna-ograda.webp");

  function toggleService(index: number) {
    setActiveIndex((current) => (current === index ? null : index));
  }

  return (
    <section id="services" className="services-section compact-services-section">
      <div className="services-collage" aria-hidden="true">
        <img src={collageOne} alt="" />
        <img src={collageTwo} alt="" />
        <img src={collageThree} alt="" />
      </div>
      <div className="section-head compact-services-head services-intro">
        <p className="section-kicker">{t.kicker}</p>
        <h2>{t.title}</h2>
        <p>{t.intro}</p>
      </div>

      <div className="services-grid compact-services-grid">
        {t.items.map((item, index) => {
          const Icon = serviceIcons[index];

          return (
            <article
              className={`service-card compact-service-card ${
                activeIndex === index ? "is-open" : ""
              }`}
              key={item.title}
            >
              <button
                type="button"
                className="compact-service-button"
                onClick={() => toggleService(index)}
                aria-expanded={activeIndex === index}
              >
                <div className="service-icon compact-service-icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={2.15} />
                </div>

                <div className="compact-service-title-wrap">
                  <h3>{item.title}</h3>
                  <span>{t.tapText}</span>
                </div>
              </button>

              <div className="compact-service-description">
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}












