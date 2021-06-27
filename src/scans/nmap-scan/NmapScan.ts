import { spawn } from 'child_process'
import { parseStringPromise as parseXml } from 'xml2js'
import { formatMac } from '../../helpers/MacFormatter'
import Host from '../../misc/Host'
import { NmapScanOption } from './NmapScanOption'
import NmapScanResponse from './NmapScanResponse'

export class NmapScan {
    private nmapLocation = 'nmap'
    protected options: NmapScanOption = {}
    private arguments: string[] = []
    protected rawResponse: unknown
    protected response: NmapScanResponse

    constructor(opts: NmapScanOption) {
        if (opts) {
            this.options = opts
        }
    }

    public async run(): Promise<NmapScanResponse> {
        this.arguments = this.constructArguments()
        const result = await this.exec()
        this.rawResponse = await parseXml(result, {
            mergeAttrs: true,
            explicitArray: false
        })

        this.response = {}
        this.parse()

        this.response.nmapArguments = this.rawResponse['nmaprun']['args']

        return this.response as unknown as NmapScanResponse
    }

    protected constructArguments(): string[] {
        const opts = this.options as NmapScanOption
        const args = []

        // Output to console in XML format
        args.push('-oX', '-')

        // scanType
        switch (opts.scanType) {
            case 'list-scan':
                args.push('-sL')
                break
            case 'ping-scan':
                args.push('-sn')
                break
            case 'protocol-scan':
                args.push('-sO')
                break
        }

        // random
        if (opts.random !== undefined) {
            args.push('-iR', opts.random)
        }

        // resolve
        switch (opts.resolve) {
            case 'never':
                args.push('-n')
                break
            case 'always':
                args.push('-R')
                break
            case 'all':
                args.push('--resolve-all')
                break
        }

        // exclude
        if (opts.exclude !== undefined) {
            args.push('--exclude')
            if (Array.isArray(opts.exclude)) {
                args.push(opts.exclude.join())
            } else {
                args.push(opts.exclude)
            }
        }

        // excludePort
        // if (opts.excludePort !== undefined) {
        //    args.push('--exclude-ports')
        //    if (Array.isArray(opts.excludePort)) {
        //       args.push(opts.excludePort.join())
        //    } else {
        //       args.push(opts.excludePort)
        //    }
        // }

        // dnsServer
        if (opts.dnsServer !== undefined) {
            args.push('--dns-servers')
            if (Array.isArray(opts.dnsServer)) {
                args.push(opts.dnsServer.join())
            } else {
                args.push(opts.dnsServer)
            }
        }

        // useSystemDns
        if (opts.useSystemDns) {
            args.push('--system-dns')
        }

        // traceroute
        if (opts.traceroute) {
            args.push('--traceroute')
        }

        // ttl
        if (opts.ttl !== undefined) {
            args.push('--ttl', opts.ttl)
        }

        // topPorts
        // if (opts.topPorts !== undefined) {
        //    args.push('--top-ports', opts.topPorts)
        // }

        // portRatio
        // if (opts.portRatio !== undefined) {
        //    args.push('--port-ratio', opts.portRatio)
        // }

        // interface
        if (opts.interface !== undefined) {
            args.push('-e', opts.interface)
        }

        // sourceIp
        if (opts.sourceIp !== undefined) {
            args.push('-S', opts.sourceIp)
        }

        // sourcePort
        if (opts.sourcePort !== undefined) {
            args.push('--source-port', opts.sourcePort)
        }

        // fragment
        if (opts.fragment) {
            args.push('-f')
        }

        // mtu
        if (opts.mtu !== undefined) {
            args.push('--mtu', opts.mtu)
        }

        // decoy
        if (opts.decoy !== undefined) {
            args.push('-D')
            if (Array.isArray(opts.decoy)) {
                args.push(opts.decoy.join())
            } else {
                args.push(opts.decoy)
            }
        }

        // proxy
        if (opts.proxy !== undefined) {
            args.push('--proxies')
            if (Array.isArray(opts.proxy)) {
                args.push(opts.proxy.join())
            } else {
                args.push(opts.proxy)
            }
        }

        // sourceMac
        if (opts.sourceMac !== undefined) {
            args.push('--spoof-mac', opts.sourceMac)
        }

        // fastScan
        if (opts.fastScan) {
            args.push('-F')
        }

        // randomizeHosts
        if (opts.randomizeHosts) {
            args.push('--randomize-hosts')
        }

        // randomizePorts
        if (opts.randomizePorts === false) {
            args.push('-r')
        }

        // badsum
        if (opts.badsum) {
            args.push('--badsum')
        }

        // ipv6
        if (opts.ipv6) {
            args.push('-6')
        }

        // sendMechanism
        switch (opts.sendMechanism) {
            case 'ip':
                args.push('--send-ip')
                break
            case 'eth':
                args.push('--send-eth')
                break
        }

        // zombieHost,zombiePort
        // if (opts.zombieHost !== undefined) {
        //    args.push('-sI')
        //    if (opts.zombiePort !== undefined) {
        //       args.push(`${opts.zombieHost}:${opts.zombiePort}`)
        //    } else {
        //       args.push(opts.zombieHost)
        //    }
        // }

        // ftpRelay
        // if (opts.ftpRelay !== undefined) {
        //    args.push('-b', opts.ftpRelay)
        // }

        // osDetection
        // if (opts.osDetection) {
        //    args.push('-O')
        // }

        // scanflag
        // if (opts.scanflag !== undefined) {
        //    if (Array.isArray(opts.scanflag)) {
        //       args.push(opts.scanflag.join())
        //    } else {
        //       args.push(opts.scanflag)
        //    }
        // }

        // privilegedMode
        if (opts.privilegedMode !== undefined) {
            if (opts.privilegedMode) {
                args.push('--privileged')
            } else {
                args.push('--unprivileged')
            }
        }

        // timing
        if (opts.timing !== undefined) {
            args.push('-T', opts.timing)
        }

        // minHostgroup
        if (opts.minHostgroup !== undefined) {
            args.push('--min-hostgroup', opts.minHostgroup)
        }

        // maxHostgroup
        if (opts.maxHostgroup !== undefined) {
            args.push('--max-hostgroup', opts.maxHostgroup)
        }

        // minParallelism
        if (opts.minParallelism !== undefined) {
            args.push('--min-parallelism', opts.minParallelism)
        }

        // maxParallelism
        if (opts.maxParallelism !== undefined) {
            args.push('--max-parallelism', opts.maxParallelism)
        }

        // minRate
        if (opts.minRate !== undefined) {
            args.push('--min-rate', opts.minRate)
        }

        // maxRate
        if (opts.maxRate !== undefined) {
            args.push('--max-rate', opts.maxRate)
        }

        // ignoreRstRateLimit
        if (opts.ignoreRstRateLimit) {
            args.push('--defeat-rst-ratelimit')
        }

        // ignoreIcmpRateLimit
        if (opts.ignoreIcmpRateLimit) {
            args.push('--defeat-icmp-ratelimit')
        }

        // disableArpPing
        if (opts.disableArpPing) {
            args.push('--disable-arp-ping')
        }

        // initialRttTimeout
        if (opts.initialRttTimeout !== undefined) {
            args.push('--initial-rtt-timeout', opts.initialRttTimeout)
        }

        // minRttTimeout
        if (opts.minRttTimeout !== undefined) {
            args.push('--min-rtt-timeout', opts.minRttTimeout)
        }

        // maxRttTimeout
        if (opts.maxRttTimeout !== undefined) {
            args.push('--max-rtt-timeout', `${opts.maxRttTimeout}ms`)
        }

        // maxRetries
        if (opts.maxRetries !== undefined) {
            args.push('--max-retries', opts.maxRetries)
        }

        // hostTimeout
        if (opts.hostTimeout !== undefined) {
            args.push('--host-timeout', opts.hostTimeout)
        }

        // scriptTimeout
        if (opts.scriptTimeout !== undefined) {
            args.push('--script-timeout', opts.scriptTimeout)
        }

        // scanDelay
        if (opts.scanDelay !== undefined) {
            args.push('--scan-delay', opts.scanDelay)
        }

        // maxScanDelay
        if (opts.maxScanDelay !== undefined) {
            args.push('--max-scan-delay', `${opts.maxScanDelay}ms`)
        }

        // nsockEngine
        if (opts.nsockEngine !== undefined) {
            args.push('--nsock-engine', opts.nsockEngine)
        }

        // data
        if (opts.data !== undefined) {
            if (typeof (opts.data) == 'string') {
                args.push('--data-string', `"${opts.data}"`)
            } else if (Buffer.isBuffer(opts.data)) {
                args.push('--data', opts.data.toString('hex'))
            }
        }

        // skipHostDiscovery
        if (opts.skipHostDiscovery) {
            args.push('-Pn')
        }

        // dryrun
        if (opts.dryrun && opts.scanType == 'list-scan') {
            args.push('-n')
        }

        // port
        // if (opts.port !== undefined) {
        //     args.push('-p')
        //     if (Array.isArray(opts.port)) {
        //         args.push(opts.port.join())
        //     } else {
        //         args.push(opts.port)
        //     }
        // }

        // target
        if (opts.target !== undefined) {
            if (Array.isArray(opts.target)) {
                args.push(opts.target.join())
            } else {
                args.push(opts.target)
            }
        }

        return args
    }

    protected parse(): void {
        this.response.version = this.rawResponse['nmaprun']['version']
        this.response.timestamp = new Date(this.rawResponse['nmaprun']['start'] * 1000)
        this.response.duration = this.rawResponse['nmaprun']['runstats']['finished']['elapsed'] * 1000

        const run = this.rawResponse['nmaprun']

        // hosts
        const hosts = Array.isArray(run['host']) ? run['host'] : [run['host']]
        if (hosts) {
            this.response.hosts = []
            hosts.forEach(host => {
                if (host === undefined) return

                const responseHost: Host = {}

                // status
                const hostStatus = host['status']
                if (hostStatus) {
                    responseHost.state = hostStatus['state']
                    responseHost.reason = hostStatus['reason'],
                    responseHost.ttl = Number(hostStatus['reason_ttl'])
                }

                // addresses
                const hostAddress = host['address']
                if (hostAddress) {
                    const hostAddresses = Array.isArray(hostAddress) ? hostAddress : [hostAddress]
                    hostAddresses.forEach(hostAddress => {
                        if (hostAddress['addrtype'] === 'ipv4') {
                            responseHost.ipAddress = hostAddress['addr']
                        } else if (hostAddress['addrtype'] === 'mac') {
                            responseHost.mac = formatMac(hostAddress['addr'])
                            responseHost.vendor = hostAddress['vendor']
                        }
                    })
                }

                // hostname
                const hostnames = host['hostnames'] ? host['hostnames']['hostname'] : undefined
                if (hostnames) {
                    responseHost.hostnames = []
                    if (Array.isArray(hostnames)) {
                        hostnames.forEach(host => {
                            responseHost.hostnames.push(host['name'])
                        })
                    } else {
                        responseHost.hostnames.push(hostnames['name'])
                    }
                }

                // hops
                if (host['trace']) {
                    const trace = host['trace']['hop']
                    const hops = Array.isArray(trace) ? trace : [trace]
                    if (hops) {
                        responseHost.hops = []
                        hops.forEach(hop => {
                            responseHost.hops.push({
                                ttl: Number(hop['ttl']),
                                ipAddress: hop['ipaddr'],
                                rtt: Number(hop['rtt']),
                                host: hop['host']
                            })
                        })
                    }
                }

                // ports
                const ports = host['ports']
                if (ports) {
                    const portArray = Array.isArray(ports['port']) ? ports['port'] : [ports['port']]
                    if (portArray) {
                        responseHost.ports = []
                        portArray.forEach(port => {
                            responseHost.ports.push({
                                number: Number(port['portid']),
                                protocol: port['protocol'],
                                state: port['state']['state'],
                                service: port['service']['name'],
                                reason: port['state']['reason'],
                                ttl: Number(port['state']['reason_ttl'])
                            })
                        })
                    }
                }

                this.response.hosts.push(responseHost)
            })
        }
    }

    protected async exec(): Promise<string> {
        let childOutput = ''

        console.log(this.arguments.join(' '))

        const child = await spawn(this.nmapLocation, this.arguments)
        child.stdout.on('data', (chunk: Buffer) => {
            childOutput += chunk.toString()
        })

        return new Promise((resolve, reject) => {
            child.on('exit', (code) => {
                if (code != 0) {
                    return reject(`Nmap child process has exited with code: ${code}`)
                }

                resolve(childOutput)
            })
        })
    }
}