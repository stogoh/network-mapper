export type PortScanMethod = 'tcp-syn' | 'tcp-ack' | 'tcp-connect' | 'tcp-null' | 'tcp-fin' | 'tcp-xmas' | 'tcp-window' | 'tcp-maimon' | 'tcp-idle'
export type PortScanningTechnique = {
    [k in PortScanMethod]?: number | number[] | string | string[]
}

export interface PortOption {
    port?: string | string[] | number | number[] | PortScanningTechnique // For IP scanning this is protocol number (0-255)
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