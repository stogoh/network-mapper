import Nmap from '../misc/Nmap'

export type MacFormat = 'lowercase-not-separated' | 'lowercase-colon-separated' | 'lowercase-hyphen-separated' | 'lowercase-period-separated' | 'uppercase-not-separated' | 'uppercase-colon-separated' | 'uppercase-hyphen-separated' | 'uppercase-period-separated'

export function formatMac(input: string, format: MacFormat = Nmap.default.macFormatting): string {
    const normalizedInput = input.replace(/[^0-9a-f]/gi, '').toLowerCase()

    if (normalizedInput.length != 12) {
        return null
    }

    switch (format) {
        case 'lowercase-not-separated':
            return normalizedInput

        case 'lowercase-colon-separated':
            return normalizedInput.match(/.{1,2}/g).join(':')

        case 'lowercase-hyphen-separated':
            return normalizedInput.match(/.{1,2}/g).join('-')

        case 'lowercase-period-separated':
            return normalizedInput.match(/.{1,3}/g).join('.')

        case 'uppercase-not-separated':
            return normalizedInput.toUpperCase()

        case 'uppercase-colon-separated':
            return normalizedInput.match(/.{1,2}/g).join(':').toUpperCase()

        case 'uppercase-hyphen-separated':
            return normalizedInput.match(/.{1,2}/g).join('-').toUpperCase()

        case 'uppercase-period-separated':
            return normalizedInput.match(/.{1,3}/g).join('.').toUpperCase()

        default:
            return null
    }
}