import { expect } from 'chai'
import { formatMac } from '../../src/helpers/MacFormatter'

describe('MAC address formatting', () => {

    const input = 'aa-bb-cc-00-11-22'

    it('Check fomratting: lowercase-not-seperated', () => {
        expect(formatMac(input, 'lowercase-not-separated')).to.equal('aabbcc001122')
    })

    it('Check fomratting: lowercase-colon-seperated', () => {
        expect(formatMac(input, 'lowercase-colon-separated')).to.equal('aa:bb:cc:00:11:22')
    })

    it('Check fomratting: lowercase-hypen-seperated', () => {
        expect(formatMac(input, 'lowercase-hyphen-separated')).to.equal('aa-bb-cc-00-11-22')
    })

    it('Check fomratting: lowercase-period-seperated', () => {
        expect(formatMac(input, 'lowercase-period-separated')).to.equal('aab.bcc.001.122')
    })

    it('Check fomratting: uppercase-not-seperated', () => {
        expect(formatMac(input, 'uppercase-not-separated')).to.equal('AABBCC001122')
    })

    it('Check fomratting: uppercase-colon-seperated', () => {
        expect(formatMac(input, 'uppercase-colon-separated')).to.equal('AA:BB:CC:00:11:22')
    })

    it('Check fomratting: uppercase-hypen-seperated', () => {
        expect(formatMac(input, 'uppercase-hyphen-separated')).to.equal('AA-BB-CC-00-11-22')
    })

    it('Check fomratting: uppercase-period-seperated', () => {
        expect(formatMac(input, 'uppercase-period-separated')).to.equal('AAB.BCC.001.122')
    })

})