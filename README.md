# node-nmap

# ScanOptions

* [`skipHostDiscovery`](#skipHostDiscovery) Skips the host discovery stage altogether.

## `skipHostDiscovery`
This option skips the host discovery stage altogether. Normally, Nmap uses this stage to determine active machines for heavier scanning and to gauge the speed of the network. By default, Nmap only performs heavy probing such as port scans, version detection, or OS detection against hosts that are found to be up. Disabling host discovery with -Pn causes Nmap to attempt the requested scanning functions against every target IP address specified. So if a /16 sized network is specified on the command line, all 65,536 IP addresses are scanned. Proper host discovery is skipped as with the list scan, but instead of stopping and printing the target list, Nmap continues to perform requested functions as if each target IP is active. Default timing parameters are used, which may result in slower scans. To skip host discovery and port scan, while still allowing NSE to run, use the two options -Pn -sn together.