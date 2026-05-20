import { argv, cwd } from "node:process";
import { isAbsolute, normalize, join, sep, extname, basename } from "node:path";
import { readdir, copyFile, mkdir } from "node:fs/promises";
import { statSync } from "node:fs";

const JOIN_CHAR = '_';

let startPath = "";
if (argv[2] == "" || argv[2] == undefined) {
  startPath = cwd();
} else {
  if (isAbsolute(argv[2]))
    startPath = normalize(argv[2]);
  else
    startPath = normalize(join(cwd(), argv[2]));
}

console.debug("Flattening " + startPath);

function isDirectory(p) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false; // path doesn't exist
  }
}

function addNumToFile(path, num) {
  const fileName = basename(path, extname(path));
  const i = path.indexOf(fileName);
  const numPart = `_${num}`;
  return `${path.substring(0, i+fileName.length)}_${num}${path.substring(i+fileName.length)}`;
}

async function copyAndRename() {
  const destFolder = join(cwd(), startPath.split(sep).pop() + "-flat");
  try {
    await mkdir(destFolder);
  } catch (err) {
    console.error("Failed to create destination folder " + destFolder);
    console.error(err);
    return 1;
  }

  const dirContent = await readdir(startPath, {recursive: true});
  const destMap = new Map();

  for (const filePath of dirContent) {
    const originPath = join(startPath, filePath);
    if (isDirectory(originPath)) continue;

    const nameParts = filePath.split(sep).slice(0, -1);
    let fileName = "";
    // Handle files at the root of the source folder
    if (nameParts.length < 1)
      fileName = filePath;
    else
      fileName = nameParts.join(JOIN_CHAR) + extname(filePath);

    const destPath = join(destFolder, fileName);
    const num = destMap.get(destPath);
    try {
      const finalDestPath = num ? addNumToFile(destPath, num) : destPath;
      console.debug(`cp ${originPath} -> ${finalDestPath}`);
      await copyFile(originPath, finalDestPath);
      if (num) {
        destMap.set(destPath, num + 1)
      } else {
        destMap.set(destPath, 1);
      }
    } catch (err) {
      if (err.code == "EACCES") {
        console.log(`Skipping unaccessible file ${filePath}`);
        continue;
      }

      console.error(`Failed cp: ${originPath} -> ${destPath}`);
      console.error(err);
      return 1;
    }
  }
}

await copyAndRename([]);
