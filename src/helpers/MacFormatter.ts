export type MacFormat = 'lowercase-not-seperated' | 'lowercase-colon-seperated' | 'lowercase-hypen-seperated' | 'lowercase-period-seperated' | 'uppercase-not-seperated' | 'uppercase-colon-seperated' | 'uppercase-hypen-seperated' | 'uppercase-period-seperated'

export function formatMac(input: string, format: MacFormat): string {
    const normalizedInput = input.replace(/[^0-9a-f]/gi, '').toLowerCase()

    if (normalizedInput.length != 12) {
        return null
    }

    switch (format) {
        case 'lowercase-not-seperated':
            return normalizedInput

        case 'lowercase-colon-seperated':
            return normalizedInput.match(/.{1,2}/g).join(':')

        case 'lowercase-hypen-seperated':
            return normalizedInput.match(/.{1,2}/g).join('-')

        case 'lowercase-period-seperated':
            return normalizedInput.match(/.{1,3}/g).join('.')

        case 'uppercase-not-seperated':
            return normalizedInput.toUpperCase()

        case 'uppercase-colon-seperated':
            return normalizedInput.match(/.{1,2}/g).join(':').toUpperCase()

        case 'uppercase-hypen-seperated':
            return normalizedInput.match(/.{1,2}/g).join('-').toUpperCase()

        case 'uppercase-period-seperated':
            return normalizedInput.match(/.{1,3}/g).join('.').toUpperCase()

        default:
            return null
    }
}