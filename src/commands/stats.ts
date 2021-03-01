import {Command, flags} from '@oclif/command'
import SlippiHandler  from '../helpers/SlippiHandler'
import cli from 'cli-ux'
import {calculateTotalGameTime} from '../helpers/Time'
import {getFileCount, saveFile} from '../helpers/common'

export default class Stats extends Command {
  static description = 'describe the command here'

  static examples = [
    `
    $ slp stats -d slippi-dir -o output.json
      .... (saves the output to output.json)
    $ slp stats -d slippi-dir -f game.slp -t
    {
      "frames": 17838451,
      "seconds": 297307.51666666666,
      "minutes": 4955.125277777778,
      "hours": 82.5854212962963,
      "days": 3.4410592206790125,
      "averageGame": "1.9868184754521965 Minutes Per Game",
      "fileCount": 2494
    }

    $ slp stats -f game.slp -p 'overall[0].inputCounts'
    {
      "inputCounts": {
        "buttons": 16,
        "triggers": 5,
        "cstick": 0,
        "joystick": 15,
        "total": 36
      }
    }
`,
  ]

  static flags = {
    file: flags.string({
      char: 'f',                    // shorter flag version
      description: 'File(s) to pull stats from', // help description for flag
      hidden: false,                // hide from help
      multiple: true,              // allow setting this flag multiple times
      default: [],
    }),
    dir: flags.string({
      char: 'd',                    // shorter flag version
      description: 'Directory(s) to scan and get stats from', // help description for flag
      hidden: false,                // hide from help
      multiple: true,              // allow setting this flag multiple times
      default: [],
    }),
    time: flags.boolean({
      char: 't',                    // shorter flag version
      description: 'Calculate Total Time from File(s)', // help description for flag
      hidden: false,                // hide from help
      default: false,             // default value if flag not passed (can be a function that returns a string or undefined)
    }),
    silent: flags.boolean({
      char: 's',                    // shorter flag version
      description: 'If you do not want the loading bar to show', // help description for flag
      hidden: false,                // hide from help
      default: false,             // default value if flag not passed (can be a function that returns a string or undefined)
    }),
    path: flags.string({
      char: 'p',                    // shorter flag version
      description: 'Path to get value in JSON output', // help description for flag
      hidden: false,                // hide from help
      multiple: true,              // allow setting this flag multiple times
    }),
    output: flags.string({
      char: 'o',                    // shorter flag version
      description: 'File to save JSON output', // help description for flag
      hidden: false,                // hide from help
      multiple: false,              // allow setting this flag multiple times
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
    let files = flags.dir.concat(flags.file)
    let fileCount = await getFileCount(files)
    if(!flags.silent){
      bar.start(fileCount, 0, {
        fileName: 'N/A',
      })
    }
    if(flags.time){
      result = await calculateTotalGameTime(files, bar)
    }else{
      // Start Handling Files
      if (files.length > 0) {
        result = await slippiHandler.handleStats(files, bar)
      }
    }
    

    // stop the Bar Tracker
    bar.stop()
    this.log(JSON.stringify(result, null, 2))
    
    if(flags.output){
      saveFile(JSON.stringify(result, null, 2), flags.output)
    }
  }
}
