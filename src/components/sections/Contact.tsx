"use client";

import { FormEvent, useState } from "react";
import { Lang } from "@/lib/language";

type ContactProps = {
  lang: Lang;
};

const content = {
  bs: {
    kicker: "KONTAKT",
    title: "Imate u planu iskop, priključak, dvorište ili drugi građevinski rad?",
    intro:
      "Pošaljite osnovne informacije o projektu i lokaciji. Ako je potrebno, dogovara se pregled terena kako bi se pripremila realna ponuda i najbolji način izvedbe.",
    formTitle: "Upit za radove",
    name: "Ime i prezime",
    phone: "Telefon",
    email: "E-mail",
    location: "Lokacija projekta",
    service: "Vrsta radova",
    message: "Kratak opis radova",
    button: "Pošalji upit",
    serviceOptions: [
      "Niskogradnja",
      "Kanalizacija",
      "Vodovod",
      "Iskopi",
      "Asfaltiranje",
      "Vanjsko uređenje",
      "Potporni zidovi",
      "Ostalo",
    ],
    directTitle: "Direktan kontakt",
    phoneLabel: "Telefon",
    emailLabel: "E-mail",
    addressLabel: "Adresa",
    mapTitle: "Lokacija firme",
  },

  sl: {
    kicker: "KONTAKT",
    title: "Imate v načrtu izkop, priključek, dvorišče ali drugo gradbeno delo?",
    intro:
      "Pošljite osnovne informacije o projektu in lokaciji. Če je potrebno, se dogovorimo za ogled terena, da lahko pripravimo realno ponudbo in predlagamo najboljši način izvedbe.",
    formTitle: "Povpraševanje za dela",
    name: "Ime in priimek",
    phone: "Telefon",
    email: "E-pošta",
    location: "Lokacija projekta",
    service: "Vrsta del",
    message: "Kratek opis del",
    button: "Pošlji povpraševanje",
    serviceOptions: [
      "Nizka gradnja",
      "Kanalizacija",
      "Vodovod",
      "Izkopi",
      "Asfaltiranje",
      "Zunanja ureditev",
      "Podporni zidovi",
      "Ostalo",
    ],
    directTitle: "Neposreden kontakt",
    phoneLabel: "Telefon",
    emailLabel: "E-pošta",
    addressLabel: "Naslov",
    mapTitle: "Lokacija podjetja",
  },

  de: {
    kicker: "KONTAKT",
    title: "Planen Sie Erdarbeiten, Anschlüsse, eine Zufahrt oder andere Bauarbeiten?",
    intro:
      "Senden Sie uns die wichtigsten Informationen zum Projekt und Standort. Bei Bedarf wird eine Besichtigung vor Ort vereinbart, damit ein realistisches Angebot und die passende Ausführung vorgeschlagen werden können.",
    formTitle: "Anfrage zu Bauarbeiten",
    name: "Vor- und Nachname",
    phone: "Telefon",
    email: "E-Mail",
    location: "Projektstandort",
    service: "Art der Arbeiten",
    message: "Kurze Beschreibung des Vorhabens",
    button: "Anfrage senden",
    serviceOptions: [
      "Tiefbau",
      "Kanalisation",
      "Wasserleitungen",
      "Erdarbeiten",
      "Asphaltierung",
      "Außenanlagen",
      "Stützmauern",
      "Sonstiges",
    ],
    directTitle: "Direkter Kontakt",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    addressLabel: "Adresse",
    mapTitle: "Firmenstandort",
  },
};

export default function Contact({ lang }: ContactProps) {
  const t = content[lang];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: t.serviceOptions[0],
    message: "",
  });

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const mailText = {
      bs: {
        subject: "Upit sa sajta",
        name: "Ime",
        phone: "Telefon",
        email: "E-mail",
        location: "Lokacija projekta",
        service: "Vrsta radova",
        description: "Opis",
      },
      sl: {
        subject: "Povpraševanje s spletne strani",
        name: "Ime",
        phone: "Telefon",
        email: "E-pošta",
        location: "Lokacija projekta",
        service: "Vrsta del",
        description: "Opis",
      },
      de: {
        subject: "Anfrage über die Webseite",
        name: "Name",
        phone: "Telefon",
        email: "E-Mail",
        location: "Projektstandort",
        service: "Art der Arbeiten",
        description: "Beschreibung",
      },
    };

    const m = mailText[lang];

    const subject = encodeURIComponent(`${m.subject} - ${form.service}`);

    const body = encodeURIComponent(
`${m.name}: ${form.name}
${m.phone}: ${form.phone}
${m.email}: ${form.email}
${m.location}: ${form.location}
${m.service}: ${form.service}

${m.description}:
${form.message}`
    );

    window.location.href = `mailto:info@juskograd.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-head">
          <div>
            <p className="section-kicker">{t.kicker}</p>
            <h2>{t.title}</h2>
          </div>
          <p>{t.intro}</p>
        </div>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>{t.formTitle}</h3>

            <div className="form-row">
              <label>
                <span>{t.name}</span>
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </label>

              <label>
                <span>{t.phone}</span>
                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                <span>{t.email}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </label>

              <label>
                <span>{t.location}</span>
                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </label>
            </div>

            <label>
              <span>{t.service}</span>
              <select
                value={form.service}
                onChange={(e) => updateField("service", e.target.value)}
              >
                {t.serviceOptions.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>{t.message}</span>
              <textarea
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={5}
                required
              />
            </label>

            <button type="submit">{t.button}</button>
          </form>

          <div className="contact-side">
            <div className="contact-card">
              <h3>{t.directTitle}</h3>

              <div className="contact-item">
                <span>{t.phoneLabel}</span>
                <a href="tel:+38670749086">070-749-086</a>
              </div>

              <div className="contact-item">
                <span>{t.emailLabel}</span>
                <a href="mailto:info@juskograd.com">info@juskograd.com</a>
              </div>

              <div className="contact-item">
                <span>{t.addressLabel}</span>
                <p>Ob Borovniščici 16<br />1353 Borovnica, Slovenija, EU</p>
              </div>
            </div>

            <div className="map-card">
              <div className="map-title">{t.mapTitle}</div>
              <iframe
                title="JUSKO GRAD lokacija"
                src="https://www.google.com/maps?q=Ob%20Borovni%C5%A1%C4%8Dici%2016%2C%201353%20Borovnica%2C%20Slovenija&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}









