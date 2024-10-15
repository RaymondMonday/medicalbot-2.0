function submitForm() {
  // Get the form values
  var city = document.getElementById("city").value;
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  var name = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;
  var email = document.getElementById("email").value;

  // Update the confirmation details
  document.getElementById("confirmation-status").innerHTML = "CONFIRMED";
  document.getElementById("confirmation-date").innerHTML = date;
  document.getElementById("confirmation-time").innerHTML = time;
  document.getElementById("confirmation-city").innerHTML = city;
  document.getElementById("confirmation-name").innerHTML = name;
  document.getElementById("confirmation-mobile").innerHTML = mobile;
  document.getElementById("confirmation-email").innerHTML = email;

  // Prevent the form from submitting
  return false;
}