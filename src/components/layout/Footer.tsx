"use client";

import Image from "next/image";
import { Lang } from "@/lib/language";

type FooterProps = {
  lang: Lang;
};

const content = {
  bs: {
    text: "GP JUSKO GRAD, gradbeništvo d.o.o. je firma iz Borovnice koja izvodi niskogradnju, vanjska uređenja, kanalizacijske i vodovodne priključke, radove građevinskom mehanizacijom te uređenje cesta i ulica.",
    linksTitle: "Navigacija",
    contactTitle: "Kontakt",
    ctaTitle: "Trebate izvedbu na terenu?",
    ctaText: "Pošaljite upit i dogovorimo sljedeći korak.",
    ctaButton: "Pošalji upit",
    nav: [
      ["O firmi", "#about"],
      ["Usluge", "#services"],
      ["Reference", "#references"],
      ["Kontakt", "#contact"],
    ],
    copyright: "Sva prava zadržana.",
  },
  sl: {
    text: "GP JUSKO GRAD, gradbeništvo d.o.o. je podjetje iz Borovnice, ki izvaja nizkogradbena dela, zunanje ureditve, kanalizacijske in vodovodne priključke, dela z gradbeno mehanizacijo ter urejanje cest in ulic.",
    linksTitle: "Navigacija",
    contactTitle: "Kontakt",
    ctaTitle: "Potrebujete izvedbo na terenu?",
    ctaText: "Pošljite povpraševanje in dogovorimo se za naslednji korak.",
    ctaButton: "Pošlji povpraševanje",
    nav: [
      ["O podjetju", "#about"],
      ["Storitve", "#services"],
      ["Reference", "#references"],
      ["Kontakt", "#contact"],
    ],
    copyright: "Vse pravice pridržane.",
  },
  de: {
    text: "GP JUSKO GRAD, gradbeništvo d.o.o. ist ein Bauunternehmen aus Borovnica für Tiefbauarbeiten, Außenanlagen, Kanal- und Wasseranschlüsse, Baumaschineneinsatz sowie Straßen- und Wegebau.",
    linksTitle: "Navigation",
    contactTitle: "Kontakt",
    ctaTitle: "Benötigen Sie Bauarbeiten vor Ort?",
    ctaText: "Senden Sie eine Anfrage, und wir besprechen den nächsten Schritt.",
    ctaButton: "Anfrage senden",
    nav: [
      ["Über uns", "#about"],
      ["Leistungen", "#services"],
      ["Referenzen", "#references"],
      ["Kontakt", "#contact"],
    ],
    copyright: "Alle Rechte vorbehalten.",
  },
};

export default function Footer({ lang }: FooterProps) {
  const t = content[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div>
          <p className="section-kicker">{t.ctaTitle}</p>
          <h2>{t.ctaText}</h2>
        </div>

        <a href="#contact" className="footer-cta-button">
          {t.ctaButton}
        </a>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <Image
              src="/images/logo/juskograd-logo.png"
              alt="JUSKO GRAD logo"
              width={210}
              height={70}
            />
          </div>

          <p>{t.text}</p>
        </div>

        <div className="footer-column">
          <h3>{t.linksTitle}</h3>
          <nav>
            {t.nav.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-contact">
          <h3>{t.contactTitle}</h3>

          <a href="tel:+38670749086">070-749-086</a>
          <a href="mailto:info@juskograd.com">info@juskograd.com</a>
          <p>Ob Borovniščici 16<br />1353 Borovnica, Slovenija, EU</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} JUSKO GRAD. {t.copyright}</p>
      </div>
    </footer>
  );
}






