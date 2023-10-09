import request from 'supertest'
import app from '../src/index'
import sequelizeConnection from '../src/db/config';
import Blogs from '../src/db/models/blogs';
import Likes from '../src/db/models/likes';
import BlogsService from '../src/Blogs/Service/BlogsService';
import CommentsService from '../src/Comments/Service/commentsService';
import { Request } from 'express';
import Comments from '../src/db/models/comments';



beforeAll(async () => {
  // Set up your database connection and any necessary configurations
  await sequelizeConnection.sync({ force: true }); // This will recreate your database schema
});

describe("Server.ts tests", () => {
    test("Math test", () => {
      expect(2 + 2).toBe(4);
    });
  });

  describe("POST auth",  ()=>{


    it(" sigin of  a user", async()=>{
        const res = await  request(app).post("/Auth/SignUp/").send({name: "siddharth", password: "PassW0rd!",email: "sid@gmail.com"})  
        expect(res.statusCode).toBe(200);
    })

    it("should return 400 if inputs are missing",async () => {
      const userData ={
        name:"Siddharth",
        email:"sid@gmail.com"
      }
      const res= await request(app).post("/Auth/SignUp").send(userData);
      expect(res.statusCode).toBe(400);
      
    })
    it("should return 400 if Password is Wrong",async () => {
      const userData ={
        name:"Siddharth",
        email:"sid@gmail.com",
        password: "password"
      }
      const res= await request(app).post("/Auth/SignUp").send(userData);
      expect(res.statusCode).toBe(400);
      
    })
  })

  describe("login user ",  ()=>{
    it(" returns 200 when user signin with correct credentials", async()=>{
        const res = await  request(app).post("/auth/Login").send({email:"sid@gmail.com", password:"PassW0rd!"})  
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    })
  })

  describe("creating a blog ",  ()=>{

    it(" returns 401 bad request when user is not authorized", async()=>{
      const res = await  request(app).post("/Blogs/").send({description: "hello i am here"})  
      expect(res.statusCode).toBe(401);
  })

    it(" should create a blog with feilds title, description , userid, CommentsonB", async()=>{
        const BlogContent= {
          title: "test1",
          description : "this is description of test blog",
          userId:1,
          tags: ["dev", "backend"]
        }
        const res = await  Blogs.create(BlogContent);
        
        
        expect(res).toHaveProperty("title");
        expect(res).toHaveProperty("description");
        expect(res).toHaveProperty("likes");
        expect(res).toHaveProperty("userId");

    })

    it('should return bad request if one the feilds is missing',async () => {


      const auth = await  request(app).post("/auth/Login").send({email:"sid@gmail.com", password:"PassW0rd!"}) 
      const token = auth.body.token;
      const BlogContent= {
        title: "test1",
        description : "this is description of test blog",
        userId:1,
       
      }
      const req= request(app).post("/Blogs").send(BlogContent);
      req.set("Authorization", `Bearer ${token}` );
      await req;
      expect((await req).statusCode).toBe(400);
      
    })

  })

  describe("update blog",  ()=>{

    const blogId=1;
    const userId=1;
    const fakeuserId=2;
    it(" returns 401 bad request when user is not authorized", async()=>{

      const res = await  request(app).patch(`/Blogs/${blogId}`).send({description: "hello i am here"})  
      expect(res.statusCode).toBe(401);
  })

  it("Only the user who have created the Blog can delete the Blog",async () => {
         const blogService= new BlogsService();
         const req = await blogService.updateBlog({blogId,title:"changed title",fakeuserId});
         expect(req).toBeUndefined();
  })
  })

  describe('Get All Blogs',()=>
  {
    it("All blogs should return Object",async () => {
      const auth = await  request(app).post("/auth/Login").send({email:"sid@gmail.com", password:"PassW0rd!"}) 
      const token = auth.body.token; 
        const req=request(app).get('/Blogs/allBlogs'); 
        req.set("Authorization", `Bearer ${token}` );
        const res= await req;
        expect( res.body[0]).toHaveProperty("title");
        expect(res.body[0]).toHaveProperty("description");
        expect(res.body[0]).toHaveProperty("likes");
        expect(res.body[0]).toHaveProperty("userId");
        
    })
  })

 
  describe("Liking a blog",  ()=>{

    it(" should create a row in like table with feilds userId, Blogid", async()=>{
        
        const testUserId=1;
        const testblogId=1;
        const likeCreated = await Likes.create({userId:testUserId, blogId:testblogId})
        expect(likeCreated.userId).toBe(testUserId);
        expect(likeCreated.blogId).toBe(testblogId);
        
    })
  })

  describe("posting a comment",  ()=>{
    
   const  blogId=1;
    const userId=1;
   const comment = "this is test Comment";
        it("Should Post a Comment with feild UserId, BlogId, comment ",async () => {
          const commentService = new CommentsService();
          const req= await commentService.createComment({blogId, loggedUserId:userId,comment});
          expect(req).toHaveProperty('userId');
          expect(req).toHaveProperty('blogId');
          expect(req).toHaveProperty('comment');


        })
        it("updating other user comment will give error",async () => {
          
          const fakeUserId=2;
          const commentService = new CommentsService();
          const req= await commentService.updateComment({commentId:1,loggedUserId:fakeUserId,newComment:"new Comment"});
          expect(req).toEqual("You are Not allowed to upadte Comment");
          
        })


      
  })

  describe("Posting a reply", ()=>
  {

    it("posting a reply",async () => {
      const commentService = new CommentsService();
      const commentId=1;
      const userId=1;
      const blogId=1;
      const reply = "this is test reply"; 
      const req = await commentService.postReply({commentId,loggedUserId:userId,blogId,reply});
      expect(req).toHaveProperty('userId');
      expect(req).toHaveProperty('parentId');
    })

    it("deleting a comment shoud delete coressponding replies",async () => {
      const commentService = new CommentsService();
      const commentId=1;
      const userId=1;
      const req = await commentService.deleteComment({commentId,loggedUserId:userId});
      const row= await Comments.findOne({where:{parentId:commentId}});
      expect(row).toBeNull();

    })


  }
  )
 
  

 

  

  afterAll(done=>
    {
        sequelizeConnection.close();
        done();
    })





// import { Request, Response } from 'express';
// import Blogs from '../src/db/models/blogs';


// jest.mock('sequelize', () => {
//   return {
//     define: (modelName: string, fields: any) => {
//       return {
//         modelName,
//         findAll: jest.fn(),
//       };
//     },
//   };
// });

// describe('Blog Controller', () => {
//   it('should get all blogs', async () => {
//     const req = {} as Request;
//     const res = {} as Response;
//     res.json = jest.fn();

//     const mockUser = { id: 1, name: 'testuser', email: "sid@gmail.com", password: "P@s$w0rd!" };
//     const mockBlogs = [{ id: 1, title: 'Blog 1' , description: "lorem"}, { id: 2, title: 'Blog 2' ,description: "lorem"}];

//     Blogs.findAll = jest.fn().mockResolvedValue(mockBlogs);

//     const { getAllBlogs } = require('../src/controllers/blogs');
//     await getAllBlogs(req, res);

//     expect(res.json).toHaveBeenCalledWith(mockBlogs);
//   });

//   // Add more test cases for your controllers and services
// });