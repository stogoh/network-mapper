import HostInfo from '../info/HostInfo'

export default interface NmapScanResponse {
    version: string
    timestamp: Date
    duration: number
    hosts: HostInfo[]
}