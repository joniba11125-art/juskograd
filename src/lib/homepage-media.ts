"use client";

import { useEffect, useState } from "react";

export const homepageImageSlots = [
  {
    id: "project-3",
    label: "Glavna slika o firmi",
    section: "O firmi",
    usage: "O firmi · Reference",
    defaultSrc: "/images/projects/project-03-radovi-uz-cestu.webp",
  },
  {
    id: "project-6",
    label: "Popločani prilaz",
    section: "Usluge",
    usage: "Usluge · Zašto JUSKO GRAD · Reference",
    defaultSrc: "/images/projects/project-06-poplocani-prilaz.webp",
  },
  {
    id: "project-5",
    label: "Popločano dvorište",
    section: "Usluge",
    usage: "Usluge · Reference",
    defaultSrc: "/images/projects/project-05-poplocano-dvoriste.webp",
  },
  {
    id: "project-8",
    label: "Metalna ograda",
    section: "Usluge",
    usage: "Usluge · Reference",
    defaultSrc: "/images/projects/project-08-metalna-ograda.webp",
  },
  {
    id: "project-2",
    label: "Građevinska mehanizacija",
    section: "Zašto JUSKO GRAD",
    usage: "Zašto JUSKO GRAD · Reference",
    defaultSrc: "/images/projects/project-02-kubota-bager.webp",
  },
  {
    id: "project-4",
    label: "Komunalni priključci",
    section: "Zašto JUSKO GRAD",
    usage: "Zašto JUSKO GRAD · Reference",
    defaultSrc: "/images/projects/project-04-narandzaste-cijevi.webp",
  },
  {
    id: "project-1",
    label: "Iskopi i priprema terena",
    section: "Reference",
    usage: "Reference",
    defaultSrc: "/images/projects/project-01-bager.webp",
  },
  {
    id: "project-7",
    label: "Potporni zid",
    section: "Reference",
    usage: "Reference",
    defaultSrc: "/images/projects/project-07-potporni-zid.webp",
  },
];

const DB_NAME = "juskograd-homepage-media";
const STORE_NAME = "images";

function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getHomepageImage(id: string) {
  const db = await openDb();
  return new Promise<Blob | undefined>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

export async function setHomepageImage(id: string, blob: Blob | null) {
  const db = await openDb();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    if (blob) tx.objectStore(STORE_NAME).put(blob, id); else tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => { db.close(); window.dispatchEvent(new CustomEvent("homepage-media-change", { detail: id })); resolve(); };
    tx.onerror = () => reject(tx.error);
  });
}

export function useHomepageImage(id: string, fallback: string) {
  const [src, setSrc] = useState(fallback);
  useEffect(() => {
    let objectUrl: string | null = null;
    async function load() {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      const blob = await getHomepageImage(id);
      objectUrl = blob ? URL.createObjectURL(blob) : null;
      setSrc(objectUrl ?? fallback);
    }
    void load();
    const handler = (event: Event) => { if ((event as CustomEvent<string>).detail === id) void load(); };
    window.addEventListener("homepage-media-change", handler);
    return () => { window.removeEventListener("homepage-media-change", handler); if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [id, fallback]);
  return src;
}
