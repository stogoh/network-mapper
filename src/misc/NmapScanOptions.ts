import { HostDiscoveryType } from '../App'
import { CustomTcpScanFlag } from '../scan/CustomTcpScan'
import { ScanFlag } from './ScanFlag'
import { ScanType } from './ScanType'

export interface NmapScanOptions {
    scanType?: HostDiscoveryType | HostDiscoveryType[]
    
    /** ---------- Target Specification ---------- */
    target: string | string[]
    random?: number
    exlude?: string | string[]

    /** ---------- Host Discovery ---------- */
    dnsServer?: string | string[]
    useSystemDns?: boolean
    resolve?: 'never' | 'sometimes' | 'always'
    scanAll?: boolean
    traceroute?: boolean
    skipHostDiscovery?: boolean

    /** ---------- Port Scanning Techniques ---------- */
    scanflag?: CustomTcpScanFlag | CustomTcpScanFlag[]
    zombieHost?: string
    zombiePort?: number
    ftpRelay?: string

    /** ---------- Port Specification and Scan Order ---------- */
    port?: string | string[] | number | number[] // For IP scanning this is protocol number (0-255)
    excludePort?: string | string[] | number | number[] // For IP scanning this is protocol number (0-255)
    fastScan?: boolean
    consecutively?: boolean
    topPorts?: number
    portRatio?: number

    /** ---------- Service and Version Detection ---------- */
    versionDetection?: boolean // -sV and -sR are the same
    forceScanAllPorts?: boolean
    versionIntensity?: number
    versionTrace?: boolean

    /** ---------- OS Detection ---------- */
    osDetection?: boolean

    /** ---------- Firewall/IDS Evasion and Spoofing ---------- */
    fragment?: boolean
    mtu?: number
    decoy?: string | string[]
    sourceInterface?: string
    sourceIp?: string
    sourcePort?: number
    proxy?: string | string[]
    data?: Buffer | string
    ttl?: number
    sourceMac?: string
    badsum?: boolean
    
    /** ---------- Timing and Performance ---------- */
    minHostgroup?: number
    maxHostgroup?: number
    minParallelism?: number
    maxParallelism?: number
    minRttTimeout?: number
    maxRttTimeout?: number
    initialRttTimeout?: number
    maxRetries?: number
    hostTimeout?: number
    scriptTimeout?: number
    scanDelay?: number
    maxScalDelay?: number
    minRate?: number
    maxRate?: number
    defeatRestRateLimit?: number
    defeatIcmpRateLimit?: number
    nsockEngine?: 'epoll' | 'kqueue' | 'poll' | 'select'
    timing?: 'paranoid' | 'sneaky' | 'polite' | 'normal' | 'aggressive' | 'insane'

    /** ---------- Miscellaneous Options ---------- */
    ipv6?: boolean
    sendMechanism?: 'eth' | 'ip' | 'auto'
    forceMemoryRelease?: boolean
    dryrun?: boolean
    privilegedMode?: boolean
}

export interface ListScanOptions {
    target: string | string[]
    resolve?: 'never' | 'sometimes' | 'always'
}