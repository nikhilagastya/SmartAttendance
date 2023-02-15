// import React from 'react'

// const Arten = () => {
    
// var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
// var time = new Date();
// var t = document.getElementById("attText").innerText = "Last updated on " + utc + " at " + time.getHours() + ":" + time.getMinutes();

// const searchButton = document.getElementById('main-search-button');
// const searchInput = document.getElementById('search-input');
// searchInput.addEventListener('keypress', (event) => {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         searchButton.click();
//     }
// })
// searchButton.addEventListener('click', (event) => {
//     if (searchInput.value == "") {
//         var safe = document.getElementById("safeSide");
//         safe.innerText = "Enter a valid Netra ID!";
//     }
//     else {
//         var safe = document.getElementById("safeSide");
//         safe.innerText = "";
//         const inputValue = searchInput.value;
//         help(inputValue)
//     }

// });
// function put(y, x) {
//     console.log(y);
//     if (y == 0) {

//         x.innerHTML = "<span>&#10060;</span>"
//         x.style.padding = "0px"
//     }
//     else if (y == 1) {
//         x.innerHTML = "<span>&#9989;</span>"
//         x.style.padding = "0px"
//     }
//     else {
//         x.innerHTML = "<span>&#8413;</span>"
//         x.style.padding = "3px"

//     }
// }

// function coloursetter() {
//     let prgress = document.getElementById("progress")
//     const y = progress.style.width
//     if (y >= "75") {
//         progress.style.backgroundColor = "green"
//         // progress.style.color="white"
//     }
//     else if (y > "45" && y < "75") {
//         progress.style.backgroundColor = "#FFA701"
//         // progress.style.color="black"
//     }
//     else {
//         progress.style.backgroundColor = "red"
//     }

// }

// function put2(y,x){



// }


// function setter(obj) {
//     const a = document.getElementById("1")
//     const b = document.getElementById("2")
//     const c = document.getElementById("3")
//     const d = document.getElementById("4")
//     const e = document.getElementById("5")
//     const f = document.getElementById("6")
//     const g = document.getElementById("7")

//     put(obj.session1, a)
//     put(obj.session2, b)
//     put(obj.session3, c)
//     put(obj.session4, d)
//     put2(obj.session5, e)
//     put2(obj.session6, f)
//     put2(obj.session7, g)

// }

// async function help(s) {
//     const url = "http://teleuniv.in/netra/api.php/"
//     const dat = {
//         "method": "314",
//         "rollno": s
//     }
    
//     const fat = {
//         "method": "32",
//         "rollno": s
//     }

//     let da = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8',
//             "referrerPolicy" : "unsafe_url" 
//         },
//         body: JSON.stringify(dat)


//     }).then((res) => res.json()).then(
//         (data) => {
//             console.log(data)
//             return data
//         })
//     console.log("This is da: " + da)
//     var l = da.attandance.dayobjects[0].sessions
//     // console.log("Printing l: " + l);

//     var overall = da.overallattperformance.totalpercentage;
//     console.log(overall)

//     let fa = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8',
//         },
//         body: JSON.stringify(fat)

//     }).then((res) => res.json()).then(
//         (data) => {
//             d = data
//             console.log(data)
//             return data
//         })
//     console.log(fa.firstname);
//     if (fa.firstname == undefined) {
//         var safe = document.getElementById("safeSide");
//         safeside.innerText = "Enter a valid Netra ID!";

//     }
//     else {
//         document.getElementById("card").style.display = "flex"

//         let name = document.getElementById("name")
//         name.innerText = fa.firstname;
//         console.log(fa.picture)
//         let img = document.getElementById("img")
//         img.src = fa.picture

//         let prgress = document.getElementById("progress")
//         progress.style.width = overall + "%"
//         coloursetter();
//         prgress.innerHTML = overall + "%"
//         progress.style.color = "black"
//         setter(l);


//     }



// }
//     return (
//     <div>
//         <div class="text-center d-flex justify-content-center">
//         </div>
//         <div class="Entire container card-body">
//             <div class="container card-body inputBox">
//                 <div class="main-search-input-wrap">
//                     <div class="main-search-input fl-wrap">
//                         <div class="main-search-input-item form-group">
//                             <form>
//                                 <input id="search-input" class="form-control cookie-text" type="text" placeholder="Enter Netra ID"/>
//                             </form>
//                         </div>
//                         <h6 id="safeside" class="text-center"></h6>
//                         <button id="main-search-button" class="main-search-button">Search</button>
//                     </div>

//                 </div>
//             </div>
//             <br/>
//         <br/>
//           <br/>
//         <br/>
//             <br/>
//             <div class="container container-body card-body result">
//                 <div id="card" class="card card-body container" style="display: none">
//                     <img id="img" src="..." class="card-img-center text-center otherText avatar" style="width:50px;height:50px" alt="..."/>
//                         <div>
//                             <h4 id="name" class="otherText">name</h4>
//                             <h5 class="attendanceText" id="attText">Attendance updated at </h5>
//                             <tr>
//                                 <span id="1"></span>
//                                 <span id="2">&#9989;</span>
//                                 <span id="3">&#9989;</span>
//                                 <span id="4">&#9989;</span>
//                                 <span id="5">&#9989;</span>
//                                 <span id="6">&#9989;</span>
//                                 <span id="7">&#9989;</span>

//                             </tr>

//                             <div class="progress">
//                                 <div id="progress" class="progress-bar text-center" role="progressbar" style="width: 0%;" aria-valuenow="25"
//                                     aria-valuemin="0" aria-valuemax="100"><b> 25%</b> </div>
//                             </div>
//                         </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     )
// }

// export default Arten