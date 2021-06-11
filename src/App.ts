import { writeFileSync } from 'fs'
import ListScan from './scans/list-scan/ListScan'

async function main() {

    const Scan1 = new ListScan({
        target: '192.168.1.1/24',
        resolve: 'never'
    })
    const result = await Scan1.run()
    writeFileSync('result.json', JSON.stringify(result, null, 2))

}

main()