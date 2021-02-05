var keyedsalecommand = 'api/v2/transactions';
var cors ='https://cors-anywhere.herokuapp.com/'
var url='https://sandbox.usaepay.com/';
var endpoint =cors+url+keyedsalecommand;
//Basic Auth: u/pw : _V87Qtb513Cd3vabM7RC0TbtJWeSo8p7 / 123456
//using the test credentials from the API documentation https://help.usaepay.info/developer/rest-api/


var testSaleData = 
    {
    "command": "cc:sale",
    "amount": "5.00",
    "amount_detail": {
        "tax": "1.00",
        "tip": "0.50"
    },
    "creditcard": {
        "cardholder": "Chichi Rodriguez",
        "number": "4000100011112224",
        "expiration": "0221",
        "cvc": "123",
        "avs_street": "1234 Main",
        "avs_zip": "12345"
    },
    "invoice": "12356"
    }


const paymentButton = document.querySelector('#paymentButton');
const responseField = document.querySelector('#responseField');

const addFormData = ()=>{
  const amount =Number(document.getElementById('amount').value);
  const cardNumber =document.getElementById('cardNumber').value;
  const expirationDate =document.getElementById('expirationDate').value;
  const cvc =document.getElementById('cvc').value;

  testSaleData.amount = amount;
  testSaleData.creditcard.number = cardNumber;
  testSaleData.creditcard.expiration = expirationDate;
  testSaleData.creditcard.cvc = cvc;
  console.log(testSaleData);
}

const makePayment = () => {
  addFormData();
  //const paymentData=paymentInput.Value;
  const data= JSON.stringify(testSaleData);
console.log('making payment')
  fetch(endpoint,
    {
      method:'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Basic X1Y4N1F0YjUxM0NkM3ZhYk03UkMwVGJ0SldlU284cDc6czIvYWJjZGVmZ2hpamtsbW5vcC9iNzRjMmZhOTFmYjBhMDk3NTVlMzc3ZWU4ZTIwYWE4NmQyYjkyYzNkMmYyNzcyODBkYjU5NWY2MzZiYjE5MGU2'
        },
      body: data
    })
  .then(response=>{
     if (response.ok){
          return response.json();
          console.log('payment response')

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
    <p><small>*See console for full response (ctrl+shift+j).</small></p>`;
  
}

