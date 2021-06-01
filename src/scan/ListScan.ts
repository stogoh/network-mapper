import { ListScanOptions, NmapScanOptions } from '../misc/NmapScanOptions'
import { ScanType } from '../misc/ScanType'
import NmapScanResponse from '../response/NmapScanResponse'
import { NmapScan } from './NmapScan'

export class ListScan extends NmapScan<NmapScanResponse> {

    constructor(opts: ListScanOptions) {
        super(opts)

        const superOpts = (opts as NmapScanOptions)
        superOpts.scanType = 'list-scan'
    }

    protected async parse() {
        await super.parse()

        const run = this.rawResponse['nmaprun']

        // hosts
        const hosts = run['host']
        if (hosts) {
            this.response.hosts = []
            hosts.forEach(host => {
                
                // status
                const hostStatus = host['status']
                if (hostStatus) {
                    this.response.hosts.push({
                        status: {
                            state: hostStatus['state'],
                            reason: hostStatus['reason'],
                            ttl: hostStatus['reason_ttl']
                        }
                    })
                }

                // ipAddress
                
            })
        }

    }

}