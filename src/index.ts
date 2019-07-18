import * as path from 'path'
import { spawn, spawnSync } from 'child_process'

interface Options {
  [key: string]: any
}

export class R {
  rData: Options
  path: string
  options: Options
  idCounter: number
  args: string[]

  constructor(scriptPath: string, opts?: Options) {
    let _opts = opts || {}
    this.rData = {}
    this.path = scriptPath
    this.options = Object.assign({}, {
      env: {DIRNAME: __dirname},
      encoding: 'utf8'
    }, _opts)
    this.idCounter = 0
    this.args = ['--vanilla', this.options.env.DIRNAME + '/R/launch.R']
  }

  private setInputEnv (opts: Options): void {
    this.options.env.input = JSON.stringify([this.rData, this.path, opts])
  }

  data (...args: any[]): R {
    for (let i = 0; i < args.length; i++)
      this.rData[++this.idCounter] = args[i]
    
    return this
  }

  call (_opts?: Options): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      let opts = _opts || {}
      this.setInputEnv(opts)
      console.log('args : ', this.args)
      console.log('opts : ', this.options)
      console.log('call : ', 'Rscript', this.args, this.options)
      let child = spawn('Rscript', this.args, this.options)
      let body = ""
      child.stderr.on('data', d => {
        let msg = d.toString()
        if (msg.includes('Warning message')) {
          console.log(msg)
          return
        }
        reject(msg)
      })
      child.stdout.on('data', d => body += d)
      child.on('close', () => {
        try {
          let response = JSON.parse(body)
          resolve(response) 
        } catch (e) {
          reject(body)
        }
      })
    })
  }

  callSync (_opts?: Options): any {
    let opts = _opts || {}
    this.setInputEnv(opts)
    let child = spawnSync('Rscript', this.args, this.options)
    if (child.stderr) {
      let msg = child.stderr.toString()
      if (msg.includes('Warning message')) {
        console.log(msg)
      } else {
        throw msg
      }
    }
    if (child.stdout) {
      let msg = child.stdout.toString()
      let response: any
      try {
        response = JSON.parse(msg)
      } catch (e) {
        throw msg
      }
      return response
    }
    return undefined
  }
}
