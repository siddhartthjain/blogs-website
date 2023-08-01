import request from 'supertest'
import app from '../src/index'
import sequelizeConnection from '../src/db/config';
import Blogs from '../src/db/models/blogs';
import Likes from '../src/db/models/likes';


describe("Server.ts tests", () => {
    test("Math test", () => {
      expect(2 + 2).toBe(4);
    });
  });

  // describe("POST auth",  ()=>{
  //   it(" sigin of  a user", async()=>{
        
  //       const res = await  request(app).post("/Auth/SignUp/").send({name: "siddharth", password: "PassW0rd!",email: "sid@gmail.com"})  
  //       expect(res.statusCode).toBe(200);
  //   })
  // })

  describe("login user ",  ()=>{
    it(" returns 200 when user signin with correct credentials", async()=>{
        const res = await  request(app).get("/auth/Login").send({email:"sid@gmail.com", password:"PassW0rd!"})  
        expect(res.statusCode).toBe(200);
    })
  })

  describe("creating a blog ",  ()=>{
    it(" should create a blog with feilds title, description , userid", async()=>{
        const BlogContent= {
          title: "test1",
          description : "this is description of test blog",
          userId:1
        }
        const blogCreated = await Blogs.create(BlogContent)
        expect(blogCreated.title).toBe(BlogContent.title);
        expect(blogCreated.description).toBe(BlogContent.description);
        expect(blogCreated.userId).toBe(BlogContent.userId);



    })
  })

  describe("POST blog",  ()=>{
    it(" returns 401 bad request when user is not authorized", async()=>{
        const res = await  request(app).post("/Blogs/").send({description: "hello i am here"})  
        expect(res.statusCode).toBe(401);
    })
  })

  describe('Get All Blogs',()=>
  {
    it("All blogs should return Object",async () => {
        const res = await request(app).get('/Blogs/allBlogs');
        expect(res.body).toBeInstanceOf(Object);
        
    })
  })

 
  describe("creating a like",  ()=>{
    it(" should create a row in like table with feilds userId, Blogid", async()=>{
        
        const testUserId=1;
        const testblogId=2;
        const likeCreated = await Likes.create({userId:testUserId, blogId:testblogId})
        expect(likeCreated.userId).toBe(testUserId);
        expect(likeCreated.blogId).toBe(testblogId);
        



    })
  })
 

 

  

  afterAll(done=>
    {
        sequelizeConnection.close();
        done();
    })
