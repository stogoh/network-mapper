export default interface Port {
    number: number
    service?: string
    protocol?: 'tcp' | 'udp'
    state?: string
    reason?: string
    ttl?: number
    script?: string[]
}