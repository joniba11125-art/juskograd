"use client";

import Image from "next/image";
import { Lang } from "@/lib/language";
import { useHomepageImage } from "@/lib/homepage-media";

type AboutProps = {
  lang: Lang;
};

const content = {
  bs: {
    kicker: "O FIRMI",
    title: "GP JUSKO GRAD izvodi radove iz oblasti niskogradnje i vanjskog uređenja.",
    paragraphs: [
      "GP JUSKO GRAD je građevinska firma iz Borovnice, osnovana 2018. godine. Firma izvodi prvenstveno niskogradnju, vanjska uređenja, iskope, kanalizacijske i vodovodne priključke te uređenje cesta, prilaza i dvorišnih površina.",
      "Kao manja ekipa, svakom projektu može se pristupiti direktnije i pažljivije. Prije početka radova važno je razumjeti teren, potrebe objekta i način na koji će se prostor koristiti.",
      "Cilj nije samo da se radovi završe, nego da izvedba bude funkcionalna, uredna i dugoročno korisna za klijenta.",
    ],
    imageKicker: "O FIRMI",
    imageTitle: "Manja ekipa, ozbiljan rad na terenu.",
  },

  sl: {
    kicker: "O PODJETJU",
    title: "GP JUSKO GRAD izvaja dela s področja nizke gradnje in zunanjih ureditev.",
    paragraphs: [
      "GP JUSKO GRAD je gradbeno podjetje iz Borovnice, ustanovljeno leta 2018. Podjetje izvaja predvsem nizko gradnjo, zunanje ureditve, izkope, kanalizacijske in vodovodne priključke ter urejanje cest, dovozov in dvoriščnih površin.",
      "Kot manjša ekipa se lahko vsakemu projektu pristopi bolj neposredno in natančno. Pred začetkom del je pomembno razumeti teren, potrebe objekta in način, kako se bo prostor uporabljal.",
      "Cilj ni le dokončati dela, ampak zagotoviti, da je izvedba funkcionalna, urejena in dolgoročno koristna za naročnika.",
    ],
    imageKicker: "O PODJETJU",
    imageTitle: "Manjša ekipa, resen pristop na terenu.",
  },

  de: {
    kicker: "ÜBER DAS UNTERNEHMEN",
    title: "GP JUSKO GRAD führt Arbeiten im Tiefbau und im Bereich Außenanlagen aus.",
    paragraphs: [
      "GP JUSKO GRAD ist ein Bauunternehmen aus Borovnica, gegründet im Jahr 2018. Das Unternehmen führt vor allem Tiefbauarbeiten, Außenanlagen, Erdarbeiten sowie Kanal- und Wasseranschlüsse aus und gestaltet Straßen, Zufahrten und Hofflächen.",
      "Als kleineres Team kann jedes Projekt direkter und sorgfältiger betreut werden. Vor Beginn der Arbeiten ist es wichtig, das Gelände, die Anforderungen des Objekts und die spätere Nutzung der Fläche zu verstehen.",
      "Ziel ist nicht nur, die Arbeiten abzuschließen, sondern eine funktionale, saubere und langfristig sinnvolle Ausführung zu liefern.",
    ],
    imageKicker: "ÜBER DAS UNTERNEHMEN",
    imageTitle: "Kleines Team, saubere Arbeit vor Ort.",
  },
};

export default function About({ lang }: AboutProps) {
  const t = content[lang];
  const aboutImage = useHomepageImage("project-3", "/images/projects/project-03-radovi-uz-cestu.webp");

  return (
    <section id="about" className="about-section about-split-section">
      <div className="about-split-wrap">
        <div className="about-copy">
          <p className="section-kicker">{t.kicker}</p>
          <h2>{t.title}</h2>

          <div className="about-copy-text">
            {t.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="about-visual-card">
          <div className="about-visual-image">
            <Image
              src={aboutImage}
              unoptimized={aboutImage.startsWith("blob:")}
              alt={t.imageTitle}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              priority={false}
            />
          </div>

          <div className="about-visual-overlay">
            <span>{t.imageKicker}</span>
            <h3>{t.imageTitle}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}





