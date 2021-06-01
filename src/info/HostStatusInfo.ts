export default interface HostStatusInfo {
    state: 'up' | 'down'
    reason: 'arp-response' | 'user-set'
    ttl: number
}