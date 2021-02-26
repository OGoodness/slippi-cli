import { SlippiGame } from '@slippi/slippi-js';
import fs from 'fs';
import _ from 'lodash';
import cli from 'cli-ux'


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
  
  processDirectory(directory: string): Array<string> {
    return _.map(fs.readdirSync(directory), (file) => {
      return directory + '/' + file
    })
  }
  
  async handleStats(files: Array<string>, type: string, bar: any){
    this.bar = bar
    let allFileStats: any = []
    if(type === 'directory'){
      const allDirectories = _.flatMap(_.map(files, (dir) => this.processDirectory(dir)))
      allFileStats = allDirectories.map((file) => this.processFile(file))
    }
    if(type === 'file'){
      allFileStats = files.map((file) => this.processFile(file))
    }
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