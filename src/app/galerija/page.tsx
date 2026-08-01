"use client";

import { useEffect, useState } from "react";
import { Images, Mail, MessageCircle, Phone, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GalleryProject, getGalleryProjects } from "@/lib/gallery-db";
import type { Lang } from "@/lib/language";

const LANGUAGE_KEY = "juskograd-language";
const galleryCopy = {
  bs: { kicker: "JUSKO GRAD / PROJEKTI", title: "Galerija radova", subtitle: "Fotografije projekata, gradilišta i završenih radova.", completed: "IZVEDENI RADOVI", oneProject: "objavljen projekt", projects: "objavljenih projekata", onePhoto: "fotografija", photos: "fotografije", emptyTitle: "Galerija je trenutno prazna", emptyText: "Novi projekti bit će objavljeni uskoro.", galleryLabel: "Galerija projekata", close: "Zatvori", previous: "Prethodna", next: "Sljedeća", project: "PROJEKT", description: "OPIS", contact: "ZANIMA VAS SLIČAN PROJEKT?", call: "Pozovite nas", email: "Pošaljite e-mail", inquiry: "Pošaljite upit" },
  sl: { kicker: "JUSKO GRAD / PROJEKTI", title: "Galerija del", subtitle: "Fotografije projektov, gradbišč in zaključenih del.", completed: "IZVEDENA DELA", oneProject: "objavljen projekt", projects: "objavljeni projekti", onePhoto: "fotografija", photos: "fotografije", emptyTitle: "Galerija je trenutno prazna", emptyText: "Novi projekti bodo objavljeni kmalu.", galleryLabel: "Galerija projektov", close: "Zapri", previous: "Prejšnja", next: "Naslednja", project: "PROJEKT", description: "OPIS", contact: "VAS ZANIMA PODOBEN PROJEKT?", call: "Pokličite nas", email: "Pošljite e-pošto", inquiry: "Pošljite povpraševanje" },
  de: { kicker: "JUSKO GRAD / PROJEKTE", title: "Projektgalerie", subtitle: "Fotos von Projekten, Baustellen und abgeschlossenen Arbeiten.", completed: "AUSGEFÜHRTE ARBEITEN", oneProject: "veröffentlichtes Projekt", projects: "veröffentlichte Projekte", onePhoto: "Foto", photos: "Fotos", emptyTitle: "Die Galerie ist derzeit leer", emptyText: "Neue Projekte werden demnächst veröffentlicht.", galleryLabel: "Projektgalerie", close: "Schließen", previous: "Zurück", next: "Weiter", project: "PROJEKT", description: "BESCHREIBUNG", contact: "INTERESSE AN EINEM ÄHNLICHEN PROJEKT?", call: "Rufen Sie uns an", email: "E-Mail senden", inquiry: "Anfrage senden" },
} satisfies Record<Lang, Record<string, string>>;

export default function GalleryPage() {
  const [lang, setLangState] = useState<Lang>("sl");
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const t = galleryCopy[lang];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage === "bs" || savedLanguage === "sl" || savedLanguage === "de") setLangState(savedLanguage);

    getGalleryProjects().then(setProjects).catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = "hidden";
    document.body.classList.add("project-viewer-open");
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedProject(null);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("project-viewer-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);

  function setLang(nextLang: Lang) {
    setLangState(nextLang);
    window.localStorage.setItem(LANGUAGE_KEY, nextLang);
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main className="upload-gallery-page public-gallery-page">
        <section className="upload-gallery-hero">
          <p className="section-kicker">{t.kicker}</p>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </section>

        <section className="upload-gallery-content" aria-label={t.galleryLabel}>
          <div className="public-gallery-intro"><span>{t.completed}</span><p>{projects.length} {projects.length === 1 ? t.oneProject : t.projects}</p></div>

          {projects.length ? (
            <div className="public-project-grid">
              {projects.map((project) => (
                <article className="public-project-card" key={project.id}>
                  <button type="button" onClick={() => { setSelectedProject(project); setSelectedImage(0); }}>
                    <img src={project.images[0].url} alt={project.title} />
                    <span>{project.images.length} {project.images.length === 1 ? t.onePhoto : t.photos}</span>
                  </button>
                  <div><h2>{project.title}</h2><p>{project.description}</p></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="gallery-empty-state public-gallery-empty">
              <span className="public-gallery-empty-icon"><Images size={36} /></span>
              <h2>{t.emptyTitle}</h2>
              <p>{t.emptyText}</p>
            </div>
          )}
        </section>
      </main>
      <Footer lang={lang} />

      {selectedProject && (
        <div className="project-viewer" role="dialog" aria-modal="true" onClick={() => setSelectedProject(null)}>
          <button className="project-viewer-close" type="button" aria-label={t.close}><X size={24} /></button>
          <div className="project-viewer-panel" onClick={(event) => event.stopPropagation()}>
            <div className="project-viewer-image"><img src={selectedProject.images[selectedImage].url} alt={selectedProject.title} /></div>
            <div className="project-viewer-info">
              <div className="project-viewer-copy"><span className="project-viewer-eyebrow">{t.project}</span><h2>{selectedProject.title}</h2><div className="project-viewer-description"><strong>{t.description}</strong><p>{selectedProject.description}</p></div></div>
              <div className="project-viewer-contact"><strong>{t.contact}</strong><div><a href="tel:+38670749086" aria-label={t.call} title={t.call}><Phone size={18} /></a><a href="mailto:info@juskograd.com" aria-label={t.email} title={t.email}><Mail size={18} /></a><a href="/#contact" aria-label={t.inquiry} title={t.inquiry}><MessageCircle size={18} /></a></div></div>
              <span className="project-viewer-count">{selectedImage + 1} / {selectedProject.images.length}</span>
            </div>
          </div>
          {selectedProject.images.length > 1 && <>
            <button className="project-viewer-arrow left" type="button" aria-label={t.previous} onClick={(event) => { event.stopPropagation(); setSelectedImage((selectedImage - 1 + selectedProject.images.length) % selectedProject.images.length); }}>‹</button>
            <button className="project-viewer-arrow right" type="button" aria-label={t.next} onClick={(event) => { event.stopPropagation(); setSelectedImage((selectedImage + 1) % selectedProject.images.length); }}>›</button>
          </>}
        </div>
      )}
    </>
  );
}
