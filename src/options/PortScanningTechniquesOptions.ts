export type CustomTcpScanFlag = 'URG' | 'ACK' | 'PSH' | 'RST' | 'SYN' | 'FIN'

export interface ScanflagOption {
    scanflag?: CustomTcpScanFlag | CustomTcpScanFlag[]
}

export interface ZombieHostOption {
    zombieHost?: string // Used when 'tcp-idle' (-sI)
}

export interface ZombiePortOption {
    zombiePort?: number // Used when 'tcp-idle' (-sI)
}

export interface FtpRelayOption {
    ftpRelay?: string // Deprecated
}