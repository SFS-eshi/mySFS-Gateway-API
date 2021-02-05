

var cors ='https://cors-anywhere.herokuapp.com/'
var url='https://apitest.authorize.net/xml/v1/request.api';
var endpoint = cors+url;

var testSaleData = 
  	{
      "createTransactionRequest": {
          "merchantAuthentication": {
              "name": "5KP3u95bQpv",
              "transactionKey": "346HZ32z3fP4hTG2"
          },
          "refId": "123456",
          "transactionRequest": {
              "transactionType": "authCaptureTransaction",
              "amount": "5",
              "payment": {
                  "creditCard": {
                      "cardNumber": "5424000000000015",
                      "expirationDate": "2020-12",
                      "cardCode": "999"
                  }
              },
              "lineItems": {
                  "lineItem": {
                      "itemId": "1",
                      "name": "vase",
                      "description": "Cannes logo",
                      "quantity": "18",
                      "unitPrice": "45.00"
                  }
              },
              "tax": {
                  "amount": "4.26",
                  "name": "level2 tax name",
                  "description": "level2 tax"
              },
              "shipping": {
                  "amount": "4.26",
                  "name": "level2 tax name",
                  "description": "level2 tax"
              },
              "poNumber": "456654",
              "customer": {
                  "id": "99999456654"
              },
              "billTo": {
                  "firstName": "Ellen",
                  "lastName": "Johnson",
                  "company": "Souveniropolis",
                  "address": "14 Main Street",
                  "city": "Pecan Springs",
                  "state": "TX",
                  "zip": "44628",
                  "country": "USA"
              },

        "processingOptions": {
               "isSubsequentAuth": "true"
              },
              "subsequentAuthInformation": {
               "originalNetworkTransId": "123456789NNNH",
               "originalAuthAmount": "45.00",
               "reason": "resubmission"         
              },      
              "authorizationIndicatorType": {
              "authorizationIndicator": "final"
            }
          }
      }
    }

const paymentButton = document.querySelector('#paymentButton');
const responseField = document.querySelector('#responseField');

const addFormData = ()=>{
  const amount =document.getElementById('amount').value;
  //const card =document.getElementById('card').value;
  testSaleData.createTransactionRequest.transactionRequest.amount = amount;
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
    `<h3>Transaction Status: ${res.messages.resultCode}</h3>
    <p>${res.transactionResponse.messages[0].description}</p>
    <p>Transaction ID: ${res.transactionResponse.transId} </p>
    <p>Auth Code: ${res.transactionResponse.authCode} </p>
    <p>Date: ${weekDays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</p>
    <p><small>*See console for full response.</small></p>`;
  
}


