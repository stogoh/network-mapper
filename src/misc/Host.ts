import { Hop } from './Hop'
import Port from './Port'
import Script from './Script'

export default interface Host {
    state?: 'up' | 'down'
    reason?: 'arp-response' | 'user-set'
    ttl?: number
    hostnames?: string[]
    ipAddress?: string
    mac?: string
    vendor?: string
    hops?: Hop[]
    ports?: Port[]
    scripts?: Script[]
}