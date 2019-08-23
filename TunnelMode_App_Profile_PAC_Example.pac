function FindProxyForURL(url, host) {
	var privateIP = /^(0|10|127|192\.168|172\.1[6789]|172\.2[0-9]|172\.3[01]|169\.254|192\.88\.99)\.[0-9.]+$/;
	
	/* Non-FQDN or private IP goes direct */
	if (isPlainHostName(host) || privateIP.test(host)) {
		return "DIRECT";
	}
	
	/* FTP goes directly */
	if (url.substring(0,4) == "ftp:") {
		return "DIRECT";
	}
	
	/* Private domains or ZPA apps goes direct */
	if (shExpMatch(host, "corp.zscaler.com") || shExpMatch(host, "*.corp.zscaler.com")) {
		return "DIRECT";
	}
	
	/* Any other bypass */
	if (shExpMatch(host, "zscaler.com") || shExpMatch(host, "*.zscaler.com")) {
		return "DIRECT";
	}
	
	/* Updates are directly accessible */
	if ((localHostOrDomainIs(host, "trust.zscaler.com") ||
		localHostOrDomainIs(host, "trust.zscaler.net") ||
		localHostOrDomainIs(host, "trust.zscloud.net") ||
		localHostOrDomainIs(host, "trust.zscalerone.net") ||
		localHostOrDomainIs(host, "trust.zscalertwo.net")) &&
		(url.substring(0,5) == "http:" || url.substring(0,6) == "https:")) {
		return "DIRECT";
	}
	
	/* Default Traffic Forwarding. Forwarding to Zen */
	return "PROXY ${GATEWAY}:80; PROXY ${SECONDARY_GATEWAY}:80; DIRECT";
}
