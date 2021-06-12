import { expect } from 'chai'
import { formatMac } from '../../src/helpers/MacFormatter'

describe('MAC address formatting', () => {

    const input = 'aa-bb-cc-00-11-22'

    it('Check fomratting: lowercase-not-seperated', () => {
        expect(formatMac(input, 'lowercase-not-seperated')).to.equal('aabbcc001122')
    })

    it('Check fomratting: lowercase-colon-seperated', () => {
        expect(formatMac(input, 'lowercase-colon-seperated')).to.equal('aa:bb:cc:00:11:22')
    })

    it('Check fomratting: lowercase-hypen-seperated', () => {
        expect(formatMac(input, 'lowercase-hypen-seperated')).to.equal('aa-bb-cc-00-11-22')
    })

    it('Check fomratting: lowercase-period-seperated', () => {
        expect(formatMac(input, 'lowercase-period-seperated')).to.equal('aab.bcc.001.122')
    })

    it('Check fomratting: uppercase-not-seperated', () => {
        expect(formatMac(input, 'uppercase-not-seperated')).to.equal('AABBCC001122')
    })

    it('Check fomratting: uppercase-colon-seperated', () => {
        expect(formatMac(input, 'uppercase-colon-seperated')).to.equal('AA:BB:CC:00:11:22')
    })

    it('Check fomratting: uppercase-hypen-seperated', () => {
        expect(formatMac(input, 'uppercase-hypen-seperated')).to.equal('AA-BB-CC-00-11-22')
    })

    it('Check fomratting: uppercase-period-seperated', () => {
        expect(formatMac(input, 'uppercase-period-seperated')).to.equal('AAB.BCC.001.122')
    })

})