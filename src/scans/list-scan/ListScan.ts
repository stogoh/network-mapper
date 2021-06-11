import { ListScanOption } from './ListScanOption'
import { NmapScanOption } from '../nmap-scan/NmapScanOption'
import ListScanResponse from './ListScanResponse'
import { NmapScan } from '../nmap-scan/NmapScan'

export default class ListScan extends NmapScan<ListScanOption, ListScanResponse> {

    constructor(opts: ListScanOption) {
        super(opts)

        const superOpts = opts as NmapScanOption
        superOpts.scanType = 'list-scan'
    }
}