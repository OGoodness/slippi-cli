import { SlippiGame } from '@slippi/slippi-js';
import _ from 'lodash';
import { getFiles } from './common'


let flags: any = {} 

class SlippiHandler {
  bar: any
  counter = 0
  constructor(providedFlags: any){
    flags = providedFlags
  }

  async processFile(file: string): Promise<any> {
    this.bar.update(++this.counter, {
      fileName: file
    }, 0)
    let game: any = new SlippiGame(file).getStats()
    _.set(game, 'filename', file)
    if(flags.path){
      game = this.getPathValue(game)
    }
    return game
  }
  
  async handleStats(files: Array<string>, bar: any){
    this.bar = bar
    let allFileStats: any = []
    for await (const item of files) {
      for await (const f of getFiles(item)) {
        try{
          allFileStats.push(this.processFile(f))
        }catch(error){
          // console.log("\nIssue with a file: ", { error, f })
        console.log(`\nIssue with a file: ${f}, Continuing` )
        }
      }
    }
    // allFileStats = files.map((file) => this.processFile(file))

    return Promise.all(allFileStats)
  }

  getPathValue(input: string){
    return _.chain(flags.path)
    //.map((path) => _.get(input, path) )
    .map((path: string) => {
      let response = {}
      _.set(response, path.split('.').pop() ?? '', _.get(input, path))
      return response
    })
  }
}


export default SlippiHandler