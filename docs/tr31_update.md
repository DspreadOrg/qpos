## Overview

### update key in TR-31 format

Use the TR-31 algorithm to set the key. According to the incoming TR-31 block data, the key to be injected is parsed according to the encryption method indicated by KBH. 
Only incoming data blocks and protection keys are required.

you can use BP-TOOLS to generate a TR-31 block data according to you needs.  [EFTlab - Next-Gen Cloud Payment Platform - Home](https://www.eftlab.com/)

**QPOS Plus  update API**   

extern u32 updateKeyBy_TR31(pu8 inchar, u32 inLength, pu8 exchange_key, u32 exchange_key_length, u8 key_index, pu8 result_data, pu32 nresult_len);

**Support Info:**    

	version support: A ,D
	key usage: K0, B1, D0, P0

**Parameter format：**   

inchar: TR-31 block data .

inLength: TR-31 block data's  length'.

exchange_key: protection key. protect the key in tr-31 block data.

exchange_key_length:protection key length.

key_index： key_index(0–9) .

result_data:  return length and algorithm used.

nresult_len:  result_data's length.

**The following Demo shows how to initialize the DUKPT key**

``` java
void TR_31Test(){
	char tr31Block[512]={0};	
	u32 inLength=0;	
	char exchange_key[36]={0};	
	u32 exchange_key_length=0;
	char result_data[512]={0};
	u32 nresult_len =0;
	u32 key_index=0;
	char ksn[24]={0};
	
	inLength = 112;	
	exchange_key_length = 16;
	/*ksn : 01 02 03 04 05 06 07 08 09 0A */
  	/*block:44 30 31 31 32 42 31 41 4E 30 30 45 30 30 30 30 
		   44 39 46 42 44 41 42 32 41 31 44 39 42 39 44 30 
		   30 35 36 46 46 34 38 37 34 35 44 31 33 36 44 35 
		   45 32 44 45 37 45 36 42 42 34 36 43 43 46 46 43 
		   46 38 30 42 43 44 36 30 39 41 30 34 46 31 41 42 
		   38 33 45 30 32 30 42 38 38 31 46 39 36 46 32 32 
		   30 32 37 39 44 34 30 34 45 38 39 44 35 31 41 30 
	*/
	/*key: CD 80 31 6F E2 9F 37 CA 7B D7 4D 81 0E 9A 4E 8F*/
	memcpy(ksn,"\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A",CUSTOM_KEY_DUKPT_KSN_LEN_MAX);
    	memcpy(tr31Block,"\x44\x30\x31\x31\x32\x42\x31\x41\x4E\x30\x30\x45\x30\x30\x30\x30\x44\x39\x46\x42\x44\x41\x42\x32\x41\x31\x44\x39\x42\x39\x44\x30\x30\x35\x36\x46\x46\x34\x38\x37\x34\x35\x44\x31\x33\x36\x44\x35\x45\x32\x44\x45\x37\x45\x36\x42\x42\x34\x36\x43\x43\x46\x46\x43\x46\x38\x30\x42\x43\x44\x36\x30\x39\x41\x30\x34\x46\x31\x41\x42\x38\x33\x45\x30\x32\x30\x42\x38\x38\x31\x46\x39\x36\x46\x32\x32\x30\x32\x37\x39\x44\x34\x30\x34\x45\x38\x39\x44\x35\x31\x41\x30",inLength );	
	memcpy(exchange_key,"\xCD\x80\x31\x6F\xE2\x9F\x37\xCA\x7B\xD7\x4D\x81\x0E\x9A\x4E\x8F",exchange_key_length);
	
	//*******normal use*********
	int ret = UpdateKeyBy_TR31(tr31Block, inLength, exchange_key, exchange_key_length,key_index,result_data, &nresult_len);	
	TRACE(DBG_TRACE_LVL,"updateKeyBy_TR31 ret = %d\r\n",ret); //ret =0
	TRACE(DBG_TRACE_LVL,"nresult_len = %d\r\n",nresult_len);// len =3
	if(nresult_len > 0 ){	
		TRACE_VAL(DBG_TRACE_LVL,(pu8)result_data,nresult_len);	// 02 42 31  => algorithm B1
	}
	
	//pIpek: 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 
	//ksn: 02 02 21 22 10 01 00 E0 00 04 
	checkRead();
	
	//*********Update the specified KSN*********
	SetTR_31_block_ksn(ksn,CUSTOM_KEY_DUKPT_KSN_LEN_MAX);
	ret = UpdateKeyBy_TR31(tr31Block, inLength, exchange_key, exchange_key_length,key_index,result_data, &nresult_len);
	TRACE(DBG_TRACE_LVL,"updateKeyBy_TR31 ret = %d\r\n",ret);//ret = 0	
	TRACE(DBG_TRACE_LVL,"nresult_len = %d\r\n",nresult_len);//len =3	
	if(nresult_len > 0 ){	
		TRACE_VAL(DBG_TRACE_LVL,(pu8)result_data,nresult_len);// 02 42 31 => algorithm B1
	}

	//pIpek: 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 
	//ksn: 01 02 03 04 05 06 07 08 09 0A 
	checkRead();
}

//read key info
void checkRead(){
	char pIpek[64]={0};
	char ksn[64]={0};		
	dukpt_get_ipek(0,DUKPT_TYPE_EMV,pIpek);
	
	TRACE(DBG_TRACE_LVL,"ipek \r\n");
	TRACE_VAL(DBG_TRACE_LVL, pIpek,32);		
	TRACE(DBG_TRACE_LVL,"ksn \r\n");
	dukpt_get_ksn(0, DUKPT_TYPE_EMV,ksn);	
	TRACE_VAL(DBG_TRACE_LVL, ksn,CUSTOM_KEY_DUKPT_KSN_LEN_MAX);
	return ;
}
```



