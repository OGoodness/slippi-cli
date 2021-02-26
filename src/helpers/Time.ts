import { SlippiGame } from '@slippi/slippi-js';
const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function* getFiles(dir: string): any {
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

export async function getFileCount(path: string[]){
  let totalFiles = 0
  for await (const item of path) {
    for await (const f of getFiles(item)) {
      totalFiles++
    }
    if(totalFiles >= 50000){
      console.log("Maybe you should stop")
    }
  }
  return totalFiles
}

export async function calculateTotalGameTime(path: string[]): Promise<number> {
  let totalFiles: number = 0
  let fileCount: number = 0
  let time: number = 0
  let game: any = null
  let metadata: any = null
  for await (const item of path) {
    for await (const f of getFiles(item)) {
      totalFiles++
    }
    for await (const f of getFiles(item)) {
      fileCount++
      // console.log(fileCount + " / " + totalFiles)
      try{
        game = new SlippiGame(f);
        metadata = game.getMetadata();
        if(metadata){
          time += metadata.lastFrame
        }
      }catch(error){
        console.log("Issue with a file: ", { error, f })
      }
    }
  }
  return time / 60.0 / 60.0 /60 
}
