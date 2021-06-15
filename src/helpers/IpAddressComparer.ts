export function compareIpAddress(a: string, b: string): number {
    const numA = Number(a.split('.').map((num) => (`000${num}`).slice(-3) ).join(''))
    const numB = Number(b.split('.').map((num) => (`000${num}`).slice(-3) ).join(''))

    return numA - numB
}