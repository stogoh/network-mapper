# Network Mapper

Nmap wrapper for node fully coded in TypeScript.

This module is still in heavy development. As of now only the listscan is implemented, futher more advanced scanns will be implemented.

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

The following example scan the specified target for hosts. The first and last hosts in the network are excluded from the network scan. The hostnames are resolved via the specified DNS resolvers.

```typescript
import { ListScan } from 'network-mapper'

async function main() {

    const scan = new ListScan({
        target: '192.168.1.1/24',
        exclude: ['192.168.1.0', '192.168.1.255'],
        dnsServer: ['1.1.1.1', '8.8.8.8'],
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

### **target** `string | string[]`

Specifies which targets to scan. The [Target Specification](https://nmap.org/book/man-target-specification.html) syntax from Nmap can be used. The option allows either a string or string array as an argument.

When a hostname is given as a target, is is resolved  via the domain name system.

### **exclude** `string | string[]`

Specifies targets hosts to be excluded from the scan. The hosts passed can include hostnames, CIDR netblocks, IP ranges, etc.

### **random** `number`

For larger network scans it might be useful to choose target hosts at random. Using this option an amount of random hosts can be specified.

### **randomizeHosts** `boolean`

The unserlaying Nmap process scans the hosts in order. Some IDS(Intrustion detection systems) might detect that an block following requests. When set Nmap randomizes the targets to scan.

### **resolve** `'never' | 'sometimes' | 'always' | 'all'`

Specifies for which IP addresses a reverse DNS lookup is run.

- `never` Do not run reverse DNS lookup for any address
- `sometimes` Nmap decises which adresses to run a reverse DNS lookup
- `always` Try to resolve each target host address
- `all` Also resolve all hosts addresses which are a part of the traceroute

### **useSystemDns** `boolean`

By default, Nmap uses a custom stub resolver which performs dozends of requests in parallel. This option can be used to force use the system's DNS resolver. Using the system resolver can drasticly increase the resolve time for each host.

### **dnsServer** `string | string[]`

By default, Nmap uses the system specified DNS servers to resolve IP addresses. A custom list of DNS resovler can be specified which this option.

### **dryrun**

Before running large network scans it might be usefull to run a dryrun fist. This dryrun will not send any network packages at all. The response still return the addresses which will be scanned.