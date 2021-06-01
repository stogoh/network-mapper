import { spawn } from 'child_process'
import { writeFile } from 'fs/promises'
import { parseStringPromise as parseXml } from 'xml2js'
import { NmapScanOptions } from '../misc/NmapScanOptions'
import NmapScanResponse from '../response/NmapScanResponse'

export class NmapScan<TResponse = NmapScanResponse> {
    private nmapLocation: string = 'nmap'
    protected options: NmapScanOptions
    private arguments: any[]
    protected rawResponse: any
    protected response: NmapScanResponse

    constructor(opts: NmapScanOptions) {
        this.options = opts
    }

    public async run(opts?: { dryrun: boolean }): Promise<TResponse> {
        if (opts?.dryrun !== undefined) {
            this.options.dryrun = opts.dryrun
        }

        this.constructArguments()        

        const result = await this.exec()

        this.rawResponse = await parseXml(result, {
            mergeAttrs: true,
            explicitArray: false
        });
        
        this.response = {} as NmapScanResponse
        await this.parse()

        return this.response as unknown as TResponse
    }

    protected constructArguments() {
        const opts = this.options

        this.arguments = new Array();

        // Output to console in XML format
        this.arguments.push('-oX', '-')

        // scanType
        if (opts.scanType == 'list-scan') {
            this.arguments.push('-sL')
        }

        // random
        if (opts.random !== undefined) {
            this.arguments.push('-iR', opts.random)
        }

        // resolve
        if (opts.resolve) {
            if (opts.resolve === 'always') {
                this.arguments.push('-R')
            } else if (opts.resolve === 'never') {
                this.arguments.push('-n')
            }
        }

        // exclude
        if (opts.exlude !== undefined) {
            this.arguments.push('--exclude')
            if (Array.isArray(opts.exlude)) {
                this.arguments.push(opts.exlude.join())
            } else {
                this.arguments.push(opts.exlude)
            }
        }

        // excludePort
        if (opts.excludePort !== undefined) {
            this.arguments.push('--exclude-ports')
            if (Array.isArray(opts.excludePort)) {
                this.arguments.push(opts.excludePort.join())
            } else {
                this.arguments.push(opts.excludePort)
            }
        }

        // dnsServer
        if (opts.dnsServer !== undefined) {
            this.arguments.push('--dns-servers')
            if (Array.isArray(opts.dnsServer)) {
                this.arguments.push(opts.dnsServer.join())
            } else {
                this.arguments.push(opts.dnsServer)
            }
        }

        // useSystemDns
        if (opts.useSystemDns) {
            this.arguments.push('--system-dns')
        }

        // traceroute
        if (opts.traceroute) {
            this.arguments.push('--traceroute')
        }

        // ttl
        if (opts.ttl !== undefined) {
            this.arguments.push('--ttl', opts.ttl)
        }

        // topPorts
        if (opts.topPorts !== undefined) {
            this.arguments.push('--top-ports', opts.topPorts)
        }

        // portRatio
        if (opts.portRatio !== undefined) {
            this.arguments.push('--port-ratio', opts.portRatio)
        }

        // sourceInterface
        if (opts.sourceInterface !== undefined) {
            this.arguments.push('-e', opts.sourceInterface)
        }

        // sourceIp
        if (opts.sourceIp !== undefined) {
            this.arguments.push('-S', opts.sourceIp)
        }

        // sourcePort
        if (opts.sourcePort !== undefined) {
            this.arguments.push('--source-port', opts.sourcePort)
        }

        // fragment
        if (opts.fragment !== undefined) {
            this.arguments.push('-f')
        }

        // mtu
        if (opts.mtu !== undefined) {
            this.arguments.push('--mtu', opts.mtu)
        }

        // proxy
        if (opts.proxy !== undefined) {
            this.arguments.push('--proxies')
            if (Array.isArray(opts.proxy)) {
                this.arguments.push(opts.proxy.join())
            } else {
                this.arguments.push(opts.proxy)
            }
        }

        // SourceMac
        if (opts.sourceMac !== undefined) {
            this.arguments.push('--spoof-mac', opts.sourceMac)
        }

        // fastScan
        if (opts.fastScan !== undefined) {
            this.arguments.push('-F')
        }

        // consecutively 
        if (opts.consecutively !== undefined) {
            this.arguments.push('-r')
        }

        // badsum
        if (opts.badsum) {
            this.arguments.push('--badsum')
        }

        // zomebieHost,zombiePort
        if (opts.zombieHost !== undefined) {
            this.arguments.push('-sI')
            if (opts.zombiePort !== undefined) {
                this.arguments.push(`${opts.zombieHost}:${opts.zombiePort}`)
            } else {
                this.arguments.push(opts.zombieHost)
            }
        }

        // ftpRelay
        if (opts.ftpRelay !== undefined) {
            this.arguments.push('-b', opts.ftpRelay)
        }

        // osDetection
        if (opts.osDetection !== undefined) {
            this.arguments.push('-O')
        }

        // scanflag
        if (opts.scanflag !== undefined) {
            if (Array.isArray(opts.scanflag)) {
                this.arguments.push(opts.scanflag.join())
            } else {
                this.arguments.push(opts.scanflag)
            }
        }

        // privilegedMode
        if (opts.privilegedMode !== undefined) {
            if (opts.privilegedMode) {
                this.arguments.push('--privileged')
            } else {
                this.arguments.push('--unprivileged')
            }
        }

        // minRate
        if (opts.minRate !== undefined) {
            this.arguments.push('--min-rate', opts.minRate)
        }

        // maxRate
        if (opts.maxRate !== undefined) {
            this.arguments.push('--max-rate', opts.maxRate)
        }

        // minRttTimeout
        if (opts.minRttTimeout !== undefined) {
            this.arguments.push('--min-rtt-timeout', opts.minRttTimeout)
        }

        // maxRttTimeout
        if (opts.maxRttTimeout !== undefined) {
            this.arguments.push('--max-rtt-timeout', opts.maxRttTimeout)
        }

        // initialRttTimeout
        if (opts.initialRttTimeout !== undefined) {
            this.arguments.push('--initial-rtt-timeout', opts.initialRttTimeout)
        }

        // timeout
        if (opts.hostTimeout !== undefined) {
            this.arguments.push('--host-timeout', opts.hostTimeout)
        }

        // skipHostDiscovery
        if (opts.skipHostDiscovery !== undefined) {
            this.arguments.push('-Pn')
        }

        // dryrun
        if (opts.dryrun !== undefined) {
            this.arguments.push('-n')
        }

        // port
        if (opts.port !== undefined) {
            this.arguments.push('-p')
            if (Array.isArray(opts.port)) {
                this.arguments.push(opts.port.join())
            } else {
                this.arguments.push(opts.port)
            }
        }

        // target
        if (opts.target !== undefined) {
            if (Array.isArray(opts.target)) {
                this.arguments.push(opts.target.join(''))
            } else {
                this.arguments.push(opts.target)
            }
        }

        console.log(this.arguments);
    }

    protected async parse() {
        this.response.version = this.rawResponse['nmaprun']['version']
        this.response.timestamp = new Date(this.rawResponse['nmaprun']['start'] * 1000)
        this.response.duration = this.rawResponse['nmaprun']['runstats']['finished']['elapsed'] * 1000
    }

    protected async exec(): Promise<string> {
        let childOutput = ''
        const child = await spawn(this.nmapLocation, this.arguments)
        child.stdout.on('data', (chunk: Buffer) => {
            childOutput += chunk.toString()
        })

        return new Promise((resolve, reject) => {
            child.on('exit', (code) => {
                if (code != 0) {
                    return reject(`Nmap child porcess has exited with code: ${code}`)
                }

                resolve(childOutput)
            })
        })
    }
}