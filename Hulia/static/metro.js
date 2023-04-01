function filterFunction() {
	from = document.getElementById("from_input");
	to = document.getElementById("to_input");

	from_filter = from.value.toUpperCase();
	to_filter = to.value.toUpperCase();

	from_list = document.getElementById("from_list");
	to_list = document.getElementById("to_list");

	from_btns = from_list.getElementsByClassName("station");
	to_btns = to_list.getElementsByClassName("station");

	for (i = 0; i < from_btns.length; i++) {
		txtValue1 = from_btns[i].textContent || from_btns[i].innerText;
		txtValue2 = to_btns[i].textContent || to_btns[i].innerText;
		if (txtValue1.toUpperCase().indexOf(from_filter) > -1) {
			from_btns[i].style.display = "";
		} else {
			from_btns[i].style.display = "none";
		}
		if (txtValue2.toUpperCase().indexOf(to_filter) > -1) {
			to_btns[i].style.display = "";
		} else {
		  	to_btns[i].style.display = "none";
		}
	}
}

function fill_input(id) {
	let input_id = id.split('_')[0] + "_input"
	let name = id.split('_')[1]
	let input = document.getElementById(input_id)
	input.value = name
	filterFunction();
}


function get_route() {
	let from = document.getElementById('from_input').value
	let to = document.getElementById('to_input').value
	let city = document.getElementById('city').innerHTML

	let promise = fetch("/"+city+"/route/", {
		method: "POST",
		headers: {
      		'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify({
    		"from": from,
    		"to": to})
  	})
  	.then( res => {
  		return res.json();
  	})

  	promise.then((data) => {
  		if (data["success"] != false) {
  			let result = document.getElementById("result")

  			let time_li = document.getElementById("time")
	  		time_li.innerHTML = "time: " + data["data"]["time"] + " min."

	  		let transfers_li = document.getElementById("transfers")
	  		transfers_li.innerHTML = "transfers: " + data["data"]["transfers"] + "."

	  		let route_li = document.getElementById("route")
	  		let route = data["data"]["route"]
	  		route.innerHTML = "route:"

	  		for (var i = 0; i < data["data"]["route"].length - 1; i++) {
	  			route_li.innerHTML = route_li.innerHTML + " " + route[i] + ", ";
	  		}
	  		route_li.innerHTML = route_li.innerHTML + route[route.length-1] + ".";
  		} else {
  			alert('something wrong')
  		}
  	})
}