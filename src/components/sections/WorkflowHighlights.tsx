"use client";

import { createElement } from "react";
import { Lang } from "@/lib/language";

type WorkflowHighlightsProps = {
  lang: Lang;
};

const content = {
  bs: {
    kicker: "NA TERENU",
    title: "Tri glavna koraka na terenu.",
    items: [
      {
        type: "contact",
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
    kicker: "NA TERENU",
    title: "Trije glavni koraki na terenu.",
    items: [
      {
        type: "contact",
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
    kicker: "VOR ORT",
    title: "Drei Hauptschritte vor Ort.",
    items: [
      {
        type: "contact",
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

function SurveyAnimation() {
  return (
    <div className="survey-scene" aria-hidden="true">
      <span className="survey-house">
        <span className="survey-roof" />
        <span className="survey-door" />
        <span className="survey-window survey-window-one" />
        <span className="survey-window survey-window-two" />
      </span>

      <span className="survey-person survey-person-one">
        <span className="survey-helmet" />
        <span className="survey-head" />
        <span className="survey-body" />
      </span>

      <span className="survey-person survey-person-two">
        <span className="survey-helmet" />
        <span className="survey-head" />
        <span className="survey-body" />
      </span>

      <span className="survey-ground-small" />
    </div>
  );
}

function WorkAnimation() {
  return (
    <div className="excavator-loop" aria-hidden="true">
      <span className="excavator-ground" />
      <span className="excavator-machine">
        <span className="excavator-track" />
        <span className="excavator-wheel excavator-wheel-one" />
        <span className="excavator-wheel excavator-wheel-two" />
        <span className="excavator-body" />
        <span className="excavator-cabin" />
        <span className="excavator-boom" />
        <span className="excavator-stick" />
        <span className="excavator-bucket" />
      </span>
    </div>
  );
}

function WorkflowVisual({ type }: { type: string }) {
  if (type === "contact") {
    return (
      createElement("lord-icon", {
        src: "https://cdn.lordicon.com/srsgifqc.json",
        trigger: "loop",
        delay: "1200",
        colors: "primary:#071d33,secondary:#1266a8",
        style: { width: "54px", height: "54px" },
      })
    );
  }

  if (type === "survey") {
    return <SurveyAnimation />;
  }

  return <WorkAnimation />;
}

export default function WorkflowHighlights({ lang }: WorkflowHighlightsProps) {
  const t = content[lang];

  return (
    <section className="workflow-highlights lord-workflow">
      <div className="workflow-inner">
        <div className="workflow-head compact-workflow-head">
          <div>
            <p className="section-kicker">{t.kicker}</p>
            <h2>{t.title}</h2>
          </div>
        </div>

        <div className="lord-workflow-grid">
          {t.items.map((item) => (
            <article className="lord-workflow-card" key={item.title}>
              <div className="lord-icon-box">
                <WorkflowVisual type={item.type} />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}





