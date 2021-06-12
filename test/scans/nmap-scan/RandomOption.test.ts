import { expect } from 'chai'
import { TestableNmapScan } from './NmapScan.test'

describe('Option: random', () => {

    it('Argument existing', () => {
        const scan = new TestableNmapScan({
            scanType: 'list-scan',
            dryrun: true,
            random: 50
        })
        const argString = scan.constructArguments().join(' ')

        expect(argString).to.contain('-iR 50')
    })

    it('Response contains maximal the defined random host count', async () => {
        const scan = new TestableNmapScan({
            scanType: 'list-scan',
            target: '192.168.1.1/24',
            dryrun: true,
            random: 50
        })
        const argString = scan.constructArguments().join(' ')
        const result = await scan.run()

        expect(result.hosts.length).to.be.lessThanOrEqual(50)
    })
})

