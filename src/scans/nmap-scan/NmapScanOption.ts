import { BadsumOption, DataOption, DecoyOption, FragmentOption, InterfaceOption, MtuOption, ProxyOption, SourceIpOption, SourceMacOption, SourcePortOption, TtlOption } from '../../options/FirewallAndSpooftingOptions'
import { DisableArpPingOption, DnsServerOption, RandomizeHostsOption, ResolveOption, SkipHostDiscoveryOption, TracerouteOption, UseSystemDnsOption } from '../../options/HostDiscoveryOptions'
import { DryrunOption, Ipv6Option, PrivilegedModeOption, SendMechanism, SendMechanismOption } from '../../options/MiscOptions'
import { OsDetectionOption } from '../../options/OsDetectionOptions'
import { FastScanOption, RandomizePortsOption } from '../../options/PortSpecificationOptions'
import { ExcludeOption, RandomOption, ScanTypeOption, TargetOption } from '../../options/TargetSpecificationOptions'
import { HostTimeoutOption, IgnoreIcmpRateLimitOption, IgnoreRstRateLimitOption, InitialRttTimeoutOption, MaxHostgroupOption, MaxParallelismOption, MaxRateOption, MaxRetriesOption, MaxRttTimeoutOption, MaxScanDelayOption, MinHostgroupOption, MinParallelismOption, MinRateOption, MinRttTimeoutOption, NsockEngineOption, ScanDelayOption, ScriptTimeoutOption, TimingOption } from '../../options/TimingAndPerformanceOptions'

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
TracerouteOption,
TimingOption,
TtlOption,
FastScanOption,
HostTimeoutOption,
MinHostgroupOption,
MaxHostgroupOption,
MinParallelismOption,
MaxParallelismOption,
InitialRttTimeoutOption,
MinRttTimeoutOption,
MaxRttTimeoutOption,
MaxRetriesOption,
ScriptTimeoutOption,
ScanDelayOption,
MaxScanDelayOption,
MinRateOption,
MaxRateOption,
IgnoreRstRateLimitOption,
IgnoreIcmpRateLimitOption,
NsockEngineOption,
FragmentOption,
MtuOption,
DecoyOption,
SourceIpOption,
InterfaceOption,
SourcePortOption,
DataOption,
SourceMacOption,
ProxyOption,
BadsumOption,
Ipv6Option,
SendMechanismOption,
PrivilegedModeOption,
DisableArpPingOption,
RandomizePortsOption,
SkipHostDiscoveryOption
{}