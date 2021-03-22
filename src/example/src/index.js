// Copyright 2021 Prescryptive Health Inc

require('file-loader?name=[name].[ext]!../index.html');
require('file-loader?name=[name].[ext]!../favicon.png');
/** 
 * This is a sample implementation of the SmartPrice modal
 * You may add params to init to prefill the field of the form
 * Once the account has been created you will receive the member id
 * from the iframe window in a message event
 */
import {init} from 'smartprice';

window.addEventListener('load', function(){
    /** You can pass the following parameters to prefill the form fields
     *  init("firstname","lastname", "email", "phone number 10 digits", "date in format YYYY-MM-DD");
     */
    init();
    /** Listen for messages from modal */
    window.addEventListener("message", receiveMessage, false);
}, false);



