import express from "express";
import bodyParser from "body-parser";

const app = express(); 
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function Blog(ttl,cnt){
    this.title = ttl;
    this.content = cnt;
}

const fstBlog = new Blog("Welcome", "This is an example blog.");
var blogList = [fstBlog];

app.get("/", (req,res) => {
    const data = {
        bList: blogList,
        viewBlog: blogList[blogList.length-1],
    };
    res.render("index.ejs", data);
})

app.get("/create", (req,res) => {
    res.render("create.ejs");
})

app.get("/update", (req,res) => {
       const data = {
        bList: blogList,
        viewBlog: blogList[blogList.length-1],
    };
    res.render("update.ejs", data);
})

app.post("/create/blog", (req, res) => {
    const newBlog = new Blog(req.body.title,req.body.content);
    blogList.push(newBlog);
    const data = {
        bList: blogList,
        viewBlog: blogList[blogList.length-1],
    };
    res.render("index.ejs", data);
});

app.post("/update/blog", (req, res) => { 

    if (req.body.action === "update") {
        var blog = blogList[req.body.index];
        blog.title = req.body.title;
        blog.content = req.body.content;
    }

    if (req.body.action === "delete") {
        blogList.splice(req.body.index, 1);

        if(blogList.length === 0){
            blogList.push(fstBlog);
        }
    }

    const data = {
        bList: blogList,
        viewBlog: blogList[blogList.length-1],
    };
    res.render("index.ejs", data);
});

app.get("/read", (req, res) => {
    const data = {
        bList: blogList,
        viewBlog: blogList[req.query.index],
    };
    res.render("index.ejs", data);
})

app.get("/edit", (req, res) => {
    const data = {
        bList: blogList,
        viewBlog: blogList[req.query.index],
    };
    res.render("update.ejs", data);
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
