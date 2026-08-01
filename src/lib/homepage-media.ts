"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

function publicUrl(path: string, version?: string) {
  const url = supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
  return version ? `${url}?v=${encodeURIComponent(version)}` : url;
}

export async function getHomepageImage(id: string) {
  const { data, error } = await supabase.from("homepage_images").select("storage_path,updated_at").eq("slot_id", id).maybeSingle();
  if (error) throw error;
  return data?.storage_path ? publicUrl(data.storage_path, data.updated_at) : undefined;
}

export async function setHomepageImage(id: string, blob: Blob | null) {
  if (!blob) {
    const { error } = await supabase.from("homepage_images").delete().eq("slot_id", id);
    if (error) throw error;
    window.dispatchEvent(new CustomEvent("homepage-media-change", { detail: id }));
    return null;
  }
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Niste prijavljeni.");
  const path = `homepage/${id}-${Date.now()}-${crypto.randomUUID()}.webp`;
  const { error: uploadError } = await supabase.storage.from("site-images").upload(path, blob, { contentType: "image/webp" });
  if (uploadError) throw uploadError;
  const { error: verifyError } = await supabase.storage.from("site-images").download(path);
  if (verifyError) {
    await supabase.storage.from("site-images").remove([path]);
    throw verifyError;
  }
  const { error } = await supabase.from("homepage_images").upsert({ slot_id: id, storage_path: path, updated_by: userData.user.id, updated_at: new Date().toISOString() });
  if (error) { await supabase.storage.from("site-images").remove([path]); throw error; }
  window.dispatchEvent(new CustomEvent("homepage-media-change", { detail: id }));
  return publicUrl(path, String(Date.now()));
}

export function useHomepageImage(id: string, fallback: string) {
  const [src, setSrc] = useState(fallback);
  useEffect(() => {
    async function load() {
      try {
        const url = await getHomepageImage(id);
        if (!url) { setSrc(fallback); return; }
        const response = await fetch(url, { cache: "no-store" });
        setSrc(response.ok && response.headers.get("content-type")?.startsWith("image/") ? url : fallback);
      } catch {
        setSrc(fallback);
      }
    }
    void load();
    const handler = (event: Event) => { if ((event as CustomEvent<string>).detail === id) void load(); };
    window.addEventListener("homepage-media-change", handler);
    return () => window.removeEventListener("homepage-media-change", handler);
  }, [id, fallback]);
  return src;
}
