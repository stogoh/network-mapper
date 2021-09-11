import { spawn } from 'child_process'
import { parseStringPromise as parseXml } from 'xml2js'
import { formatMac } from '../../helpers/MacFormatter'
import Host from '../../misc/Host'
import Port from '../../misc/Port'
import { NmapScanOption } from './NmapScanOption'
import NmapScanResponse from './NmapScanResponse'

export class NmapScan {
    private nmapLocation = 'nmap'
    private args: unknown[]
    public options: NmapScanOption = {}
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
        this.args = []

        // Output to console in XML format
        this.args.push('-oX', '-')

        // scanType
        switch (opts.scanType) {
            case 'list-scan':
                this.args.push('-sL')
                break
            case 'ping-scan':
                this.args.push('-sn')
                break
            case 'protocol-scan':
                this.args.push('-sO')
                break
        }

        // resolve
        switch (opts.resolve) {
            case 'never':
                this.args.push('-n')
                break
            case 'always':
                this.args.push('-R')
                break
            case 'all':
                this.args.push('--resolve-all')
                break
        }

        // randomizePorts
        if (opts.randomizePorts === false) {
            this.args.push('-r')
        }

        // sendMechanism
        switch (opts.sendMechanism) {
            case 'ip':
                this.args.push('--send-ip')
                break
            case 'eth':
                this.args.push('--send-eth')
                break
        }

        // privilegedMode
        if (opts.privilegedMode !== undefined) {
            if (opts.privilegedMode) {
                this.args.push('--privileged')
            } else {
                this.args.push('--unprivileged')
            }
        }

        // data
        if (opts.data !== undefined) {
            if (typeof (opts.data) == 'string') {
                this.args.push('--data-string', `"${opts.data}"`)
            } else if (Buffer.isBuffer(opts.data)) {
                this.args.push('--data', opts.data.toString('hex'))
            }
        }

        // dryrun
        if (opts.dryrun && opts.scanType == 'list-scan') {
            this.args.push('-n')
        }

        this.addSimpleArgument('-iR', opts.random)
        this.addArrayArgument('--exclude', opts.exclude)
        this.addArrayArgument('--dns-servers', opts.dnsServer)
        this.addSwitchArgument('--system-dns', opts.useSystemDns)
        this.addSwitchArgument('--traceroute', opts.traceroute)
        this.addSimpleArgument('--ttl', opts.ttl)
        this.addSimpleArgument('-e', opts.interface)
        this.addSimpleArgument('-S', opts.sourceIp)
        this.addSimpleArgument('--source-port', opts.sourcePort)
        this.addSwitchArgument('-f', opts.fragment)
        this.addSimpleArgument('--mtu', opts.mtu)
        this.addArrayArgument('-D', opts.decoy)
        this.addArrayArgument('--proxies', opts.proxy)
        this.addSimpleArgument('--spoof-mac', opts.sourceMac)
        this.addSwitchArgument('-F', opts.fastScan)
        this.addSwitchArgument('--randomize-hosts', opts.randomizeHosts)
        this.addSwitchArgument('--badsum', opts.badsum)
        this.addSwitchArgument('-6', opts.ipv6)
        this.addSimpleArgument('-T', opts.timing)
        this.addSimpleArgument('--min-hostgroup', opts.minHostgroup)
        this.addSimpleArgument('--max-hostgroup', opts.maxHostgroup)
        this.addSimpleArgument('--min-parallelism', opts.minParallelism)
        this.addSimpleArgument('--max-parallelism', opts.maxParallelism)
        this.addSimpleArgument('--min-rate', opts.minRate)
        this.addSimpleArgument('--max-rate', opts.maxRate)
        this.addSwitchArgument('--defeat-rst-ratelimit', opts.ignoreRstRateLimit)
        this.addSwitchArgument('--defeat-icmp-ratelimit', opts.ignoreIcmpRateLimit)
        this.addSwitchArgument('--disable-arp-ping', opts.disableArpPing)
        this.addSimpleArgument('--initial-rtt-timeout', opts.initialRttTimeout)
        this.addSimpleArgument('--min-rtt-timeout', opts.minRttTimeout)
        this.addSimpleArgument('--max-rtt-timeout', opts.maxRttTimeout)
        this.addSimpleArgument('--max-retries', opts.maxRetries)
        this.addSimpleArgument('--host-timeout', opts.hostTimeout)
        this.addSimpleArgument('--script-timeout', opts.scriptTimeout)
        this.addSimpleArgument('--scan-delay', opts.scanDelay)
        this.addSimpleArgument('--max-scan-delay', opts.maxScanDelay, `${opts.maxScanDelay}ms`)
        this.addSimpleArgument('--nsock-engine', opts.nsockEngine)
        this.addSwitchArgument('-Pn', opts.skipHostDiscovery)
        this.addArrayArgument('--exclude-ports', opts.excludePort)
        this.addArrayArgument('-p', opts.port)
        this.addSimpleArgument('--port-ratio', opts.portRatio)
        this.addSimpleArgument('--top-ports', opts.topPorts)
        this.addSimpleArgument('-iR', opts.random)
        // this.addArrayArgument(undefined, opts.target, ' ')

        if (opts.target !== undefined) {
            if (Array.isArray(opts.target)) {
                this.args = this.args.concat(opts.target)
            } else {
                this.args.push(opts.target)
            }
        }

        return this.args as string[]
    }

    private addSwitchArgument(label: string, value: boolean) {
        if (value === undefined || !value) return

        this.args.push(label)
    }

    private addSimpleArgument(label: string, value: unknown, formattedValue?: unknown) {
        if (value === undefined) return

        const representation = formattedValue !== undefined ? formattedValue : value
        this.args.push(label, representation)
    }

    private addArrayArgument(label: string, value: unknown) {
        if (value === undefined) return

        if (label != undefined) {
            this.args.push(label)
        }

        this.args.push(Array.isArray(value) ? value.join(',') : value)
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
                    responseHost.reason = hostStatus['reason']
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
                            const openPort = {
                                number: Number(port['portid']),
                                protocol: port['protocol'],
                                state: port['state']['state'],
                                reason: port['state']['reason'],
                                ttl: Number(port['state']['reason_ttl'])
                            } as Port

                            if (port['service'] !== undefined)
                                openPort.service = port['service']['name']

                            responseHost.ports.push(openPort)
                        })
                    }
                }

                this.response.hosts.push(responseHost)
            })
        }
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
                    return reject(`Nmap child process has exited with code: ${code}`)
                }

                resolve(childOutput)
            })
        })
    }
}