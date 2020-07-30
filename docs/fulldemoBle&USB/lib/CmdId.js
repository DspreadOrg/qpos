var CmdId ={
   CMDID_WAITING : 0x23,	//23H：正执行命令，还没结果。
   CMDID_QUERY : 0x22,//查询命令结果
   CMDID_PART_DATA : 0x36,  //数据拆包发送
   CMDID_OLD : 0x00,			//00H/01H/1xH：以前老协议。
   CMDID_RESET : 0x20,      //复位，丢弃正执行的命令操作
   CMDID_PROCESS : 0x21,      //下发新命令     
   CMDID_COMPLETED : 0x24,      //结果返回
   CMDID_TIMEOUT : 0x25,      //超时返回
   CMDID_DESTRUCT : 0x26,      //自毁返回
   CMDID_CRCERROR : 0x27,      //校验错误返回
   CMDID_USERCANCEL : 0x28,      //用户取消交易
   CMDID_MACERROR : 0x29,      //MAC校验错误

   CMDID_ICC_INIT_ERROR : 0x30,      //icc模块初始化失败
   CMDID_ICC_POWER_ON_ERROR : 0x31,     //icc卡上电失败
   CMDID_ICC_TRADE_ERROR : 0x32,     //icc卡通讯失败	

   CMDID_EMV_TRANS_TERMINATE : 0x33,      //EMV交易终止
   CMDID_EMV_TRANS_DENIAL : 0x34,      //EMV交易拒绝
   CMDID_NOT_AVAILABLE : 0x35,      //命令不可用

   CMDID_COMPLETED_ENCRY : 0x88,

  //add 2014-03-31
   CMDID_EMV_APP_CFG_ERROR : 0x37,      //emv app 配置错误
   CMDID_EMV_CAPK_CFG_ERROR : 0x38,      //emv capk 配置错误
   CMDID_WR_DATA_ERROR : 0x39,      //读/写数据失败

   CMDID_NO_UPDATE_WORK_KEY : 0x40,      //没有更新工作密钥

   CMDID_INPUT_PIN_ING : 0x41,      // 输入密码中
   CMDID_MAG_TO_ICC_TRADE : 0x42,      //请转IC卡交易
   CMDID_SEND_IC_CARDNO : 0x43,      //上报IC卡卡号

   CMDID_EMV_TRANS_CARD_BLOCKED_OR_EMV_APPS    : 0x44,     // 
   CMDID_EMV_TRANS_SELECT_APP_FAILED           : 0x45,    // 
   CMDID_EMV_TRANS_CAPK_FAILED          : 0x46,     //
   CMDID_EMV_TRANS_FALLBACK          : 0x47,     //
   CMDID_EMV_TRANS_TERMINATE_NFC  : 0x48,//
   CMDID_CARD_REMOVED  : 0x51,//
   CMDID_MSR_DATA_READY  : 0x52,//
   CMDID_EMV_KERNEL_PC  : 0x49,
   CMDID_CHECK_HAVE_CARD  : 0x89

}