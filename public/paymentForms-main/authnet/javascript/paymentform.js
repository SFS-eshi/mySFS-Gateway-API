   var g_submitClicked = false; 
   function paymentMethod_onClick() { 
   var bShowVCDetail = false; 
   var oPmCC = document.getElementById('pmCC'); 
   var oPmEcheck = document.getElementById('pmEcheck'); 
   var oPmVco = document.getElementById('pmVco'); 
   var oDivCC = document.getElementById('divCreditCardInformation'); 
   var oDivEcheck = document.getElementById('divBankAccountInformation'); 
   var oDivVcoDetail = document.getElementById('AjaxPaymentHolder'); 
   var oDivSubmit = document.getElementById('divSubmit'); 
   var oDivVco = document.getElementById('divVco'); 
   var oDivBillInfo = document.getElementById('divBillingInformation'); 
   var oDivShipInfo = document.getElementById('divShippingInformation'); 
   var oInputCardNum = document.getElementById('x_card_num'); 
   var oInputExpDate = document.getElementById('x_exp_date'); 
   var oInputBankName = document.getElementById('x_bank_name'); 
   var oBackupCallID = document.getElementById('VCCallId'); 
   var oVCDecryption = document.getElementById('VCDecryption'); 
   if ( null != oBackupCallID && oBackupCallID.value.length > 0 && null != oVCDecryption && oVCDecryption.value == 'success') { 
     bShowVCDetail = true; 
   } 
   if (null != oDivCC || null != oDivEcheck || null != oPmVco ) { 
     if ( null != oPmCC && oPmCC.checked ) { 
     MoveVCFromForm(); 
     if(null != oDivVcoDetail) { oDivVcoDetail.style.display = 'none'; } 
     if(null != oDivVco) { oDivVco.style.display = 'none'; } 
     if(null != oDivCC)  { oDivCC.style.display = '';} 
     if(null != oDivEcheck) { oDivEcheck.style.display = 'none'; } 
     if(null != oDivSubmit) { oDivSubmit.style.display = '';} 
     if(null != oDivShipInfo) { oDivShipInfo.style.display = ''; } 
     if(null != oDivBillInfo) { oDivBillInfo.style.display = ''; } 
     if(null != oInputCardNum) { oInputCardNum.focus(); } 
     } 
     if ( null != oPmEcheck && oPmEcheck.checked ) { 
     MoveVCFromForm(); 
     if(null != oDivVcoDetail) { oDivVcoDetail.style.display = 'none'; } 
     if(null != oDivVco) { oDivVco.style.display = 'none'; } 
     if(null != oDivCC) { oDivCC.style.display = 'none'; } 
     if(null != oDivEcheck) { oDivEcheck.style.display = '';} 
     if(null != oDivSubmit) { oDivSubmit.style.display = '';} 
     if(null != oDivShipInfo) { oDivShipInfo.style.display = ''; } 
     if(null != oDivBillInfo) { oDivBillInfo.style.display = ''; } 
     if(null != oInputBankName) { oInputBankName.focus(); } 
     } 
     if ( null != oPmVco && oPmVco.checked ) { 
     MoveVCFromBackup(); 
//         if(null != oInputCardNum) { oInputCardNum.setAttribute('value',''); } 
//         if(null != oInputExpDate) { oInputExpDate.setAttribute('value',''); } 
     if(null != oDivVco) { oDivVco.style.display = ''; } 
     if(null != oDivCC) { oDivCC.style.display = 'none'; } 
     if(null != oDivEcheck) { oDivEcheck.style.display = 'none'; } 
     if(bShowVCDetail) { oDivVcoDetail.style.display = ''; oDivSubmit.style.display = ''; } 
     else { oDivVcoDetail.style.display = 'none'; oDivSubmit.style.display = 'none'; } 
     if(null != oDivShipInfo) { oDivShipInfo.style.display = 'none'; } 
     if(null != oDivBillInfo) { oDivBillInfo.style.display = 'none'; } 
     } 
    } 
   } 
   function CopyFromBilling() { 
   var oChkCopyBill = document.getElementById('chkCopyBill'); 
   if (null != oChkCopyBill && oChkCopyBill.checked) { 
     copyField('x_first_name', 'x_ship_to_first_name'); 
     copyField('x_last_name', 'x_ship_to_last_name'); 
     copyField('x_company', 'x_ship_to_company'); 
     copyField('x_address', 'x_ship_to_address'); 
     copyField('x_city', 'x_ship_to_city'); 
     copyField('x_state', 'x_ship_to_state'); 
     copyField('x_zip', 'x_ship_to_zip'); 
     copyField('x_country', 'x_ship_to_country'); 
   } 
   } 
   function copyField(from, to) { 
   var oFroms = document.getElementsByName(from); 
   var oTos = document.getElementsByName(to); 
   if (null != oFroms && 0 < oFroms.length && null != oTos && 0 < oTos.length && 'hidden' != oTos[0].type) { 
     oTos[0].value = oFroms[0].value; 
   } 
   } 
   function MoveVCFromForm() { 
   var oVCStatusBackup = document.getElementById('VCStatusBackup'); 
   if (null != oVCStatusBackup) { 
     moveField('x_call_id', 'VCCallId'); 
     moveField('x_opaque_data_descriptor', 'VCOpaqueDataDescriptor'); 
     moveField('x_opaque_data_value', 'VCOpaqueDataValue'); 
     moveField('x_opaque_data_key', 'VCOpaqueDataKey'); 
   } 
   } 
   function MoveVCFromBackup() { 
   var oVCStatusBackup = document.getElementById('VCStatusBackup'); 
   if (null != oVCStatusBackup) { 
     moveField('VCCallId', 'x_call_id'); 
     moveField('VCOpaqueDataDescriptor', 'x_opaque_data_descriptor'); 
     moveField('VCOpaqueDataValue', 'x_opaque_data_value'); 
     moveField('VCOpaqueDataKey', 'x_opaque_data_key'); 
   } 
   } 
   function moveField(from, to) { 
   var oFroms = document.getElementsByName(from); 
   var oTos = document.getElementsByName(to); 
   if (null != oFroms && 0 < oFroms.length && 0 < oFroms[0].value.length && null != oTos && 0 < oTos.length) { 
     oTos[0].value = oFroms[0].value; 
     oFroms[0].value = ''; 
   } 
   } 
   function PopupLink(oLink) { 
   if (null != oLink) { 
     window.open(oLink.href, null, 'height=350, width=450, scrollbars=1, resizable=1'); 
     return false; 
   } 
   return true; 
   } 
   function ClearHiddenCCEcheck() { 
   var oDivCC = document.getElementById('divCreditCardInformation'); 
   var oDivEcheck = document.getElementById('divBankAccountInformation'); 
   if (null != oDivCC && null != oDivEcheck) { 
     var oFld; 
     var list = new Array(); 
     if ('none' == oDivCC.style.display) { 
     list = new Array('x_card_num', 'x_exp_date', 'x_card_code', 'x_auth_code'); 
     } 
     for (i=0; i < list.length; i++) { 
     oFld = document.getElementById(list[i]); 
     if (null != oFld && 'text' == oFld.type) oFld.value = ''; 
     } 
     if ('none' == oDivEcheck.style.display) { 
     list = new Array('x_bank_name', 'x_bank_acct_num', 'x_bank_aba_code', 'x_bank_acct_name', 'x_drivers_license_num', 'x_drivers_license_state', 'x_drivers_license_dob', 'x_customer_tax_id'); 
     } 
     for (i=0; i < list.length; i++) { 
     oFld = document.getElementById(list[i]); 
     if (null != oFld && 'text' == oFld.type) oFld.value = ''; 
     } 
   } 
   } 
   function onSubmit() { 
   var oBtnSubmit = document.getElementById('btnSubmit'); 
   if (g_submitClicked) { 
     oBtnSubmit.value = 'Processing...'; 
     setTimeout(function() { oBtnSubmit.disabled = true; }, 0); 
     return false; 
   }     
   oBtnSubmit.value = 'Sending...'; 
   ClearHiddenCCEcheck(); 
   g_submitClicked = true; 
   return true; 
   } 
   function MoreLessText(elemId, bMore) { 
   if (bMore) { 
     document.getElementById(elemId + 'More').style.display = ''; 
     document.getElementById(elemId + 'Less').style.display = 'none'; 
   } else { 
     document.getElementById(elemId + 'More').style.display = 'none'; 
     document.getElementById(elemId + 'Less').style.display = ''; 
   } 
   return false; 
   } 