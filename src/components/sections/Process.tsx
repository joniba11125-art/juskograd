"use client";

import { MessageCircle, SearchCheck, FileText, Pickaxe, CircleCheck, PhoneCall, MapPinned, Construction } from "lucide-react";
import { Lang } from "@/lib/language";

type ProcessProps = {
  lang: Lang;
};

const icons = {
  chat: MessageCircle,
  survey: SearchCheck,
  document: FileText,
  work: Pickaxe,
  check: CircleCheck,
};

const content = {
  bs: {
    kicker: "PROCES RADA",
    title: "Kako ide saradnja?",
    steps: [
      {
        icon: "chat",
        title: "Upit",
        text: "Pošaljete osnovne informacije o tome šta trebate, gdje se objekat nalazi i kakav obim radova očekujete.",
      },
      {
        icon: "survey",
        title: "Pregled terena",
        text: "Ako je potrebno, lokacija se pregleda uživo. Tako se lakše procjenjuju pristup, teren i postojeće stanje.",
      },
      {
        icon: "document",
        title: "Ponuda",
        text: "Na osnovu dogovora priprema se ponuda i pojašnjava šta je uključeno u izvedbu.",
      },
      {
        icon: "work",
        title: "Izvedba",
        text: "Radovi se izvode odgovarajućom građevinskom mehanizacijom, ekipom i dogovorenim redoslijedom.",
      },
      {
        icon: "check",
        title: "Završetak",
        text: "Po završetku se pregledaju detalji, površine i funkcionalnost izvedenog posla.",
      },
    ],
    fieldSteps: [
      {
        type: "phone",
        title: "Kontakt",
        text: "Pošaljete upit i osnovne informacije o radovima.",
      },
      {
        type: "survey",
        title: "Pregled",
        text: "Procijeni se teren, pristup i najbolji način izvedbe.",
      },
      {
        type: "work",
        title: "Izvedba",
        text: "Radovi se izvode dogovorenim redoslijedom.",
      },
    ],
  },

  sl: {
    kicker: "POTEK DELA",
    title: "Kako poteka sodelovanje?",
    steps: [
      {
        icon: "chat",
        title: "Povpraševanje",
        text: "Pošljete osnovne informacije o tem, kaj potrebujete, kje se objekt nahaja in kakšen obseg del pričakujete.",
      },
      {
        icon: "survey",
        title: "Ogled terena",
        text: "Če je potrebno, si lokacijo ogledamo na terenu. Tako se lažje oceni dostop, teren in obstoječe stanje.",
      },
      {
        icon: "document",
        title: "Ponudba",
        text: "Na podlagi dogovora pripravimo ponudbo in pojasnimo, kaj je vključeno v izvedbo.",
      },
      {
        icon: "work",
        title: "Izvedba",
        text: "Dela izvedemo z ustrezno gradbeno mehanizacijo, ekipo in dogovorjenim zaporedjem.",
      },
      {
        icon: "check",
        title: "Zaključek",
        text: "Po končani izvedbi se preverijo detajli, površine in funkcionalnost opravljenega dela.",
      },
    ],
    fieldSteps: [
      {
        type: "phone",
        title: "Kontakt",
        text: "Pošljete povpraševanje in osnovne informacije o delih.",
      },
      {
        type: "survey",
        title: "Ogled",
        text: "Oceni se teren, dostop in najboljši način izvedbe.",
      },
      {
        type: "work",
        title: "Izvedba",
        text: "Dela se izvedejo po dogovorjenem zaporedju.",
      },
    ],
  },

  de: {
    kicker: "ABLAUF",
    title: "Wie läuft die Zusammenarbeit ab?",
    steps: [
      {
        icon: "chat",
        title: "Anfrage",
        text: "Sie senden grundlegende Informationen darüber, was benötigt wird, wo sich das Objekt befindet und welcher Arbeitsumfang geplant ist.",
      },
      {
        icon: "survey",
        title: "Besichtigung",
        text: "Bei Bedarf wird die Situation vor Ort geprüft. So lassen sich Zugang, Gelände und bestehender Zustand besser einschätzen.",
      },
      {
        icon: "document",
        title: "Angebot",
        text: "Auf Basis der Absprache wird ein Angebot erstellt und erklärt, welche Arbeiten enthalten sind.",
      },
      {
        icon: "work",
        title: "Ausführung",
        text: "Die Arbeiten werden mit geeigneten Baumaschinen, einem passenden Team und einem abgestimmten Ablauf durchgeführt.",
      },
      {
        icon: "check",
        title: "Abschluss",
        text: "Nach der Ausführung werden Details, Flächen und Funktionalität der erledigten Arbeiten geprüft.",
      },
    ],
    fieldSteps: [
      {
        type: "phone",
        title: "Kontakt",
        text: "Sie senden eine Anfrage mit den wichtigsten Projektdaten.",
      },
      {
        type: "survey",
        title: "Besichtigung",
        text: "Gelände, Zugang und Ausführung werden vor Ort geprüft.",
      },
      {
        type: "work",
        title: "Ausführung",
        text: "Die Arbeiten werden nach Absprache durchgeführt.",
      },
    ],
  },
};

function PhoneAnimation() {
  return (
    <PhoneCall
      className="field-motion-icon field-motion-phone"
      size={31}
      strokeWidth={2.35}
      aria-hidden="true"
    />
  );
}

function SurveyAnimation() {
  return (
    <MapPinned
      className="field-motion-icon field-motion-survey"
      size={31}
      strokeWidth={2.35}
      aria-hidden="true"
    />
  );
}

function WorkAnimation() {
  return (
    <Construction
      className="field-motion-icon field-motion-work"
      size={31}
      strokeWidth={2.35}
      aria-hidden="true"
    />
  );
}

function FieldAnimation({ type }: { type: string }) {
  if (type === "phone") return <PhoneAnimation />;
  if (type === "survey") return <SurveyAnimation />;
  return <WorkAnimation />;
}

export default function Process({ lang }: ProcessProps) {
  const t = content[lang];

  return (
    <section className="process-section">
      <div className="process-inner">
        <div className="process-head">
          <div>
            <p className="section-kicker">{t.kicker}</p>
            <h2>{t.title}</h2>
          </div>
        </div>

        <div className="process-steps">
          {t.steps.map((step) => {
            const Icon = icons[step.icon as keyof typeof icons];

            return (
              <article className="process-step" key={step.title}>
                <div className="process-step-icon" aria-hidden="true">
                  <Icon strokeWidth={2.1} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>

        <div className="process-field-grid">
          {t.fieldSteps.map((item, index) => (
            <article className="process-field-card" key={item.title}>
              <div className="process-field-visual">
                <FieldAnimation type={item.type} />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              <div className="process-field-marker">
                <span>{index + 1}.</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}









