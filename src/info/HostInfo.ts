import HostStatusInfo from './HostStatusInfo'

export default interface HostInfo {
    status?: HostStatusInfo
    ipAddress?: string
    mac?: string
}