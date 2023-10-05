import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://soorajvarrma:Uq5IEd6zG4JeZJoD@mycluster.wqzwe4i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", function (req, res) {
    res.render("index.ejs")
});
app.post("/", async (req,res) =>{
    
  

    try {
        await client.connect();
        const db = client.db('evaluation');
        const collection = db.collection('users');
    
        // Find the document in the collection
        const first = await collection.findOne({
            email: req.body.email,
            password: req.body.password          
        });
        if(first){
            res.render("home.ejs" ,{
                emailid : req.body.email
            })
        }else{
            res.redirect("/")
        }
      }finally {
        // Close the database connection when finished or an error occurs
        await client.close();
      }

})
app.get("/signup",  function (req, res) {
    res.render("signup.ejs")
});
app.post("/signup", async (req, res)=> {

  if(req.body.email==''||req.body.gender==''||req.body.company==''||req.body.password==''){
    res.render("signup.ejs")
  }
    try {
        await client.connect();
        const db = client.db('evaluation');
        const collection = db.collection('users');
    
        // Find the first document in the collection
        const first = await collection.insertOne({
          email: req.body.email,
          password: req.body.password,
          company: req.body.company,
          gender: req.body.gender
        });
        console.log(first);
      } finally {
        // Close the database connection when finished or an error occurs
        await client.close();
      }
    res.redirect("/")
  });

app.get("/home",  function (req, res) {
    res.render("home.ejs")
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  