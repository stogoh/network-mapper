import { ListScanOption } from './ListScanOption'
import { NmapScanOption } from '../nmap-scan/NmapScanOption'
import { NmapScan } from '../nmap-scan/NmapScan'

export class ListScan extends NmapScan {

    constructor(opts: ListScanOption) {
        super(opts)

        const superOpts = opts as NmapScanOption
        superOpts.scanType = 'list-scan'
    }
}