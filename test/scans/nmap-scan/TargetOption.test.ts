import { expect } from 'chai'
import { TestableNmapScan } from './NmapScan.test'

describe('Option: target', () => {
    let scan: TestableNmapScan
    let argString: string

    it('Single target hostname', () => {
        scan = new TestableNmapScan({
            target: 'www.google.com'
        })
        argString = scan.constructArguments().join(' ')

        expect(argString.endsWith('www.google.com')).to.be.true
    })

    it('Multiple target hostnames', () => {
        scan = new TestableNmapScan({
            target: ['www.google.com', 'www.cloudflare.com']
        })
        argString = scan.constructArguments().join(' ')

        expect(argString.endsWith('www.google.com www.cloudflare.com')).to.be.true
    })

    it('Single target address', () => {
        scan = new TestableNmapScan({
            target: '1.1.1.1'
        })
        argString = scan.constructArguments().join(' ')

        expect(argString.endsWith('1.1.1.1')).to.be.true
    })

    it('Multiple target hostnames', () => {
        scan = new TestableNmapScan({
            target: ['1.1.1.1', '8.8.8.8']
        })
        argString = scan.constructArguments().join(' ')

        expect(argString.endsWith('1.1.1.1 8.8.8.8')).to.be.true
    })

    it('Mixed target address types', () => {
        scan = new TestableNmapScan({
            target: ['1.1.1.1', 'www.google.com']
        })
        argString = scan.constructArguments().join(' ')

        expect(argString.endsWith('1.1.1.1 www.google.com')).to.be.true
    })
})