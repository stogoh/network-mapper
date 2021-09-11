export interface PortOption {
    port?: string | string[] | number | number[] // For IP scanning this is protocol number (0-255)
}

export interface ExcludePortOption {
    excludePort?: string | string[] | number | number[] // For IP scanning this is protocol number (0-255)
}

export interface FastScanOption {
    fastScan?: boolean
}

export interface RandomizePortsOption {
    randomizePorts?: boolean
}

export interface TopPortsOption {
    topPorts?: number
}

export interface PortRatioOption {
    portRatio?: number
}