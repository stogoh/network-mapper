export type ResolveRule = 'never' | 'sometimes' | 'always' | 'all'

export interface DnsServerOption {
    dnsServer?: string | string[]
}

export interface UseSystemDnsOption {
    useSystemDns?: boolean
}

export interface ResolveOption {
    resolve?: ResolveRule
}

export interface ScanAllOption {
    scanAll?: boolean
}

export interface TracerouteOption {
    traceroute?: boolean
}

export interface RandomizeHostsOption {
    randomizeHosts?: boolean
}

export interface SkipHostDiscoveryOption {
    skipHostDiscovery?: boolean // -Pn
}

export interface IgnoreRstOption {
    ignoreRst?: boolean
}

export interface DisableArpPingOption {
    disableArpPing?: boolean
}

export interface IntensityOption {
    intensity?: number // --version-intensity option
}