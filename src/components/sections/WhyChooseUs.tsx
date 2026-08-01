"use client";

import { CheckCircle, MapPinned, HardHat, CalendarDays, Construction } from "lucide-react";
import { Lang } from "@/lib/language";
import { useHomepageImage } from "@/lib/homepage-media";

type WhyChooseUsProps = {
  lang: Lang;
};

const content = {
  bs: {
    kicker: "ZAŠTO JUSKO GRAD",
    title: "Radovi se lakše dogovaraju kad je proces jasan.",
    intro:
      "Kod terenskih radova nije dovoljno samo doći i početi kopati. Bitni su dogovor, pregled situacije, dobra priprema i izvedba koja ima smisla za teren.",
    badge: "Od 2018.",
    badgeText: "iskustvo na terenu",
    items: [
      {
        icon: CheckCircle,
        title: "Jasan dogovor prije početka",
        text: "Prije radova se definiše obim posla, pristup terenu i način izvedbe.",
      },
      {
        icon: MapPinned,
        title: "Pregled lokacije po potrebi",
        text: "Teren se po potrebi pregleda na lokaciji kako bi ponuda bila realna, a izvedba bolje planirana.",
      },
      {
        icon: HardHat,
        title: "Ekipa i mehanizacija za teren",
        text: "Radovi se izvode opremom i ekipom prilagođenom konkretnom poslu.",
      },
      {
        icon: Construction,
        title: "Niskogradnja i vanjska uređenja",
        text: "Iskopi, priključci, kanalizacija, vodovod, dvorišta, potporni zidovi, ceste i ulice.",
      },
    ],
  },

  sl: {
    kicker: "ZAKAJ JUSKO GRAD",
    title: "Dela so enostavnejša, ko je dogovor jasen.",
    intro:
      "Pri terenskih delih ni dovolj le priti in začeti z izkopom. Pomembni so dogovor, pregled situacije, dobra priprava in izvedba, ki je smiselna za teren.",
    badge: "Od 2018",
    badgeText: "izkušnje na terenu",
    items: [
      {
        icon: CheckCircle,
        title: "Jasen dogovor pred začetkom",
        text: "Pred delom se določi obseg, dostop do terena in način izvedbe.",
      },
      {
        icon: MapPinned,
        title: "Ogled lokacije po potrebi",
        text: "Teren se lahko pregleda na lokaciji, da je ponudba realna in izvedba bolje načrtovana.",
      },
      {
        icon: HardHat,
        title: "Ekipa in mehanizacija za teren",
        text: "Dela se izvajajo z opremo in ekipo, prilagojeno konkretnemu projektu.",
      },
      {
        icon: Construction,
        title: "Nizka gradnja in zunanje ureditve",
        text: "Izkopi, priključki, kanalizacija, vodovod, dvorišča, podporni zidovi, ceste in ulice.",
      },
    ],
  },

  de: {
    kicker: "WARUM JUSKO GRAD",
    title: "Bauarbeiten laufen besser, wenn der Ablauf klar ist.",
    intro:
      "Bei Arbeiten vor Ort reicht es nicht, einfach zu beginnen. Wichtig sind Absprache, Besichtigung, gute Vorbereitung und eine Ausführung, die zum Gelände passt.",
    badge: "Seit 2018",
    badgeText: "Erfahrung vor Ort",
    items: [
      {
        icon: CheckCircle,
        title: "Klare Absprache vor Beginn",
        text: "Vor den Arbeiten werden Umfang, Zugang zum Gelände und Ablauf der Ausführung geklärt.",
      },
      {
        icon: MapPinned,
        title: "Besichtigung bei Bedarf",
        text: "Der Standort kann vor Ort geprüft werden, damit Angebot und Ablauf realistisch sind.",
      },
      {
        icon: HardHat,
        title: "Passendes Team und passende Maschinen",
        text: "Die Arbeiten werden mit passender Ausrüstung und einem eingespielten Team durchgeführt.",
      },
      {
        icon: Construction,
        title: "Tiefbau und Außenanlagen",
        text: "Erdarbeiten, Anschlüsse, Kanalisation, Wasserleitungen, Höfe, Stützmauern, Straßen und Wege.",
      },
    ],
  },
};

export default function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const t = content[lang];
  const imageOne = useHomepageImage("project-2", "/images/projects/project-02-kubota-bager.webp");
  const imageTwo = useHomepageImage("project-4", "/images/projects/project-04-narandzaste-cijevi.webp");
  const imageThree = useHomepageImage("project-6", "/images/projects/project-06-poplocani-prilaz.webp");

  return (
    <section className="why-section why-panel-section">
      <div className="why-collage-bg" aria-hidden="true">
        <img src={imageOne} alt="" />
        <img src={imageTwo} alt="" />
        <img src={imageThree} alt="" />
      </div>
      <div className="why-panel">
        <div className="why-panel-main">
          <p className="section-kicker">{t.kicker}</p>
          <h2>{t.title}</h2>
          <p>{t.intro}</p>

          <div className="why-badge">
            <strong>{t.badge}</strong>
            <span>{t.badgeText}</span>
          </div>
        </div>

        <div className="why-list">
          {t.items.map((item) => {
            const Icon = item.icon;

            return (
              <article className="why-list-item" key={item.title}>
                <div className="why-list-icon">
                  <Icon strokeWidth={2.1} />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}






