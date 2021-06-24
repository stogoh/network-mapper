import { expect } from 'chai'
import { compareIpAddress } from '../../../src/helpers/IpAddressComparer'
import { TestableNmapScan } from './NmapScan.test'

describe('Option: randomizeHosts', () => {
    it('Hosts not randomized', async () => {
        const scan = new TestableNmapScan({
            scanType: 'list-scan',
            target: '192.168.1.1/24',
            randomizeHosts: false,
            dryrun: true
        })

        const result = await scan.run()
        const addesses = result.hosts.map(x => x.ipAddress)
        const sortedAddesses = [...addesses].sort(compareIpAddress)    

        expect(result.nmapArguments, 'Argument not existing').to.not.contain('--randomize-hosts')
        expect(addesses, 'Ordered hosts').to.be.deep.equal(sortedAddesses)      
    })
    
    it('Host randomized', async () => {
        const scan = new TestableNmapScan({
            scanType: 'list-scan',
            target: '192.168.1.1/24',
            randomizeHosts: true,
            dryrun: true
        })
        
        const result = await scan.run()
        const addesses = result.hosts.map(x => x.ipAddress)
        const sortedAddesses = [...addesses].sort(compareIpAddress)    
        
        expect(result.nmapArguments, 'Argument existing').to.contain('--randomize-hosts')
        expect(addesses, 'Randomized hosts').not.to.be.deep.equal(sortedAddesses)      
    })
})