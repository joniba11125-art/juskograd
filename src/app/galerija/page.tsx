"use client";

import { useEffect, useState } from "react";
import { Images, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GalleryProject, getGalleryProjects } from "@/lib/gallery-db";
import type { Lang } from "@/lib/language";

const LANGUAGE_KEY = "juskograd-language";

export default function GalleryPage() {
  const [lang, setLangState] = useState<Lang>("sl");
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage === "bs" || savedLanguage === "sl" || savedLanguage === "de") setLangState(savedLanguage);

    getGalleryProjects().then(setProjects).catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = "hidden";
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedProject(null);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
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
          <p className="section-kicker">JUSKO GRAD / PROJEKTI</p>
          <h1>Galerija radova</h1>
          <p>Fotografije projekata, gradilišta i završenih radova.</p>
        </section>

        <section className="upload-gallery-content" aria-label="Galerija projekata">
          <div className="public-gallery-intro"><span>IZVEDENI RADOVI</span><p>{projects.length} {projects.length === 1 ? "objavljen projekt" : "objavljenih projekata"}</p></div>

          {projects.length ? (
            <div className="public-project-grid">
              {projects.map((project) => (
                <article className="public-project-card" key={project.id}>
                  <button type="button" onClick={() => { setSelectedProject(project); setSelectedImage(0); }}>
                    <img src={project.images[0].url} alt={project.title} />
                    <span>{project.images.length} {project.images.length === 1 ? "fotografija" : "fotografija"}</span>
                  </button>
                  <div><h2>{project.title}</h2><p>{project.description}</p></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="gallery-empty-state public-gallery-empty">
              <span className="public-gallery-empty-icon"><Images size={36} /></span>
              <h2>Galerija je trenutno prazna</h2>
              <p>Novi projekti bit će objavljeni uskoro.</p>
            </div>
          )}
        </section>
      </main>
      <Footer lang={lang} />

      {selectedProject && (
        <div className="project-viewer" role="dialog" aria-modal="true" onClick={() => setSelectedProject(null)}>
          <button className="project-viewer-close" type="button" aria-label="Zatvori"><X size={24} /></button>
          <div className="project-viewer-panel" onClick={(event) => event.stopPropagation()}>
            <div className="project-viewer-image"><img src={selectedProject.images[selectedImage].url} alt={selectedProject.title} /></div>
            <div className="project-viewer-info"><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><span>{selectedImage + 1} / {selectedProject.images.length}</span></div>
          </div>
          {selectedProject.images.length > 1 && <>
            <button className="project-viewer-arrow left" type="button" aria-label="Prethodna" onClick={(event) => { event.stopPropagation(); setSelectedImage((selectedImage - 1 + selectedProject.images.length) % selectedProject.images.length); }}>‹</button>
            <button className="project-viewer-arrow right" type="button" aria-label="Sljedeća" onClick={(event) => { event.stopPropagation(); setSelectedImage((selectedImage + 1) % selectedProject.images.length); }}>›</button>
          </>}
        </div>
      )}
    </>
  );
}
