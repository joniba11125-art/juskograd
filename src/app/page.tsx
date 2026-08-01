"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LanguagePopup from "@/components/layout/LanguagePopup";
import MobileContactBar from "@/components/layout/MobileContactBar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import References from "@/components/sections/References";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import WorkflowHighlights from "@/components/sections/WorkflowHighlights";
import WorksitesMini from "@/components/sections/WorksitesMini";
import type { Lang } from "@/lib/language";

const LANGUAGE_KEY = "juskograd-language";

export default function Home() {
  const [lang, setLang] = useState<Lang>("sl");
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);

    if (savedLanguage === "bs" || savedLanguage === "sl" || savedLanguage === "de") {
      setLang(savedLanguage);
      return;
    }

    setShowLanguagePopup(true);
  }, []);

  function selectLanguage(nextLanguage: Lang) {
    setLang(nextLanguage);
    window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    setShowLanguagePopup(false);
  }

  return (
    <>
      <ScrollProgress />
      <Header lang={lang} setLang={selectLanguage} />

      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <WorkflowHighlights lang={lang} />
        <Services lang={lang} />
        <Process lang={lang} />
        <WorksitesMini lang={lang} />
        <References lang={lang} />
        <WhyChooseUs lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
      <MobileContactBar lang={lang} />

      {showLanguagePopup && <LanguagePopup onSelect={selectLanguage} />}
    </>
  );
}
