export type SendMechanism = 'eth' | 'ip' | 'auto'

export interface Ipv6Option {
    ipv6?: boolean
}

export interface SendMechanismOption {
    sendMechanism?: SendMechanism
}

export interface ForceMemoryReleaseOption {
    forceMemoryRelease?: boolean
}

export interface DryrunOption {
    dryrun?: boolean // Only for Listscan (-sL)
}

export interface PrivilegedModeOption {
    privilegedMode?: boolean
}