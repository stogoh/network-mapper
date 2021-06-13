import { expect } from 'chai'
import { NmapScanOption } from '../../../src/scans/nmap-scan/NmapScanOption'
import { NmapScan } from '../../../src/scans/nmap-scan/NmapScan'

export class TestableNmapScan extends NmapScan {
    public constructArguments() {
        return super.constructArguments()
    }
}

describe('Output format', () => {
    const scan = new TestableNmapScan({})
    const argString = scan.constructArguments().join(' ')

    it('Output mode to console is in XML format', () => {
        expect(argString, 'Output mode XML missing').contains('-oX -')
    })
})

