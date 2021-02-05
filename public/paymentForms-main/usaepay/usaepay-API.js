/* from origin 'null' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header 
is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' 
to fetch the resource with CORS disabled.
*/

var keyedsalecommand = 'v2/transactions';
var cors ='https://cors-anywhere.herokuapp.com/'
var url='https://sandbox.usaepay.com/api/';
var endpoint = cors+url+keyedsalecommand;

var testSaleData = 
	{
    	"command": "cc:sale",
    	"amount": "0.00",
    	"amount_detail": {
	        "tax": "0.00",
	        "tip": "0.00"
    	},
    	"creditcard": {
        	"cardholder": "Chichi Rodriguez",
	        "number": "4000100011112224",
	        "expiration": "1122",
	        "cvc": "123",
	        "avs_street": "1234 Main",
	        "avs_zip": "12345"
    	},
    	"invoice": "12356"
    }

const paymentButton = document.querySelector('#paymentButton');
const responseField = document.querySelector('#responseField');

const addFormData = ()=>{
  const amount =document.getElementById('amount').value;
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
        'Authorization': 'Basic XzZjZjREZ0hDV0ZNM1kyOXZtazM5TTYzYUdBOHlaNjk6czIvYWJjZGVmZ2hpamtsbW5vcC8wMTI4OWZjYzdhZWZhYjMxOTNlMWI1ZGZiOGU5OGU3NjJkYjQxOGEzYThiMDZmOTU0ZDI1YjAyMDRhMmQ4ZWM1'
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
    `<h3>Transaction Status: ${res.result}</h3>
    <p>Amount: $${res.auth_amount} </p>
    <p>Auth Code: ${res.authcode} </p>
    <p>Date: ${weekDays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</p>
    <p><small>*See console for full response.</small></p>`;
  
}


