const express=require('express')
const ejs=express('ejs')
const path=require('path')
const {v4:uuidv4}=require('uuid')

const app=express() 

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

let posts=[
    { 
        id:uuidv4(),
        username:'kavya',
        content:'I love coding'
    },
    {
        id:uuidv4(),
        username:'manas',
        content:'hard work is important'
    },
    {
        id:uuidv4(),
        username:'aditya',
        content:'I love coding'
    },
]


//index route
app.get('/posts',(req,res)=>{
    res.render('index.ejs', {posts})
})

// create route  new post
app.get('/posts/new',(req,res)=>{
    res.render('new.ejs')
})
//route for add new post
app.post('/posts',(req,res)=>{
    // console.log(req.body)
    let {username,content}=req.body ;
    let Id=uuidv4() 
    posts.push({Id,username,content})  ; // can store this post in backend also
    res.redirect('/posts')
})
//show view route->get post by Id

// UUID package ->universally unique identifier creates a unique string type id-> npm i uuid
app.get('/posts/:id',(req,res)=>{
    let {id}=req.params ;
    let post=posts.find((p)=>id===p.id)
    res.render('show.ejs',{post})
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})