// console.log(__dirname); // this __dirname is found using the wrapper function which we saw in the debugger(Chrome)  
// console.log(__filename); // same comment as above

/*as this process gives only the directory name where the current file is residing and therefore not much use when
we want to see the directory where the index.html lives  .... Therefore use the core module path (refer the nodeJS documentation)*/

//requiring the core modules first 

const path = require("path");

// "path" need not be installed uisng npm as it is a core module

// console.log(path.join(__dirname,"../public")) 
/* here we used the join function where the ../ will bring the command 
line to the previous folder (as we had two different folders for 2 completely different files we used join instead of string concaten.)*/


const express = require('express') // here const express is a function and not a variable

const hbs = require('hbs') // this has been added when we wrked with advanced templates

//Requiring the geocode and forecast functions
const geocode = require("./utils/geocode"); 
const forecast = require("./utils/forecast");

const app = express(); // no arguments ... use this app to do everything

const publicDirectoryPath = path.join(__dirname,"../public"); // this is just the name of the absolute directory which contains the HTML  file

//setup static directory
app.use(express.static(publicDirectoryPath)); // after writing this line go to "/" we'll see contents of html page

/*
Here we see that when we load the "/" then we directly see the html page therefore the app.get("/") is ineffective there commented out
*/

//For dynamic content we use handlebars(hbs) and remove the index.html file and add the hbs files(index.hbs - we also copied the index.html to the index.hbs)
app.set('view engine','hbs')//this tells express which templating engine we are setting up 
// as we are only viewing then 'view engine'  
/*  **WE INSTALLED HBS NPM PACKAGE** */


// Define path for Express configuration
const viewPath = path.join(__dirname,"../templates/views")  // created a path to the views directory
const partialsPath = path.join(__dirname,"../templates/partials") // created the path for partials directory

app.set('views',viewPath) // to set the Express to tell it the location of our views

hbs.registerPartials(partialsPath) // IMP : to set the path for the partials

app.get("",(req,res)=>{
    res.render(('index') , { // only index and not index.hbs is absolutely alright
        title:'Weather',
        name: 'Ishaan Joshi'
    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        title:"About the project ",
        name :"Ishaan Joshi"
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"Help page",
        title:"Help",
        name:"Ishaan Joshi"
    })
})



//app.com 'root' route
//app.com/help
//app.com/about

// app.get("/",(req,res)=>{ // req = request i.e the incomming data to the root route and the res = response of the get request
//     res.send("<h1>Hello,Express!</h1>") // here we see that we can send back HTML using res.send 
// })

/*
Now that we have created the HTML files for help and the about paths we can remove both the get requests
*/


// app.get("/help",(req,res)=>{ // here we see that we can send JSON objects or arrays using res.send
//     //JSON object
    
//     // res.send({  
//     //     name:"Ishaan",
//     //     age:20
//     // })

//     //arrays
//     res.send([ 
//         {
//             name:"Ishaan",
//             age : 20
//         },
//         {
//             name:'Mike',
//             age:30
//         }
//     ])
// })


// app.get("/about",(req,res)=>{
//     res.send("<h1>This is the about page</h1>")
// })

app.get("/weather",(req,res)=>{
    if(!req.query.address){ // this is specifically for error handling
        return res.send("Please provide an address"); // return is written as we wanted to have only 1 res.send 
    }
    const myaddress = req.query.address.toString();
    geocode(myaddress,(error,{latitude,longitude})=>{
        if(error){
            return res.send({
                errorMessage:true
            })
        }
        forecast(latitude,longitude,(error,{temperature,desc,iconId})=>{
            if(error){
                return res.send({
                    errorMessage:"Unable to get the forecast"
                })
            }
            res.send({
                location:myaddress,
                temperature,
                desc,
                iconId
            })
        })
    })
})


app.get("/products",(req,res)=>{ 

    if(!req.query.search){
        return res.send({
            errorMessage: "You must provide a search term"
        })
    }

    res.send({
        products:[]
    })
    console.log(req.query.search)
})


app.get("/help/*",(req,res)=>{ // this is another example of the wildcard but in the help page
    res.render("page404",{
        title:"Help 404 page", // used in the partial (header)
        content:"Help article not found", // this is used in the page404.hbs 
        name:"Ishaan Joshi"// used in the partial (footer)
    })
})

app.get("*",(req,res)=>{ /* here * is a wildcard and should alwaysbe placed as the last 
    get request so that when the application reaches the end it will run this */
    res.render("page404",{
        title:"Error",
        content:"Error loading the contents on the screen", // same as the previous get request
        name:"Ishaan Joshi"
    })
})

//Starting the server up

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running on port 3000");
})//only once in the entire application


