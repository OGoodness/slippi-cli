import { SlippiGame } from '@slippi/slippi-js';
import fs from 'fs';
import _ from 'lodash';

let flags: any = {} 

class SlippiHandler {
  
  constructor(providedFlags: any){
    flags = providedFlags
  }

  processFile(file: string): any {
    let game: any = new SlippiGame(file).getStats()
    _.set(game, 'filename', file)
    if(flags.path){
      game = this.getPathValue(game)
    }
    return game
  }
  
  processDirectory(directory: string): Array<string> {
    return _.map(fs.readdirSync(directory), (file) => {
      console.log(file)
      return directory + '/' + file
    })
  }
  
  async handleStats(files: Array<string>, type: string){
    let allFileStats = []
    console.log(type, type === 'file')
    if(type === 'directory'){
      const allDirectories = _.flatMap(_.map(files, (dir) => this.processDirectory(dir)))
      allFileStats = allDirectories.map((file) => this.processFile(file))
    }
    if(type === 'file'){
      allFileStats = files.map((file) => this.processFile(file))
    }
    return await Promise.all(allFileStats)
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