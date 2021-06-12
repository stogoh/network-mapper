import { NmapScan } from './scans/nmap-scan/NmapScan'

async function main() {

    const scan = new NmapScan({
        scanType: 'list-scan',
        target: '192.168.1.1/24',
        resolve: 'always'
    })

    const result = await scan.run()
    console.log(result)
    
}

main()