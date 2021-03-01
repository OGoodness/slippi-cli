import { SlippiGame } from '@slippi/slippi-js';
import { Time, getFiles } from './common'

export async function calculateTotalGameTime(path: string[], bar: any): Promise<Time> {
  let fileCount: number = 0
  let time: number = 0
  let game: any = null
  let metadata: any = null
  for await (const item of path) {
    for await (const f of getFiles(item)) {
      try{
        bar.update(++fileCount, {
          fileName: f
        }, 0)

        game = new SlippiGame(f);
        metadata = game.getMetadata();
        if(metadata){
          time += metadata.lastFrame
        }
      }catch(error){
        // console.log("\nIssue with a file: ", { error, f })
        console.log(`\nIssue with a file: ${f}, Continuing` )
      }
    }
  }
  return {
    frames: time,
    seconds:  time / 60.0,
    minutes: time / 60.0 /60,
    hours: time /60.0 / 60 /60,
    days: time /60.0 / 60 /60 /24,
    averageGame: `${time / 60.0 /60 / fileCount} Minutes Per Game`,
    fileCount: fileCount
  }
}
