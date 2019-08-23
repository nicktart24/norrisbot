function FindProxyForURL(url, host) {
	/* Default Traffic Forwarding. Forwarding to Zen */
	return "PROXY ${GATEWAY}:80; PROXY ${SECONDARY_GATEWAY}:80; DIRECT";
}
