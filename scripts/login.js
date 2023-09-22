$(document).ready(() => {
  console.log("JQuary ready");

  const frame = $(".frame");
  const loginPage = $(".login");
  const loginForm = $(".login__form");
  const loginSubmit = $(".btn__login");
  const registerPage = $(".register");
  const registerForm = $(".register__form");
  const registerNow = $(".btn__register");
  const registerSubmit = $(".btn__submit");
  const logOut = $("#logout");

  const loginFeedback = $("#login__feedback");
  const registerFeedback = $("#reg__feedback");

  registerPage.animate({ width: 0 });

  // When clicked register form folds out from the right
  $(".btn__register").click(() => {
      if (window.matchMedia("(max-width: 1200px)").matches) {
        loginPage.remove();
        registerPage.css("visibility", "visible");
        registerSubmit.css("visibility", "visible");
        registerPage.css("border-radius", "50px");
        registerPage.animate({ width: "100%" });
        registerPage.css("width", "800px");
      } else {
        frame.animate({ width: 1600 });
        loginPage.css("border-radius", "50px 0 0 50px");
        registerPage.animate({ width: "50%" });
        registerPage.css("visibility", "visible");
        registerSubmit.css("visibility", "visible");
      }
  });

  // Register submit button
  $(registerSubmit).click(function (e) {
    $(registerForm).submit(function (e) {
      e.preventDefault();
      const firstName = $("#firstname").val();
      const lastName = $("#lastname").val();
      const userEmail = $("#useremail").val();
      const password = $("#password").val();
      const confirmPassword = $("#confirmpassword").val();
      // console.log(`First Name: ${firstName} Last Name: ${lastName} Email: ${userEmail} Password: ${password} Confirm Password: ${confirmPassword}`);

      var user = {
        firstName: firstName,
        lastName: lastName,
        email: userEmail,
        password: password,
      };

      if (password !== confirmPassword) {
        registerFeedback.innerHTML = "Password does not match";
        console.log("Password does not match");
        document.getElementById("reg__feedback").innerHTML =
          "Password dont match";
        registerFeedback.css("color", "red");
        $("#password").css("borderColor", "red");
        $("#confirmpassword").css("borderColor", "red");
      } else {
        registerForm.css("visibility", "hidden");
        registerSubmit.css("display", "none");
        registerFeedback.remove();
        var json = JSON.stringify(user);
        localStorage.setItem(userEmail, json);
        document.getElementById(
          "reg__status"
        ).innerHTML = `<i class="fa-regular fa-circle-check" style="color: #008000;"></i> Account has been registered! <br> please wait 5 seconds while we redirect you to the login page.`;
        console.log("Account created");
        // set timeout to 5 seconds then refresh page
        setTimeout(function () {
          location.reload();
        }, 5000);
      }
    });
  });

  // Login button
  $(loginSubmit).click(function (e) {
    $(loginForm).submit(function (e) {
      e.preventDefault();
      const email = $("#email").val();
      const userPassword = $("#userpassword").val();
      console.log(`Email: ${email} Password: ${userPassword}`);

      var user = localStorage.getItem(email);
      var data = JSON.parse(user);
      console.log(data);

      if (user == null) {
        console.log("Email is wrong or dont exist");
        document.getElementById("login__feedback").innerHTML =
          "Email is wrong or dont exist";
        loginFeedback.css("color", "red");
        $(".inpt__username").css("borderColor", "red");
      } else if (email == data.email && userPassword == data.password) {
        console.log("Login Successful!");
        document.getElementById(
          "status"
        ).innerHTML = `Hello ${data.firstName} ${data.lastName}`;
        document.getElementById("logout").innerHTML = "Clear Local Storage";
        loginForm.css("visibility", "hidden");
        loginSubmit.css("display", "none");
        registerNow.css("display", "none");
        $("span").css("display", "none");
        document.getElementById(
          "login__status"
        ).innerHTML = `You successfully logged in as: ${data.firstName} ${data.lastName} <br> Redirecting you to the home page...`;
        // redirect to home page
        setTimeout(function () {
          window.location.href = "/landing.html";
        }, 2000);
      } else {
        console.log("Wrong password");
        document.getElementById("login__feedback").innerHTML = "Wrong password";
        loginFeedback.css("color", "red");
        $(".inpt__password").css("borderColor", "red");
      }
    });
  });

  $(logOut).click(function (e) {
    localStorage.clear();
  });
});
