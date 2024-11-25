const express=require('express')
const ejs=express('ejs')
const path=require('path')
const {v4:uuidv4}=require('uuid')
const methodOverride=require('method-override')

const app=express() 

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))  // track in query string that there is _method

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
    let id=uuidv4() 
    posts.push({id,username,content})  ; // can store this post in backend also
    res.redirect('/posts')
})
//show view route->get post by Id

// UUID package ->universally unique identifier creates a unique string type id-> npm i uuid
app.get('/posts/:id',(req,res)=>{
    let {id}=req.params ;
    let post=posts.find((p)=>id===p.id)
    res.render('show.ejs',{post})
})

// update route->to update specific post 
//we can send get/post request in HTML form
// so use method-override package-> npm i method-override->which lets u to use HTTP verbs such as PUT DELETE in place where client does'nt support it
//   <form method="POST" action='/resource?_method=PATCH'></form>  --->here resource is posts
// app.use(methodOverride('_method'))
app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params ;
    let newContent=req.body.content
    let post=posts.find((p)=>id===p.id)
    post.content=newContent
    res.redirect('/posts')
})

//delete route
app.delete('/posts/:id',(req,res)=>{
    let {id}=req.params ;
     posts=posts.filter((p)=>id!==p.id)
    res.redirect('/posts')
})
//edit(form render to edit content then submit button will redirect tp all post index.ejs page) 
//server the edit form 
app.get('/posts/:id/edit',(req,res)=>{
      let {id}=req.params ;
      let post=posts.find((p)=>id===p.id)
      res.render('edit.ejs', {post})
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})