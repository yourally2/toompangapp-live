function initMap(){
  google.maps.event.addDomListener(window, 'load', autocomplete);
}

$("#listcarButton").click(() => {
      const carLocation = $('#car-location').val();
      const model = $('#model').val();
      const insurance = $('#insurance').val();
      const mobileNumber = $('#mobile-number').val();
      const licenseNumber = $('#license-number').val();

      var user = firebase.auth().currentUser;
      const userID = user.uid;
      if (user) {
        firebase.database().ref('users/' + userID).set({
            car_location: carLocation,
            model: model,
            insurance: insurance,
            mobile_number: mobileNumber,
            license_number: licenseNumber,
          })
          .then(() => {
            window.location = "index.html";
          })
      } else {
        console.log('No user is logged in.');
      }
});

function autocomplete() {
  // Create the search box and link it to the UI element.
  var input = document.getElementById('car-location');
  var autocomplete = new google.maps.places.Autocomplete(input);
  // Set to only Singapore
  autocomplete.setComponentRestrictions({'country': ['sg',]});

  // Specify only the data fields that are needed.
  autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

  autocomplete.addListener('place_changed', () => {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      //Some places do not return any geometry for some reason. This does not work: autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
      console.log("Returned place contains no geometry");
    }
    else {
    const carLatLoc = place.geometry['location'].lat();
    const carLngLoc = place.geometry['location'].lng();
    console.log(carLatLoc)
    console.log(carLngLoc)
    }
  });
}
