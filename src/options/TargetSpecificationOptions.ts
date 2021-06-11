import { PortScanMethod } from './PortSpecificationOptions'

export type ScanType = 'list-scan' | 'ping-scan' | 'protocol-scan'

export interface ScanTypeOption {
    scanType?: ScanType
}

export interface PortScanMethodOption {
    portScanMethod?: PortScanMethod
}

export interface TargetOption {
    target?: string | string[]
}

export interface RandomOption {
    /**
     * Defines the amount of random target to be scanned.
     */
    random?: number
}

export interface ExcludeOption {
    exlude?: string | string[]
}