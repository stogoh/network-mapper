import { DnsServerOption, RandomizeHostsOption, ResolveOption, TracerouteOption, UseSystemDnsOption } from '../../options/HostDiscoveryOptions'
import { DryrunOption } from '../../options/MiscOptions'
import { PortOption } from '../../options/PortSpecificationOptions'
import { ExcludeOption, RandomOption, ScanTypeOption, TargetOption } from '../../options/TargetSpecificationOptions'

export interface NmapScanOption extends
ScanTypeOption,
TargetOption,
RandomOption,
ExcludeOption,
ResolveOption,
DnsServerOption,
UseSystemDnsOption,
RandomizeHostsOption,
DryrunOption,
TracerouteOption
{}