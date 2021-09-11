# Network Mapper

Nmap wrapper for node fully coded in TypeScript.

This module is still in heavy development. As of now only the list scan is implemented, further more advanced scans will be implemented.

[![Linux build](https://github.com/stogoh/network-mapper/actions/workflows/build-linux.yml/badge.svg?branch=master&event=push)](https://github.com/stogoh/network-mapper/actions/workflows/build-linux.yml)
![NPM](https://img.shields.io/npm/l/network-mapper?label=License)
![npm](https://img.shields.io/npm/dt/network-mapper?label=Downloads)

## Installation

Installation is done using the `npm install` command:

```
npm install network-mapper
```

This package requires that [Nmap](https://nmap.org/) is installed and available to the node application.

## Features

-   Awaitable functions which may take a few seconds

## Usage

### Simple list scan

The following example scans the specified target network for hosts.

```typescript
import { ListScan } from 'network-mapper'

async function main() {
    const scan = new ListScan({
        target: '192.168.1.1/24'
    })

    const result = await scan.run()
    console.log(result)
}

main()
```

### List scan with excluded addresses and reverse lookup

The following example scans a specified target network. The first and last hosts in the network are excluded from the network scan. The hostnames are resolved via the specified DNS resolvers.

```typescript
import { ListScan } from 'network-mapper'

async function main() {
    const scan = new ListScan({
        target: '192.168.1.1/24',
        exclude: ['192.168.1.0', '192.168.1.255'],
        dnsServer: ['1.1.1.1', '8.8.8.8']
    })

    const result = await scan.run()
    console.log(result)
}

main()
```

### Nmap scan with traceroute

The following example uses the core NmapScan. A ping scan is used to discover if the hosts are up. For each host which is up the route will be determined. Additionally for each hop a reverse lookup is executed.

```typescript
import { NmapScan } from 'network-mapper'

async function main() {
    const scan = new NmapScan({
        scanType: 'ping-scan',
        target: 'google.com/24',
        dnsServer: ['8.8.8.8', '8.8.4.4'],
        resolve: 'all',
        traceroute: true
    })

    const result = await scan.run()
    console.log(result)
}

main()
```

## Scan Types

-   `ListScan` Lists each host of the network(s) specified, without sending any packets to the target hosts.
-   `NmapScan` This is the core scan of the package, using this scan type directly will allow you to run very customized scans.

## Options

### target

Specifies which targets to scan. The [Target Specification](https://nmap.org/book/man-target-specification.html) syntax from Nmap can be used. The option allows either a string or string array as an argument.

When a hostname is given as a target, it is resolved via the domain name system.

### exclude

Specifies targets hosts to be excluded from the scan. The hosts passed can include hostnames, CIDR netblocks, IP ranges, etc.

### excludePort

Specifies ports which are excluded from the scan.

### random

For larger network scans it might be useful to choose target hosts at random. Using this option an amount of random hosts can be specified.

### randomizeHosts

The underlying Nmap process scans the hosts in order. Some IDS(Intrusion detection systems) might detect that an block following requests. When set Nmap randomizes the targets to scan.

### resolve

Specifies for which IP addresses a reverse DNS lookup is run.

-   `never` Do not run reverse DNS lookup for any address
-   `sometimes` Nmap decides which addresses to run a reverse DNS lookup
-   `always` Try to resolve each target host address
-   `all` Also resolve all hosts addresses which are a part of the traceroute

### useSystemDns

By default, Nmap uses a custom stub resolver which performs dozends of requests in parallel. This option can be used to force use the system's DNS resolver. Using the system resolver can drastically increase the resolve time for each host.

### dnsServer

By default, Nmap uses the system specified DNS servers to resolve IP addresses. A custom list of DNS resolver can be specified which this option.

### dryrun

Before running large network scans it might be useful to run a dryrun fist. This dryrun will not send any network packages at all. The response still return the addresses which will be scanned.

### traceroute

Determine all intermediate hops between the scanner and target host. This works by sending packets with a low TTL (time-to-live) in an attempt to elicit ICMP Time Exceeded message from the intermediate hops. By increasing the TTL until the target host is reached, the traceroute can be determined.

### timing

The timing templates can be used to slowdown or speedup network scans. Instead of using the fine-grained controls, using the timing option is a lot easier to use and they have a very similar effect on the scan.

### ttl

The IPv4 time-to-live field in sent packets to the given value. Value must be within 0 and 255.

### fastScan

Specifies that you wish to scan fewer ports than the default. Normally Nmap scans the most common 1,000 ports for each scanned protocol. With this option, this is reduced to 100.

### hostTimeout

Some hosts simply take a long time to scan. This may be due to poorly performing or unreliable networking hardware or software, packet rate limiting, or a restrictive firewall. Use this option to specify the host timeout before the host is skipped.

### minHostgroup

Specifies the minimum group size in which a scan is divided into.

### maxHostgroup

Specifies the maximum group size in which a scan is divided into.

### minParallelism

Set this option to a number higher than one to speed up scans on poorly performing hosts or networks. This is a risky options to play with, as setting it too high may affect accuracy.

### maxParallelism

Specifies the maximal total number of probes outstanding for a host group. This options is sometimes set to one to prevent Nmap from sending more than one probe at a time to hosts.

### initialRttTimeout

Specifies the initial timeout value for determining how long it will wait for a probe response before giving up or retransmitting the probe.

### minRttTimeout

This option is a rarely used option that could be useful when a network is so unreliable that even Nmap's default is too aggressive.

### maxRttTimeout

Specifies the maximal timeout value for a probe's round trip time. If a probe takes longer than the specified time it will be retransmitted until the `maxRetries` value is reached.

### maxRetries

Specifies the amount of times a probe is retransmitted after it timed out. Set the option to 0 to prevent any retransmissions.

### scriptTimeout

Specifies the timeout value for the execution of a script. Any script instance which exceeds that time will be terminated and no output will be shown.

### scanDelay

Specifies the least given amount of time between each probe send to a given host.

### maxScanDelay

When Nmap adjusts the scan delay upward to cope with rate limiting, the scan slows down dramatically. This options specifies the largest delay the is allowed.

### ignoreRstRateLimit

This options tells Nmap to ignore RST response packets.

### ignoreIcmpRateLimit

This options increases UDP scanning speed by ignoring ICMP error messages with are returned my a rate-limiting host.

### nsockEngine

Enforces the use of the given nsock IO multiplexing engine. Keep in mind that not all engines will be available on all systems. Currently the following engines are implemented in the underlying application.

-   `epoll`
-   `kqueue`
-   `poll`
-   `select`
-   `iocp`

### minRate

Enforces Nmap to send the specified amount of packages per second. Specifying a minimum rate should be done with care. Scanning faster than a network support may lead to loss of accuracy.

### maxRate

Specifies the amount of packages Nmap is allowed per second.

### fragment

Ths options causes the requested scan to use tiny fragmented IP packets. If a custom MTU value is set this options should not be used. Fragmentation is only supported for raw scans which include TCP and UDP (except connect scan und FTP bounce scan) and OS detection.

### mtu

Specifies the length of the fragmented IP packet. The value must be a multiple of eight.

### decoy

Causes a decoy scan to be performed, which makes it appear to the remote host that the host(s) you specify as decoys are scanning the target network too. Note that the hosts you use as decoys should be up or the target might get SYN flooded.

### sourceIp

In some circumstances, Nmap may not be able to determine your source address. In this case use this option with the IP address of the interface which should be used to send packets through.

This option can also be used to spoof the source IP address. Note that in this case no reply packets will be received since their ar addressed to the spoofed IP address.

### interface

Tells Nmap what interface to send and receive packets on. Nmap should be able to detect this automatically, but it will tell you if it cannot.

### sourcePort

Specifies on which port Nmap send packets from. Most scanning operations that use raw sockets, including SYN and UDP scans, support the option completely.

### sourceMac

Specifies which MAC address to use for sending raw ethernet frames.

### proxy

Establishes TCP connections with a final target through supplied chain of one or more HTTP or SOCKS4 proxies.

### badsum

Uses an invalid TCP, UDP or SCTP checksum for packets sent to target hosts.

### ipv6

Enforces the use of IPv6 addresses.

### sendMechanism

Forces Nmap to use the specified send mechanism.

-   `ip` Sends packets via raw IP sockets rather than sending lower level ethernet frames.
-   `eth` Sends packets at the raw ethernet (data link) layer rather than the higher IP (network) layer.
-   `auto` Tells Nmap to automatically select the proper send mechanism. Same as not defining the send mechanism.

### disableArpPing

Nmap normally does ARP or IPv6 Neighbor Discovery discovery of locally connected ethernet hosts, even if other host discovery options are used. Use this option to disable this implicit behavior.

### randomizePorts

By default, the ports to be scanned are randomized. This randomization is normally desirable. Set this options to false to scan the ports in sequential order instead.

### skipHostDiscovery

This option skips the host discovery stage altogether. This options is necessary, when target hosts do not respond to ICMP ping
packets.

### port

Only scan the specified ports. This options specifies which ports should be scanned and overrides the default. Ports can also be specified by name according to what the port is referred in the _nmap-services_ file.

### portRatio

Scans all ports in the _nmap-services_ file with a ratio greater that the given value. The value must be between 0.0 and 1.0.

### topPorts

Scans the specified highest ratio ports found in the _nmap-services_ file after excluding all port specified by `excludePort`. The value must be 1 or greater.
