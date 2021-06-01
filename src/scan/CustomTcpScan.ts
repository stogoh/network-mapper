import { ListScanOptions, NmapScanOptions } from '../misc/NmapScanOptions'
import NmapScanResponse from '../response/NmapScanResponse'
import { NmapScan } from './NmapScan'

export type CustomTcpScanFlag = 'URG' | 'ACK' | 'PSH' | 'RST' | 'SYN' | 'FIN'

export default class CustomTcpScan extends NmapScan<NmapScanResponse> {

    constructor(flag: CustomTcpScanFlag, opts?: ListScanOptions) {
        super(opts)
        
        const superOpts = (opts as NmapScanOptions)
        superOpts.scanflag = flag
    }

}