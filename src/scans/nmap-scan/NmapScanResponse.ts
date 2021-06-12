import Host from '../../misc/Host'

export default interface NmapScanResponse {
    version?: string
    timestamp?: Date
    nmapArguments?: string
    duration?: number
    hosts?: Host[]
}