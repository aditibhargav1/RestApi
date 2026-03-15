const express=require("express");

const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('view engine',"ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts = [
    {
        id:uuidv4(),
        username: "rahul",
        photo: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", // sample
        caption: "I love coding!"
    },
    {
        id:uuidv4(),
        username: "shradha",
        photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        caption: "Hard work is important to achieve success"
    },
    {
        id:uuidv4(),
        username: "riddhi",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        caption: "I got selected for my 1st internship"
    }
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,photo,caption}=req.body;
    let id=uuidv4();
    const newPost = { id, username, photo, caption };
    posts.push(newPost);
    console.log(" New post created:", newPost);
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post}); 
    
})

app.patch("/posts/:id/",(req,res)=>{
    let {id,username}=req.params;
    let newPara=req.body.caption;
    let newUrl=req.body.photo;
    let post=posts.find((p)=>id==p.id);
    post.photo=newUrl;
    post.caption=newPara;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id,username}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});
