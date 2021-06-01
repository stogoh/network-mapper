export enum ScanType {
    Ping = '-sn',
    TcpSyn = '-sS',
    TcpConnect = '-sT',
    TcpAck = '-sA',
    TcpWindow = '-sW',
    TcpMaimon = '-sM',
    TcpNull = '-sN',
    TcpFin = '-sF',
    TcpXmas = '-sX',
    Udp = '-sU',
    SctpInit = '-sY',
    SctpCookieEcho = '-sZ',
    Protocol = '-sO',
    List = '-sL'
}