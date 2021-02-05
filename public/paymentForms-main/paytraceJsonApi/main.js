$( document ).ready(function() {
  $( ".spinner" ).hide();
  
  $( ".json-response" ).click(function() {
    if( $(this).hasClass( 'collapse' ) ) {
      $(this).removeClass( 'collapse' ).addClass( 'expand' );
      $( ".json-response span" ).html( "Click to Hide Raw JSON Response" );
    }
    else if( $( this ).hasClass( 'expand' ) ) {
      $(this).removeClass( 'expand' ).addClass( 'collapse' );
      $( ".json-response span" ).html( "Click to View Raw JSON Response" );
    }
  });

  $( ".options").children().click(function() {
    if( $(this).hasClass( "opt-active") ){
      console.log("What a dummy!");
    }
    else {
      // Change the active button:
      $( ".options" ).children().removeClass( "opt-active" ) ;
      $( $(this) ).addClass( "opt-active") ;
    
      var getForm = $( $(this) ).data( 'method' );
      // Change the active form:
      
      $( 'form' ).parent().fadeTo( 50, 0 ).hide(100);
      $( '.spinner' ).show();
      console.log("Spinner showing");
      $( "#" + getForm ).addClass( 'form-active' ).fadeTo( "slow", 1.0).show(200);
      $( '.spinner' ).hide();
      console.log("Spinner hidden");
    }
  });
  
  $( ".submit-pay" ).click( function() {
    $( $(this) ).disabled = true; 
  });
});