const fs = require("fs");
const http = require("http")
const url = require("url")
const slugify = require("slugify")
// Files

/////////////////////////////////////

// Synchronos way for writing/reading files
// const file =fs.readFileSync("./txt/input.txt","utf-8");
// const text = `The content of the file is: ${file}\nIt was created on ${Date.now()}`
// fs.writeFileSync("./txt/output.txt",text);
// console.log("File Created.");

// Asynchronus way for writing/reading files
// fs.readFile("./txt/start.txt","utf-8",(err,data1)=>{
//     fs.readFile(`./txt/${data1}.txt`,"utf-8",(err,data2)=>{
//         console.log(data2)
//         fs.readFile("./txt/append.txt","utf-8",(err,data3)=>{
//             console.log(data3)

//             fs.writeFile("./txt/final.txt",`${data2}\n${data3}`,"utf-8",err=>{
//                 console.log("Your file has been written.")
//             })
//         })
//     })
// })
// console.log("Reading and writing files...");

///////////////////////////////////////

// Server
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8")
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,"utf-8")
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8")
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")
const dataObj = JSON.parse(data)
const slugifiedString = slugify("My String",{lower: true})
console.log(slugifiedString)
const replaceTemplate = (temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%ID%}/g,product.id)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%FROM%}/g,product.from)
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    if(!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g,"not-organic")
    } 
    return output
}
const server = http.createServer((req,res)=>{
    const {query,pathname} = url.parse(req.url,true)
    // OVERVIEW PAGE
    if(pathname==="/"||pathname==="/overview"){
        res.writeHead(200,{"content-type":"text/html"})
        const cardsHTML = dataObj.map((el)=>replaceTemplate(tempCard,el)).join('')
        let output = tempOverview.replace(/{%PRODUCT_CARDS%}/g,cardsHTML)
        res.end(output)
    }
    // PRODUCT PAGE 
    else if(pathname==="/product"){
        res.writeHead(200,{
            'content-type': 'text/html'
        })
        const product = dataObj[query.id]
        const output = replaceTemplate(templateProduct,product);
        res.end(output)
    }
    // API
    else if(pathname==="/api"){
        res.writeHead(200,{
            "content-type": "application/json"
        })
        res.end(data)
    }
    // NOT FOUND
    else{
        res.writeHead(404,{
            "content-type": "text/html"
        });
        res.end("<h1>Page not found!</h1>")
    }
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("Listening to the port 8000")
})