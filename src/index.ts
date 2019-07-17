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

  constructor(path: string, env?: Options) {
    let _env = env || process.env
    this.rData = {}
    this.path = path
    this.options = {
      env: Object.assign({}, {DIRNAME: __dirname}, _env),
      encoding: 'utf8'
    }
    this.idCounter = 0
    this.args = ['--vanilla', __dirname + '/R/launch.R']
  }

  private setInputEnv (opts: Options): void {
    this.options.env.input = JSON.stringify([this.rData, this.path, opts])
  }

  data (...args: any[]): R {
    for (let i = 0; i < args.length; i++)
      this.rData[++this.idCounter] = args[i]
    
    return this
  }

  call (_opts?: Options): Promise<object> {
    return new Promise((resolve: any, reject: any) => {
      let opts = _opts || {}
      this.setInputEnv(opts)
      let child = spawn('Rscript', this.args, this.options)
      let body = ""
      child.stderr.on('data', d => {
        let msg = d.toString()
        if (msg.includes('Warning message')) return
        reject(msg)
      })
      child.stdout.on('data', d => body += d)
      child.on('close', () => resolve(JSON.parse(body)))
    })
  }

  callSync (_opts?: Options): object | undefined {
    let opts = _opts || {}
    this.setInputEnv(opts)
    let child = spawnSync('Rscript', this.args, this.options)
    if (child.stderr) {
      let msg = child.stderr.toString()
      if (!msg.includes('Warning message'))
        throw msg
    }
    if (child.stdout) {
      return JSON.parse(child.stdout.toString())
    }
    return undefined
  }
}
