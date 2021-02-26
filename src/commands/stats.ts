import {Command, flags} from '@oclif/command'
import SlippiHandler  from '../helpers/SlippiHandler'
import cli from 'cli-ux'
import {calculateTotalGameTime, getFileCount} from '../helpers/Time'

export default class Stats extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ slp stats -f game.slp -p 'overall'
`,
  ]

  static flags = {
    file: flags.string({
      char: 'f',                    // shorter flag version
      description: 'File(s) to pull stats from', // help description for flag
      hidden: false,                // hide from help
      multiple: true,              // allow setting this flag multiple times
      // env: 'MY_NAME',               // default to value of environment variable
      // options: ['a', 'b'],          // only allow the value to be from a discrete set
      // parse: input => 'output',     // instead of the user input, return a different value
      // default: 'world',             // default value if flag not passed (can be a function that returns a string or undefined)
      // required: false,              // make flag required (this is not common and you should probably use an argument instead)
      // dependsOn: ['extra-flag'],    // this flag requires another flag
      // exclusive: ['extra-flag'],    // this flag cannot be specified alongside this other flag
    }),
    dir: flags.string({
      char: 'd',                    // shorter flag version
      description: 'Directory(s) to scan and get stats from', // help description for flag
      hidden: false,                // hide from help
      multiple: true,              // allow setting this flag multiple times
      // env: 'MY_NAME',               // default to value of environment variable
      // options: ['a', 'b'],          // only allow the value to be from a discrete set
      // parse: input => 'output',     // instead of the user input, return a different value
      // default: '.',             // default value if flag not passed (can be a function that returns a string or undefined)
      // required: false,              // make flag required (this is not common and you should probably use an argument instead)
      // dependsOn: ['extra-flag'],    // this flag requires another flag
      // exclusive: ['extra-flag'],    // this flag cannot be specified alongside this other flag
    }),
    time: flags.boolean({
      char: 't',                    // shorter flag version
      description: 'Calculate Total Time from File(s)', // help description for flag
      hidden: false,                // hide from help
      default: false,             // default value if flag not passed (can be a function that returns a string or undefined)
      // dependsOn: ['extra-flag'],    // this flag requires another flag
      // exclusive: ['extra-flag'],    // this flag cannot be specified alongside this other flag
    }),
    path: flags.string({
      char: 'p',                    // shorter flag version
      description: 'Path to get value in JSON output', // help description for flag
      hidden: false,                // hide from help
      multiple: true,              // allow setting this flag multiple times
      // env: 'MY_NAME',               // default to value of environment variable
      // options: ['a', 'b'],          // only allow the value to be from a discrete set
      // parse: input => 'output',     // instead of the user input, return a different value
      // default: '.',             // default value if flag not passed (can be a function that returns a string or undefined)
      // required: false,              // make flag required (this is not common and you should probably use an argument instead)
      // dependsOn: ['extra-flag'],    // this flag requires another flag
      // exclusive: ['extra-flag'],    // this flag cannot be specified alongside this other flag
    }),
  }

  static args = [
    {
      name: 'file',               // name of arg to show in help and reference with args[name]
      required: false,            // make the arg required with `required: true`
      description: 'output file', // help description
      hidden: false,               // hide this arg from help
      // parse: input => {
      //   console.log(input)
      //   return 'output'
      // },   // instead of the user input, return a different value
      default: 'world',           // default value if no arg input
      options: ['a', 'b'],        // only allow input to be from a discrete set
    }
  ]

  async run() {
    // start the spinner
    let result = {}
    const {args, flags} = this.parse(Stats)
    const slippiHandler = new SlippiHandler(flags)
    const bar = cli.progress({
      format: '[{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | File Name: {fileName}',
    })

    // Check overall before handling file/dir to set path
    if (args.overall || args.summary) {
      
    }
    if(flags.time){
      let path = flags.dir ?? flags.path
      result = await calculateTotalGameTime(path)
    }else{
      // Need to generalize it so that you can count on file and directory without adding more code
      bar.start(await getFileCount(flags.dir), 0, {
        fileName: 'N/A',
      })
      // Start Handling Files
      if (flags.file) {
        result = await slippiHandler.handleStats(flags.file, 'file', bar)
      }
      if (flags.dir) {
        result = await slippiHandler.handleStats(flags.dir, 'directory', bar)
      }
    }
    

    // stop the spinner
    bar.stop() // shows 'starting a process... done'
    this.log(JSON.stringify(result, null, 2))
    // // show on stdout instead of stderr
    // cli.action.start('starting a process', 'initializing', {stdout: true})    
    // // do some action...
    // // stop the spinner with a custom message
    // cli.action.stop('custom message') // shows 'starting a process... custom message'

  }
}
