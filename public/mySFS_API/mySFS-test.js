/* from origin 'null' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header 
is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' 
to fetch the resource with CORS disabled.
*/

var keyedsalecommand = '/v2/transactions/charge';
var cors ='https://cors-anywhere.herokuapp.com/'
var url='https://api.sandbox.mysfsgateway.com';
var endpoint = cors+url+keyedsalecommand;
//Basic Auth: u/pw : 09cYEZvMRhswUxchTL5ZDvS9tapDDD0c / 123456

var testSaleData = 
{
  "amount": 0.00,
  "amount_details": {
    "tax": 0,
    "surcharge": 0,
    "shipping": 0,
    "tip": 0,
    "discount": 0
  },
  "name": "test3",
  "transaction_details": {
    "description": "string",
    "clerk": "string",
    "terminal": "string",
    "client_ip": "192.168.0.1",
    "invoice_number": "string",
    "po_number": "string",
    "signature": ""
  },
  "billing_info": {
    "first_name": "Eric",
    "last_name": "Shi",
    "street": "string",
    "street2": "string",
    "state": "string",
    "city": "string",
    "zip": "string",
    "country": "string",
    "phone": "string"
  },
  "shipping_info": {
    "first_name": "Eric",
    "last_name": "Shi",
    "street": "string",
    "street2": "string",
    "state": "string",
    "city": "string",
    "zip": "string",
    "country": "string",
    "phone": "string"
  },
  "ignore_duplicates": false,
  "software": "string",
  "customer": {
    "send_receipt": false,
    "email": "user@example.com",
    "fax": "string",
    "identifier": "string"
  },
  "avs_address": "string",
  "avs_zip": "string",
  "expiry_month": 1,
  "expiry_year": 2022,
  "cvv2": "123",
  "card": "4111111111111111",
  "capture": true,
  "save_card": false
}


//const paymentInput = document.querySelector('#paymentInput');
const paymentButton = document.querySelector('#paymentButton');
const responseField = document.querySelector('#responseField');

const addFormData = ()=>{
  const amount =Number(document.getElementById('amount').value);
  //const card =document.getElementById('card').value;
  testSaleData.amount = amount;
}

const makePayment = () => {
  addFormData();
  //const paymentData=paymentInput.Value;
  const data= JSON.stringify(testSaleData);

  fetch(endpoint,
    {
      method:'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Basic UFd3MFdpQU5NSE85OTNtSFJIV0c3MHlhdWNQTUxuRlQ6MTIzNDU2'
        },
      body: data
    })
  .then(response=>{
     if (response.ok){
          return response.json();
      }
      throw new Error('Request failed!');
  }, (networkError) =>{
      console.log(networkError.message);
    })
    .then(jsonResponse => {
      renderResponse(jsonResponse);
    })

}

//event listeners
const displayPayment = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild)
  }
  makePayment();
}
paymentButton.addEventListener('click', displayPayment);


//codecademy helper functions

// Manipulates responseField to render a formatted and appropriate message
const renderResponse = (res) => {
  // Displays either message depending on results
  var date= new Date();
  var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  console.log(res);
    responseField.innerHTML = 
    `<h3>Transaction Status: ${res.status}</h3>
    <p>Amount: $${res.auth_amount} </p>
    <p>Auth Code: ${res.auth_code} </p>
    <p>Date: ${weekDays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</p>
    <p><small>*See console for full response.</small></p>`;
  
}

