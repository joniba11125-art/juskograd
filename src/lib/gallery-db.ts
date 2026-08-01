import { supabase } from "@/lib/supabase";

export type GalleryImage = {
  id: string;
  storagePath: string;
  url: string;
  sortOrder: number;
};

export type GalleryProject = {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
  createdAt: string;
};

type ProjectRow = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  gallery_images: Array<{ id: string; storage_path: string; sort_order: number }>;
};

function publicUrl(path: string) {
  return supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
}

function mapProject(row: ProjectRow): GalleryProject {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
    images: [...(row.gallery_images ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => ({
        id: image.id,
        storagePath: image.storage_path,
        sortOrder: image.sort_order,
        url: publicUrl(image.storage_path),
      })),
  };
}

export async function getGalleryProjects() {
  const { data, error } = await supabase
    .from("gallery_projects")
    .select("id,title,description,created_at,gallery_images(id,storage_path,sort_order)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ProjectRow[]).map(mapProject);
}

export async function saveGalleryProject(input: { title: string; description: string; files: File[] }) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Niste prijavljeni.");

  const { data: project, error: projectError } = await supabase
    .from("gallery_projects")
    .insert({ title: input.title, description: input.description, created_by: userData.user.id, published: true })
    .select("id,title,description,created_at")
    .single();
  if (projectError) throw projectError;

  const uploadedPaths: string[] = [];
  try {
    for (let index = 0; index < input.files.length; index += 1) {
      const file = input.files[index];
      const path = `gallery/${project.id}/${String(index + 1).padStart(2, "0")}-${crypto.randomUUID()}.webp`;
      const { error: uploadError } = await supabase.storage.from("site-images").upload(path, file, { contentType: "image/webp", upsert: false });
      if (uploadError) throw uploadError;
      uploadedPaths.push(path);
    }

    const { error: imageError } = await supabase.from("gallery_images").insert(
      uploadedPaths.map((path, index) => ({ project_id: project.id, storage_path: path, sort_order: index })),
    );
    if (imageError) throw imageError;
  } catch (error) {
    if (uploadedPaths.length) await supabase.storage.from("site-images").remove(uploadedPaths);
    await supabase.from("gallery_projects").delete().eq("id", project.id);
    throw error;
  }

  const projects = await getGalleryProjects();
  return projects.find((item) => item.id === project.id)!;
}

export async function deleteGalleryProject(project: GalleryProject) {
  const paths = project.images.map((image) => image.storagePath);
  if (paths.length) {
    const { error: storageError } = await supabase.storage.from("site-images").remove(paths);
    if (storageError) throw storageError;
  }
  const { error } = await supabase.from("gallery_projects").delete().eq("id", project.id);
  if (error) throw error;
}

export async function updateGalleryProject(project: GalleryProject, input: { title: string; description: string; files: File[] }) {
  const { error: projectError } = await supabase.from("gallery_projects").update({ title: input.title, description: input.description }).eq("id", project.id);
  if (projectError) throw projectError;

  if (input.files.length) {
    const uploadedPaths: string[] = [];
    const insertedIds: string[] = [];
    try {
      for (let index = 0; index < input.files.length; index += 1) {
        const path = `gallery/${project.id}/${String(index + 1).padStart(2, "0")}-${crypto.randomUUID()}.webp`;
        const { error } = await supabase.storage.from("site-images").upload(path, input.files[index], { contentType: "image/webp" });
        if (error) throw error;
        uploadedPaths.push(path);
      }
      const { data: inserted, error: imageError } = await supabase.from("gallery_images").insert(
        uploadedPaths.map((path, index) => ({ project_id: project.id, storage_path: path, sort_order: index })),
      ).select("id");
      if (imageError) throw imageError;
      insertedIds.push(...(inserted ?? []).map((item) => item.id));
      if (project.images.length) {
        const { error: deleteError } = await supabase.from("gallery_images").delete().in("id", project.images.map((image) => image.id));
        if (deleteError) throw deleteError;
        await supabase.storage.from("site-images").remove(project.images.map((image) => image.storagePath));
      }
    } catch (error) {
      if (insertedIds.length) await supabase.from("gallery_images").delete().in("id", insertedIds);
      if (uploadedPaths.length) await supabase.storage.from("site-images").remove(uploadedPaths);
      throw error;
    }
  }

  const projects = await getGalleryProjects();
  return projects.find((item) => item.id === project.id)!;
}
