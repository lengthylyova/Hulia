function filterFunction() {
	var input, filter, ul, li, a, i;
	input1 = document.getElementById("input1");
	input2 = document.getElementById("input2");
	filter1 = input1.value.toUpperCase();
	filter2 = input2.value.toUpperCase();
	div1 = document.getElementById("dropdown1");
	div2 = document.getElementById("dropdown2");
	btns1 = div1.getElementsByTagName("button");
	btns2 = div2.getElementsByTagName("button");
	for (i = 0; i < btns1.length; i++) {
		txtValue1 = btns1[i].textContent || btns1[i].innerText;
		txtValue2 = btns2[i].textContent || btns2[i].innerText;
		if (txtValue1.toUpperCase().indexOf(filter1) > -1) {
			btns1[i].style.display = "";
		} else {
			btns1[i].style.display = "none";
		}
		if (txtValue2.toUpperCase().indexOf(filter2) > -1) {
			btns2[i].style.display = "";
		} else {
		  	btns2[i].style.display = "none";
		}
	}
}

function fill_input(id) {
	let input = document.getElementById("input"+id[id.length-1])
	input.value = id.slice(0, -1)
}


function get_route() {
	let from = document.getElementById('input1').value
	let to = document.getElementById('input2').value
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
  			let time = document.getElementById("time")
	  		time.innerHTML = "<b>TOTAL TIME:</b> " + data["data"]["time"] + " min."
	  		let transfers = document.getElementById("transfers")
	  		transfers.innerHTML = "<b>TRANSFERS:</b> " + data["data"]["transfers"] + "."
	  		let path = document.getElementById("path")
	  		path.innerHTML = "<b>PATH</b>: <i>" + data["data"]["route"] + "</i>."
  		} else {
  			alert('something wrong')
  		}
  	})
}