import * as Model from "./model.js";

function initListeners() {

	$('#addClass').click((e) => {
		e.preventDefault();
		$('#classes').append(`<input class="classInput" type="text"/>`);
	})

  $("#submit").click((e) => {
    e.preventDefault();

    let fname = $("#fname").val();
    let lname = $("#lname").val();
    let email = $("#email").val();
		let age = $("#age").val();
    let phone = $("#phone").val();
		let classes = [];

		let classElements = document.getElementsByClassName('classInput'); 
		
		console.log(classElements);

		for(let i = 0; i < Object.keys(classElements).length; i++) {
			classes.push(classElements[i].value);
		}

    if (fname == "" || lname == "" || age == "" || phone == "" || email == "") {
      alert("Fill out all fields!");
		} else {
      $("#peopleList").html("");

      let person = {
        fname: fname,
        lname: lname,
				age: age,
				email: email,
				phone: phone,
				classes: classes
      };

      $("#fname").val("");
      $("#lname").val("");
			$("#age").val("");
			$("#phone").val("");
			$("#email").val("");
			$("#classes").html(`<input type="text" class="classInput"/>`);

      let people = JSON.parse(localStorage.getItem("People"));

      people.push(person);

			console.log(person);

      localStorage.setItem("People", JSON.stringify(people));

      console.log(localStorage.getItem("People"));
    }
  });

  $("#getNames").click((e) => {
    if (localStorage.getItem("People") == "[]") {
      alert("Please add people first!");
    }
    e.preventDefault();

    let people = JSON.parse(localStorage.getItem("People"));

    console.log(people);

    // for (let i = 0; i < people.length; i++) {
    // $("#peopleList").append(`<li>${people[i].fname} ${people[i].lname}</li>`);
    // }
		$("#peopleList").html(``);


    people.forEach((person) => {
			let classList = '';
			person.classes.forEach((c) => {
				classList += `${c}, `;
			})
      $("#peopleList").append(`
				<li>
					<h3>${person.fname} ${person.lname}</h3>
					<p><strong>Age:</strong> ${person.age}</p>
					<p><strong>Email:</strong> ${person.email}</p>
					<p><strong>Phone Number:</strong> ${person.phone}</p>
					<p><strong>Classes: </strong>${classList}</p>
				</li>
				`);
    });
  });
}

function initSite() {
  if (!localStorage.getItem("People")) {
    localStorage.setItem("People", "[]");
  }
}

$(document).ready(() => {
  initSite();
  initListeners();
});
