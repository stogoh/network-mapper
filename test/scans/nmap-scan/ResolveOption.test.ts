import { expect } from 'chai'
import { TestableNmapScan } from './NmapScan.test'

describe('Option: resolve', () => {
    const scan = new TestableNmapScan({})

    it('Argument: \'never\'', async () => {
        const scan = new TestableNmapScan({
            scanType: 'list-scan',
            target: '1.1.1.1',
            resolve: 'never'
        })
        const result = await scan.run()

        expect(result.hosts[0].hostnames).to.be.undefined
    })
})