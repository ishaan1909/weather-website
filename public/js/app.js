/* fetch is a brower based api used in modern browsers but is not accessible in nodeJS and therefore
not in backend but in FrontEnd JS*/

// fetch("http://localhost:3000/weather?address=mumbai").then((response)=>{ // here the callback is then.(()=>{})
//     response.json().then((data)=>{ 
        
//         if(data.error){
//             console.log("error")
//         }else{
//             console.log(data.location) // the names location , desc, temperature are same as that in the app.js file in the src folder 
//             console.log(data.desc)
//             console.log(data.temperature)
//         }
        
//     })
// })
const weatherForm = document.querySelector("form")  // here the weatherForm is a const on which we want to losten to events 

const search = document.querySelector("input") // the object of the input is selected and the actual text typed is n the value property

const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2")

const imageURL = document.querySelector("img")
message1.textContent=""
message2.textContent = ""
imageURL.src = ""


function checkIfStringHasSpecialChar(_string)
{
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(spChars.test(_string)){
      return false;
    } else {
      return true;
    }
}

function hasNumber(str) {
    var pattern = /\d/;
    return !pattern.test(str);
}


weatherForm.addEventListener("submit",(e)=>{ // the eventlistener is "submit" and the event is 'e'
    e.preventDefault(); // this is used so that the page will not refresh itself after the button is pressed

    const location = search.value // the actual selected text is in the value property 

    
    if(checkIfStringHasSpecialChar(location) && hasNumber(location))
    {
       const url = "http://localhost:3000/weather?address="+location;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.errorMessage){
                // message2.textContent=error
                message1.textContent="Unable to connect to the internet"
                message2.textContent =""
                imageURL.src =""
            }else{
                // console.log(data.location)
                // console.log(data.temperature)
                // console.log(data.desc);
                message1.textContent="The temperature of "+data.location+" is "+data.temperature;
                message2.textContent = "Description:  "+data.desc;
                imageURL.src ="https://openweathermap.org/img/wn/"+data.iconId+"@2x.png"
            }
        })
    }) 
    }
    else{
        message1.textContent="Error"
        message2.textContent =""
        imageURL.src =""
    }
    console.log(checkIfStringHasSpecialChar(location))
})