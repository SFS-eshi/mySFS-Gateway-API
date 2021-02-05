//this doesn't work with Paytrace
/*
'https://api.paytrace.com/v1/transactions/sale/keyed' from origin 'null' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header 
is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' 
to fetch the resource with CORS disabled.
*/

var keyedsalecommand = '/v1/transactions/sale/keyed';
var oauthtoken = '/oauth/token';
var cors = 'https://cors-anywhere.herokuapp.com/';
var url='https://api.paytrace.com';
var endpoint = cors+url+keyedsalecommand;
var authendpoint = cors+url+oauthtoken;
var oauthbody='grant_type=password&username=eshiapi&password=Password123';

var testSaleData = {
    "amount":2.00,
    "credit_card":{
        "number":"4111111111111111",
        "expiration_month":"12",
        "expiration_year":"2020"
    },
    "integrator_id":"xxxxxxxxxx",
    "csc":"999",
    "billing_address":{
        "name":"Chi Chi Rodriguez",
        "street_address":"8320 E. West St.",
        "city":"Spokane",
        "state":"WA",
        "zip":"85284"
    }
}

const paymentInput = document.querySelector('#paymentInput');
const oauthButton = document.querySelector('#oauthButton');
const paymentButton = document.querySelector('#paymentButton');
const responseField1 = document.querySelector('#responseField1');
const responseField2 = document.querySelector('#responseField2');

const getToken = () => {
	console.log('hello');
	fetch(authendpoint, 
		{
			method:'POST',
			headers: {},
			body: oauthbody
		})
	.then(response=>{
		if (response.ok){
      		return `${response.token_type} ${response.access_token}`
    	}
    	throw new Error('Request failed!');
	}, (networkError) =>{
    console.log(networkError.message);
  	})
  	.then(jsonResponse =>{
  		renderResponse(jsonResponse);
  	})
	//returning "bearer " + token;
}

const makePayment = () => {
	const paymentData=paymentInput.Value;
	const data= JSON.stringify(testSaleData);

	fetch(endpoint,
		{
			method:'POST',
			headers: {
				'Content-type': 'application/json',
				//'Authorization': getToken
				'Authorization': 'Bearer 56378696160796:0516373777f62746132333:KK7jSatFVg_3riLOS8Pmft_4I8tB0VLVrmdjau8R_tM'
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
const displayOauth = (event) => {
  event.preventDefault();
  while(responseField1.firstChild){
    responseField1.removeChild(responseField.firstChild)
  }
  getToken();
}
const displayPayment = (event) => {
  event.preventDefault();
  while(responseField2.firstChild){
    responseField2.removeChild(responseField2.firstChild)
  }
  makePayment();
}

oauthButton.addEventListener('click', displayOauth);
paymentButton.addEventListener('click', displayPayment);


//codecademy helper functions

// Manipulates responseField to render a formatted and appropriate message
const renderResponse = (res) => {
  // Displays either message depending on results
    responseField1.innerHTML = `<p>${res} </p>`;
  
}

// Manipulates responseField to render an unformatted response
const renderRawResponse = (res) => {
  // Displays either message depending on results
  if(res.errors){  
    responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
  } else {
    // Adds line breaks for JSON
    let structuredRes = JSON.stringify(res).replace(/,/g, ", \n");
    structuredRes = `<pre>${structuredRes}</pre>`;
    responseField.innerHTML = `${structuredRes}`;
  }
}

// Renders the JSON that was returned when the Promise from fetch resolves.
const renderJsonResponse = (response) => {
  // Creates an empty object to store the JSON in key-value pairs
  let rawJson = {}
  for(let key in response){
    rawJson[key] = response[key]
  }
  // Converts JSON into a string and adding line breaks to make it easier to read
  rawJson = JSON.stringify(rawJson).replace(/,/g, ", \n")
  // Manipulates responseField to show the returned JSON.
  responseField.innerHTML = `<pre>${rawJson}</pre>`
}
