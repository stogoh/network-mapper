// import { expect } from 'chai'
// import NmapScanResponse from '../../../src/scans/nmap-scan/NmapScanResponse'
// import { TestableNmapScan } from './NmapScan.test'

// describe('Option: traceroute', () => {
//     const scan = new TestableNmapScan({})

//     it('Argument not defined', async () => {
//         const scan = new TestableNmapScan({
//             scanType: 'list-scan',
//             target: 'www.google.com' 
//         })
//         const result = await scan.run()

//         expect(result.nmapArguments).to.not.contain('--traceroute')
//         expect(result.hosts[0].hops).to.be.undefined
//     })

//     it('Argument not existing', async () => {
//         const scan = new TestableNmapScan({
//             scanType: 'list-scan',
//             target: 'www.google.com',
//             traceroute: false    
//         })
//         const result = await scan.run()

//         expect(result.nmapArguments).to.not.contain('--traceroute')
//         expect(result.hosts[0].hops).to.be.undefined
//     })

//     it('Argument existing', async () => {
//         const scan = new TestableNmapScan({
//             scanType: 'list-scan',
//             target: 'www.google.com',
//             traceroute: true    
//         })
//         const result = await scan.run()

//         console.log(result.hosts[0])
        

//         expect(result.nmapArguments).to.contain('--traceroute')
//         expect(result.hosts[0].hops).to.not.be.undefined
//     })
// })