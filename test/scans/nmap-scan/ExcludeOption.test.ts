import { expect } from 'chai'
import { TestableNmapScan } from './NmapScan.test'

describe('Option: exclude', () => {    
    it('Exclude single address', async () => {
        const scan = new TestableNmapScan({
            scanType: 'list-scan',
            dryrun: true,
            target: '192.168.1.1/24',
            exlude: '192.168.1.100'
        })
        const argString = scan.constructArguments().join(' ')
        const result = await scan.run()

        expect(argString, 'Argument existing').to.contain('--exclude 192.168.1.100')
        expect(argString, 'Target existing').to.contain('192.168.1.1/24')
        expect(result.hosts, 'Response hosts list length').to.have.lengthOf(255)
        expect(result.hosts.find(h => h.ipAddress == '192.168.1.100'), 'Excluded address not in result').to.be.undefined
    })

    it('Exclude multiple addresses', async () => {
        const scan = new TestableNmapScan({
            scanType: 'list-scan',
            dryrun: true,
            target: '192.168.1.1/24',
            exlude: ['192.168.1.100', '192.168.1.200']
        })
        const argString = scan.constructArguments().join(' ')
        const result = await scan.run()

        expect(argString, 'Argument existing').to.contain('--exclude 192.168.1.100,192.168.1.200')
        expect(argString, 'Target existing').to.contain('192.168.1.1/24')
        expect(result.hosts, 'Response hosts list length').to.have.lengthOf(254)
        expect(result.hosts.find(h => h.ipAddress == '192.168.1.100'), 'First excluded address not in result').to.be.undefined
        expect(result.hosts.find(h => h.ipAddress == '192.168.1.200'), 'Second excluded address not in result').to.be.undefined
    })
})

