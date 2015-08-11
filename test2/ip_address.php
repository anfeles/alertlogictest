<?php
/** 
 * Get the number of netmask bits from a netmask in presentation format 
 * 
 * @param string $netmask Netmask in presentation format 
 *  
 * @return integer Number of mask bits 
 * @throws Exception 
 */ 
 
/*********************** TESTING *******************************/
print netmask2bitmask('255.255.255.255');
print netmask2bitmask('255.255.255.0');
print netmask2bitmask('255.255.0.0');
print netmask2bitmask('255.0.0.0');
print netmask2bitmask('0.0.0.0');
print netmask2bitmask('255.255.255.192');
print netmask2bitmask('255.255.255.128');

print netmask2bitmask('255.255.255.gh');

print netmask2bitmask('ffff:ffff:ffff:ffc0:0:0:0:0');
print netmask2bitmask('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff');

print netmask2bitmask('ffff:ffff:ffff:ffc0:0:0:0:h');
/*****************************************************************/ 
 
 
function netmask2bitmask($netmask)
{ 		
	try
	{	
		echo "Net mask: ". $netmask ."<br/>";
		//validate $netmask
		if(filter_var($netmask, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false) 
			return calculateIpv4($netmask);
		if(filter_var($netmask, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) === false) 
			throw new Exception("Invalid Net Mask!!!");
				
		calculateIpv6($netmask);
	}	
	catch (Exception $e)
	{		
		print $e->getMessage()."<br/><br/>";
	}
}

//it returns the number of bits in ipv4 netmask
function calculateIpv4($ip)
{		
	$mascara_en_binario   = decbin( ip2long( $ip ) );		
	//split by .
	$arrayBits = str_split($mascara_en_binario);	
	$count=count($arrayBits);
	$bits=0;	
	for ($i = 0; $i < $count; $i++)
	{
		if($arrayBits[$i]=='1')
			$bits++;					
	}
	echo "Number of bits in the net mask: ". $bits."<br/><br/>";
}

//it returns the number of bits in ip6 netmask
function calculateIpv6($ip) 
{ 
  			
	if(($ip_n = inet_pton($ip)) === false) 
		throw new Exception("Invalid Net Mask!!!");
	
	$bits = 15; // 16 x 8 bit = 128bit (ipv6) 
	$ipbin=0;
	while ($bits >= 0) 
	{ 
		$bin = sprintf("%08b",(ord($ip_n[$bits]))); 
		$ipbin = $bin.$ipbin; 
		$bits--; 
	} 
	//split by character
	$arrayBits = str_split($ipbin);	
	$count=count($arrayBits);
	$bits=0;	
	for ($i = 0; $i < $count; $i++)
	{
		if($arrayBits[$i]=='1')
			$bits++;					
	}
	echo "Number of bits in the net mask: ". $bits."<br/><br/>";	
} 




?>