import { writeFile } from 'fs/promises'
import { ScanType } from './misc/ScanType'
import NmapScanResponse from './response/NmapScanResponse'
import CustomTcpScan from './scan/CustomTcpScan'
import { ListScan } from './scan/ListScan'
import { NmapScan } from './scan/NmapScan'

export type HostDiscoveryType = 'list-scan' | 'no-port-scan' | 'no-ping' | 'tcp-syn' | 'tcp-ack' | 'udp-ping' | 'sctp-init'

async function main() {

    const scan = new ListScan({
        target: '192.168.1.1/24',
        resolve: 'sometimes'
    })

    const result = await scan.run()

    console.log(result)
    
}

main()