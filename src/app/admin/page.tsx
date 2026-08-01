"use client";

import { ChangeEvent, FormEvent, PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, ImagePlus, Images, Trash2, X } from "lucide-react";
import { deleteGalleryProject, GalleryProject, getGalleryProjects, saveGalleryProject } from "@/lib/gallery-db";
import { getHomepageImage, homepageImageSlots, setHomepageImage } from "@/lib/homepage-media";
import { supabase } from "@/lib/supabase";

const MAX_FILE_SIZE = 12 * 1024 * 1024;
const CROP_RATIO = 4 / 3;

async function cropToFourThree(file: File, zoom = 1, offsetX = 0, offsetY = 0, viewportWidth = 800, viewportHeight = 600) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.max(viewportWidth / bitmap.width, viewportHeight / bitmap.height) * zoom;
  const sourceWidth = viewportWidth / scale;
  const sourceHeight = viewportHeight / scale;
  const sourceX = Math.max(0, Math.min(bitmap.width - sourceWidth, (bitmap.width - sourceWidth) / 2 - offsetX / scale));
  const sourceY = Math.max(0, Math.min(bitmap.height - sourceHeight, (bitmap.height - sourceHeight) / 2 - offsetY / scale));
  const targetWidth = Math.min(1600, Math.floor(sourceWidth));
  const targetHeight = Math.round(targetWidth / CROP_RATIO);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas nije dostupan");
  context.drawImage(bitmap, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => result ? resolve(result) : reject(new Error("Obrada slike nije uspjela")), "image/webp", 0.9);
  });
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
}

function CropEditor({ file, index, total, onCancel, onConfirm }: { file: File; index: number; total: number; onCancel: () => void; onConfirm: (file: File) => void }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [imageRatio, setImageRatio] = useState(CROP_RATIO);
  const [saving, setSaving] = useState(false);
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: offset.x, y: offset.y, startX: event.clientX, startY: event.clientY };
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const frame = frameRef.current;
    if (!frame) return;
    const baseWidth = imageRatio > CROP_RATIO ? frame.clientHeight * imageRatio : frame.clientWidth;
    const baseHeight = imageRatio > CROP_RATIO ? frame.clientHeight : frame.clientWidth / imageRatio;
    const maxX = Math.max(0, (baseWidth * zoom - frame.clientWidth) / 2);
    const maxY = Math.max(0, (baseHeight * zoom - frame.clientHeight) / 2);
    const nextX = dragRef.current.x + event.clientX - dragRef.current.startX;
    const nextY = dragRef.current.y + event.clientY - dragRef.current.startY;
    setOffset({ x: Math.max(-maxX, Math.min(maxX, nextX)), y: Math.max(-maxY, Math.min(maxY, nextY)) });
  }
  async function confirm() {
    const frame = frameRef.current;
    if (!frame) return;
    setSaving(true);
    const result = await cropToFourThree(file, zoom, offset.x, offset.y, frame.clientWidth, frame.clientHeight);
    onConfirm(result);
  }

  return <div className="admin-crop-overlay" role="dialog" aria-modal="true" aria-label="Obrezivanje slike">
    <div className="admin-crop-modal">
      <div className="admin-crop-heading"><div><span>SLIKA {index + 1} / {total}</span><h2>Odaberi dio slike</h2><p>Povuci sliku prstom ili mišem i podesi zumiranje.</p></div><button type="button" onClick={onCancel} aria-label="Odustani"><X /></button></div>
      <div className="admin-crop-frame" ref={frameRef} onPointerDown={pointerDown} onPointerMove={pointerMove}>
        <img src={url} alt="Slika za obrezivanje" draggable={false} onLoad={(event) => setImageRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)} className={imageRatio > CROP_RATIO ? "wide" : "tall"} style={{ transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }} />
        <div className="admin-crop-grid" />
      </div>
      <label className="admin-crop-zoom"><span>Zumiranje</span><input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /><strong>{Math.round(zoom * 100)}%</strong></label>
      <div className="admin-crop-actions"><button type="button" onClick={onCancel}>Odustani</button><button type="button" onClick={() => void confirm()} disabled={saving}><Check size={18} /> {saving ? "Obrađujem..." : "Potvrdi kadar"}</button></div>
    </div>
  </div>;
}

export default function AdminPage() {
  const [authLoading, setAuthLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropQueue, setCropQueue] = useState<File[]>([]);
  const [cropIndex, setCropIndex] = useState(0);
  const [cropResults, setCropResults] = useState<File[]>([]);
  const [homepageCropSlot, setHomepageCropSlot] = useState<string | null>(null);
  const [homepagePreviews, setHomepagePreviews] = useState<Record<string, string>>(
    Object.fromEntries(homepageImageSlots.map((slot) => [slot.id, slot.defaultSrc])),
  );

  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files]);

  useEffect(() => {
    async function checkAdmin() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { setAdminEmail(""); setAuthLoading(false); return; }
      const { data } = await supabase.from("admin_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();
      setAdminEmail(data ? (userData.user.email ?? "Administrator") : "");
      if (!data) setAuthError("Ovaj korisnik nema administratorski pristup.");
      setAuthLoading(false);
    }
    void checkAdmin();
    const { data: listener } = supabase.auth.onAuthStateChange(() => void checkAdmin());
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!adminEmail) return;
    getGalleryProjects().then(setProjects).catch(() => setStatus("Sadržaj nije moguće učitati."));
    homepageImageSlots.forEach((slot) => {
      getHomepageImage(slot.id).then((url) => {
        if (url) setHomepagePreviews((current) => ({ ...current, [slot.id]: url }));
      });
    });
  }, [adminEmail]);

  useEffect(() => () => previews.forEach((preview) => URL.revokeObjectURL(preview.url)), [previews]);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const originalCount = event.target.files?.length ?? 0;
    const selected = Array.from(event.target.files ?? []).filter(
      (file) => file.type.startsWith("image/") && file.size <= MAX_FILE_SIZE,
    );
    event.target.value = "";
    if (!selected.length) {
      setStatus("Odaberite slike veličine do 12 MB.");
      return;
    }

    setIsCropping(true);
    setCropQueue(selected.slice(0, Math.max(0, 12 - files.length)));
    setCropIndex(0);
    setCropResults([]);
    setHomepageCropSlot(null);
    setStatus("Podesite kadar za svaku odabranu sliku.");
    if (selected.length !== originalCount) setStatus("Neke slike su preskočene. Maksimalna veličina je 12 MB.");
  }

  async function publishProject(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !files.length) {
      setStatus("Unesite naziv, opis i najmanje jednu sliku.");
      return;
    }

    setIsSaving(true);
    try {
      const project = await saveGalleryProject({ title: title.trim(), description: description.trim(), files });
      setProjects((current) => [project, ...current]);
      setTitle("");
      setDescription("");
      setFiles([]);
      setStatus("Projekt je objavljen u galeriji.");
    } catch {
      setStatus("Projekt nije spremljen. Provjerite Supabase postavke i pokušajte ponovo.");
    } finally {
      setIsSaving(false);
    }
  }

  async function removeProject(project: GalleryProject) {
    if (!window.confirm(`Obrisati projekt „${project.title}“?`)) return;
    await deleteGalleryProject(project);
    setProjects((current) => current.filter((item) => item.id !== project.id));
    setStatus("Projekt je obrisan.");
  }

  async function replaceHomepageImage(slotId: string, file?: File) {
    if (!file || !file.type.startsWith("image/") || file.size > MAX_FILE_SIZE) {
      setStatus("Odaberite sliku veličine do 12 MB.");
      return;
    }
    setIsCropping(true);
    setCropQueue([file]);
    setCropIndex(0);
    setCropResults([]);
    setHomepageCropSlot(slotId);
    setStatus("Podesite kadar nove slike.");
  }

  async function confirmCrop(cropped: File) {
    if (homepageCropSlot) {
      const url = await setHomepageImage(homepageCropSlot, cropped);
      if (url) setHomepagePreviews((current) => ({ ...current, [homepageCropSlot]: url }));
      setCropQueue([]); setHomepageCropSlot(null); setIsCropping(false);
      setStatus("Slika na naslovnoj stranici je zamijenjena.");
      return;
    }
    const results = [...cropResults, cropped];
    if (cropIndex < cropQueue.length - 1) {
      setCropResults(results);
      setCropIndex((current) => current + 1);
    } else {
      setFiles((current) => [...current, ...results].slice(0, 12));
      setCropQueue([]); setCropResults([]); setCropIndex(0); setIsCropping(false);
      setStatus(`${results.length} ${results.length === 1 ? "slika je pripremljena" : "slike su pripremljene"} u formatu 4:3.`);
    }
  }

  function cancelCrop() {
    setCropQueue([]); setCropResults([]); setCropIndex(0); setHomepageCropSlot(null); setIsCropping(false);
    setStatus("Obrezivanje je otkazano.");
  }

  async function resetHomepageImage(slotId: string, defaultSrc: string) {
    await setHomepageImage(slotId, null);
    setHomepagePreviews((current) => ({ ...current, [slotId]: defaultSrc }));
    setStatus("Vraćena je originalna slika.");
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setAuthError("Pogrešan email ili lozinka."); setAuthLoading(false); }
  }

  if (authLoading) return <main className="admin-login-page"><div className="admin-login-card"><p>Učitavanje administracije...</p></div></main>;
  if (!adminEmail) return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={login}>
        <img src="/images/logo/juskograd-logo.png" alt="JUSKO GRAD" />
        <span>ZAŠTIĆENA ADMINISTRACIJA</span>
        <h1>Prijava</h1>
        <label className="admin-field"><span>Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label className="admin-field"><span>Lozinka</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {authError && <p className="admin-status">{authError}</p>}
        <button className="admin-publish-button" type="submit">Prijavi se</button>
        <a href="/">← Povratak na stranicu</a>
      </form>
    </main>
  );

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">
          <img src="/images/logo/juskograd-logo.png" alt="JUSKO GRAD" />
        </a>
        <div className="admin-nav-label">UPRAVLJANJE</div>
        <nav>
          <a className="active" href="/admin"><Images size={19} /> Galerija</a>
          <a href="/galerija"><ArrowLeft size={19} /> Javna galerija</a>
        </nav>
        <button className="admin-local-badge" type="button" onClick={() => void supabase.auth.signOut()}>Odjava · {adminEmail}</button>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <span>JUSKO GRAD CMS</span>
            <h1>Upravljanje galerijom</h1>
            <p>Dodajte novi projekt koji će se prikazati na javnoj stranici.</p>
          </div>
          <a href="/galerija">Pogledaj galeriju ↗</a>
        </header>

        <div className="admin-layout-grid">
          <form className="admin-form-card" onSubmit={publishProject}>
            <div className="admin-card-heading">
              <span>01</span>
              <div><h2>Novi projekt</h2><p>Unesite osnovne podatke i fotografije.</p></div>
            </div>

            <label className="admin-field">
              <span>Naziv projekta</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Npr. Vanjsko uređenje — Ljubljana" maxLength={100} />
            </label>

            <label className="admin-field">
              <span>Opis</span>
              <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Kratko opišite izvedene radove..." rows={6} maxLength={600} />
              <small>{description.length} / 600</small>
            </label>

            <label className="admin-image-picker">
              <input type="file" accept="image/*" multiple onChange={(event) => void handleFiles(event)} disabled={isCropping} />
              <ImagePlus size={28} />
              <strong>{isCropping ? "Obrezujem slike..." : "Odaberi slike"}</strong>
              <span>Sve slike se automatski obrezuju na 4:3 · do 12 slika</span>
            </label>

            {previews.length > 0 && (
              <div className="admin-preview-grid">
                {previews.map((preview, index) => (
                  <div key={`${preview.file.name}-${index}`}>
                    <img src={preview.url} alt="Pregled odabrane slike" />
                    <button type="button" aria-label="Ukloni sliku" onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))}><X size={15} /></button>
                  </div>
                ))}
              </div>
            )}

            {status && <p className="admin-status" role="status">{status}</p>}

            <button className="admin-publish-button" type="submit" disabled={isSaving || isCropping}>
              <Check size={19} /> {isSaving ? "Objavljujem..." : "Objavi projekt"}
            </button>
          </form>

          <section className="admin-projects-card">
            <div className="admin-card-heading">
              <span>02</span>
              <div><h2>Objavljeni projekti</h2><p>{projects.length} {projects.length === 1 ? "projekt" : "projekata"} u galeriji</p></div>
            </div>

            {projects.length ? (
              <div className="admin-project-list">
                {projects.map((project) => (
                    <article key={project.id}>
                      <img src={project.images[0].url} alt="" />
                      <div><strong>{project.title}</strong><span>{project.images.length} {project.images.length === 1 ? "slika" : "slika"}</span></div>
                      <button type="button" onClick={() => void removeProject(project)} aria-label={`Obriši ${project.title}`}><Trash2 size={17} /></button>
                    </article>
                ))}
              </div>
            ) : (
              <div className="admin-empty-projects"><Images size={30} /><strong>Nema objavljenih projekata</strong><span>Prvi projekt će se pojaviti ovdje.</span></div>
            )}
          </section>
        </div>

        <section className="admin-homepage-media" id="naslovna">
          <div className="admin-card-heading">
            <span>03</span>
            <div><h2>Slike naslovne stranice</h2><p>Zamijenite bilo koju glavnu fotografiju. Sve nove slike automatski se obrezuju na 4:3.</p></div>
          </div>
          <div className="admin-media-grid">
            {homepageImageSlots.map((slot) => (
              <article key={slot.id}>
                <img src={homepagePreviews[slot.id]} alt={slot.label} />
                <div>
                  <span className="admin-media-section">SEKCIJA: {slot.section}</span>
                  <strong>{slot.label}</strong>
                  <small>Koristi se u: {slot.usage}</small>
                  <label>
                    Zamijeni sliku
                    <input type="file" accept="image/*" onChange={(event) => { void replaceHomepageImage(slot.id, event.target.files?.[0]); event.target.value = ""; }} />
                  </label>
                  <button type="button" onClick={() => void resetHomepageImage(slot.id, slot.defaultSrc)}>Vrati original</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
      {cropQueue.length > 0 && <CropEditor key={`${cropIndex}-${cropQueue[cropIndex].name}`} file={cropQueue[cropIndex]} index={cropIndex} total={cropQueue.length} onCancel={cancelCrop} onConfirm={(file) => void confirmCrop(file)} />}
    </main>
  );
}
