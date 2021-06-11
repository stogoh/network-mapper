export interface FragmentOption {
    fragment?: boolean
}

export interface MtuOption {
    mtu?: number
}

export interface DecoyOption {
    decoy?: string | string[]
}

export interface SourceInterfaceOption {
    sourceInterface?: string
}

export interface SourceIpOption {
    sourceIp?: string
}

export interface SourcePortOption {
    sourcePort?: number
}

export interface ProxyOption {
    proxy?: string | string[]
}

export interface DataOption {
    data?: Buffer | string
}

export interface TtlOption {
    ttl?: number
}

export interface SourceMacOption {
    sourceMac?: string
}

export interface BadsumOption {
    badsum?: boolean
}