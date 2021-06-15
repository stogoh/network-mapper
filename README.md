# Network Mapper

Nmap wrapper for node fully coded in TypeScript.

This module is still in heavy development. As of now only the list scan is implemented, further more advanced scans will be implemented.

![NPM](https://img.shields.io/npm/l/network-mapper?label=License)
![npm](https://img.shields.io/npm/dt/network-mapper?label=Downloads)
![GitHub issues](https://img.shields.io/github/issues/stogoh/network-mapper?label=Issues)
![GitHub pull requests](https://img.shields.io/github/issues-pr/stogoh/network-mapper?label=Pull%20Requests)

## Installation

Installation is done using the `npm install` command:

```
npm install network-mapper
```

This package requires that [Nmap](https://nmap.org/) installed and available to the node application.

## Features

- Awaitable functions which may take a few seconds

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

- `ListScan` Lists each host of the network(s) specified, without sending any packets to the target hosts.
- `NmapScan` This is the core scan of the package, using this scan type directly will allow to run very customized scans.

## Options

### **target**

Specifies which targets to scan. The [Target Specification](https://nmap.org/book/man-target-specification.html) syntax from Nmap can be used. The option allows either a string or string array as an argument.

When a hostname is given as a target, it is resolved via the domain name system.

### **exclude**

Specifies targets hosts to be excluded from the scan. The hosts passed can include hostnames, CIDR netblocks, IP ranges, etc.

### **random**

For larger network scans it might be useful to choose target hosts at random. Using this option an amount of random hosts can be specified.

### **randomizeHosts**

The underlying Nmap process scans the hosts in order. Some IDS(Intrusion detection systems) might detect that an block following requests. When set Nmap randomizes the targets to scan.

### **resolve**

Specifies for which IP addresses a reverse DNS lookup is run.

- `never` Do not run reverse DNS lookup for any address
- `sometimes` Nmap decides which addresses to run a reverse DNS lookup
- `always` Try to resolve each target host address
- `all` Also resolve all hosts addresses which are a part of the traceroute

### **useSystemDns**

By default, Nmap uses a custom stub resolver which performs dozends of requests in parallel. This option can be used to force use the system's DNS resolver. Using the system resolver can drastically increase the resolve time for each host.

### **dnsServer**

By default, Nmap uses the system specified DNS servers to resolve IP addresses. A custom list of DNS resolver can be specified which this option.

### **dryrun**

Before running large network scans it might be useful to run a dryrun fist. This dryrun will not send any network packages at all. The response still return the addresses which will be scanned.

### traceroute

Determine all intermediate hops between the scanner and target host. This works by sending packets with a low TTL (time-to-live) in an attempt to elicit ICMP Time Exceeded message from the intermediate hops. By increasing the TTL until the target host is reached, the traceroute can be determined.