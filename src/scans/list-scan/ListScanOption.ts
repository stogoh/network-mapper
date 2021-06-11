import { DnsServerOption, RandomizeHostsOption, ResolveOption, UseSystemDnsOption } from '../../options/HostDiscoveryOptions'
import { DryrunOption } from '../../options/MiscOptions'
import { ExcludeOption, RandomOption, TargetOption } from '../../options/TargetSpecificationOptions'

export interface ListScanOption extends
TargetOption,
RandomOption,
ExcludeOption,
DryrunOption,
ResolveOption,
DnsServerOption,
UseSystemDnsOption,
RandomizeHostsOption
{}