import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const inputDir = "public/images/projects";

const files = [
  "project-01-bager.png",
  "project-02-kubota-bager.jpg",
  "project-03-radovi-uz-cestu.jpg",
  "project-04-narandzaste-cijevi.png",
  "project-05-poplocano-dvoriste.png",
  "project-06-poplocani-prilaz.png",
  "project-07-potporni-zid.png",
  "project-08-metalna-ograda.png",
];

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputName = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const outputPath = path.join(inputDir, outputName);

  const image = sharp(inputPath);
  const meta = await image.metadata();

  await image
    .resize({
      width: Math.min(meta.width || 1600, 1600),
      withoutEnlargement: true,
    })
    .webp({
      quality: 74,
      effort: 6,
    })
    .toFile(outputPath);

  const oldSize = (await fs.stat(inputPath)).size / 1024 / 1024;
  const newSize = (await fs.stat(outputPath)).size / 1024 / 1024;

  console.log(`${file} -> ${outputName}: ${oldSize.toFixed(2)} MB -> ${newSize.toFixed(2)} MB`);
}
