const { resolve } = require('path');
const { readdir } = require('fs').promises;
import fs from 'fs';


export interface Time {
  frames: number,
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
  averageGame: string,
  fileCount?: number
}

export async function* getFiles(dir: string): any {
  if(fs.lstatSync(dir).isFile()){
    yield dir;
  } else{
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const res = resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        yield* getFiles(res);
      } else {
        yield res;
      }
    }
  }
}

export async function getFileCount(path: string[]): Promise<number>{
  let totalFiles = 0
  for await (const item of path) {
    if(fs.lstatSync(item).isFile()){
      totalFiles++
      continue
    }
    for await (const f of getFiles(item)) {
      totalFiles++
    }
    if(totalFiles >= 50000){
      console.log("Maybe you should stop")
    }
  }
  return totalFiles
}

export function saveFile(content: string, filename: string = 'slp-out.json'){
  fs.writeFile(filename, content, function (err) {
    if (err) return console.log(err);
  });
  
}