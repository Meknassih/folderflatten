# Folderflatten

Flattens a hierarchy of folders from a starting point to a single folder containing only files. Destination file names are a concatenation of the parent folders.

## Usage

`node index.js rel/or/abs/path/to/input/dir`
Output directory is hardcoded to "<CWD><inputDirName>-flat".

## Example output
```
cp /home/lzr/dev/letra/nob -> /home/lzr/dev/folderflatten/letra-flat/nob
cp /home/lzr/dev/letra/nob.c -> /home/lzr/dev/folderflatten/letra-flat/nob.c
cp /home/lzr/dev/letra/nob.h -> /home/lzr/dev/folderflatten/letra-flat/nob.h
cp /home/lzr/dev/letra/nob.old -> /home/lzr/dev/folderflatten/letra-flat/nob.old
cp /home/lzr/dev/letra/readme.html -> /home/lzr/dev/folderflatten/letra-flat/readme.html
cp /home/lzr/dev/letra/readme.md -> /home/lzr/dev/folderflatten/letra-flat/readme.md
cp /home/lzr/dev/letra/src/debug.c -> /home/lzr/dev/folderflatten/letra-flat/src.c
cp /home/lzr/dev/letra/src/debug.h -> /home/lzr/dev/folderflatten/letra-flat/src.h
cp /home/lzr/dev/letra/src/main.c -> /home/lzr/dev/folderflatten/letra-flat/src_1.c
cp /home/lzr/dev/letra/src/main.h -> /home/lzr/dev/folderflatten/letra-flat/src_1.h
cp /home/lzr/dev/letra/src/md4c-html.c -> /home/lzr/dev/folderflatten/letra-flat/src_2.c
cp /home/lzr/dev/letra/src/md4c-html.h -> /home/lzr/dev/folderflatten/letra-flat/src_2.h
cp /home/lzr/dev/letra/src/prompt.c -> /home/lzr/dev/folderflatten/letra-flat/src_3.c
cp /home/lzr/dev/letra/src/prompt.h -> /home/lzr/dev/folderflatten/letra-flat/src_3.h
cp /home/lzr/dev/letra/src/ressources.c -> /home/lzr/dev/folderflatten/letra-flat/src_4.c
cp /home/lzr/dev/letra/src/ressources.h -> /home/lzr/dev/folderflatten/letra-flat/src_4.h
```
