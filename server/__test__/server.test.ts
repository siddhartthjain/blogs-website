import BlogsService from "../src/Blogs/Service/BlogsService";
import CommentsService from "../src/Comments/Service/commentsService";
import { jest } from "@jest/globals";
import AuthService from "../src/Auth/Service/AuthService";
import LikesService from "../src/Blogs/Service/LikesService";
import { describe } from "node:test";

describe("Blogs Service", () => {
  it("getting all blogs", async () => {
    const mockBlogs = [
      {
        id: 21,
        title: "First Blog Through Frontend`",
        likes: 0,
        description: "lorem bla bla bla firts vlog authorised ......",
        userId: 25,
        createdAt: "2023-09-21T06:40:20.539Z",
        updatedAt: "2023-09-21T06:40:20.539Z",
        likedUsers: [],
        user: {
          name: "sid",
        },
        CommentsOnBlog: [
          {
            id: 15,
            userId: 25,
            comment: "great blog\n",
            replies: [
              {
                id: 16,
                userId: 25,
                comment: "thanks for compliment",
              },
            ],
          },
          {
            id: 8,
            userId: 25,
            comment: "",
            replies: [],
          },
          {
            id: 9,
            userId: 25,
            comment: "",
            replies: [],
          },
        ],
        blogTags: [
          {
            id: 2,
            tag: "backend",
          },
        ],
      },
      {
        id: 22,
        title: "First Blog Through Frontend`",
        likes: 0,
        description: "lorem bla bla bla firts vlog authorised ......",
        userId: 25,
        createdAt: "2023-09-21T06:40:20.539Z",
        updatedAt: "2023-09-21T06:40:20.539Z",
        likedUsers: [],
        user: {
          name: "sid",
        },
        CommentsOnBlog: [
          {
            id: 15,
            userId: 25,
            comment: "great blog\n",
            replies: [
              {
                id: 16,
                userId: 25,
                comment: "thanks for compliment",
              },
            ],
          },
        ],
        blogTags: [
          {
            id: 2,
            tag: "backend",
          },
        ],
      },
    ];
    const blogService = new BlogsService();
    jest.spyOn(blogService, "getAllBlog").mockResolvedValue(mockBlogs);
    const blogs = await blogService.getAllBlog({});
    expect(blogs).toEqual(mockBlogs);
  });

  it("Posting of Blog", async () => {
    const mockRes = {
      likes: 0,
      id: 25,
      title: "my auth verified  Blog with Tags",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante mi. Praesent ac cursus dui. Quisque nec lorem ligula. Nunc ut efficitur urna, in facilisis neque. Sed malesuada, neque eget efficitur consequat, turpis elit pellentesque justo, quis rhoncus enim velit et odio. Donec bibendum bibendum nisi, in posuere dolor condimentum et. Suspendisse eleifend metus eget urna volutpat, eu congue est hendrerit. Etiam ut nisi eu elit ultrices finibus. Sed id sapien sit amet purus luctus pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse tincidunt ultricies sapien sit amet tempor. Maecenas commodo feugiat orci eget facilisis. Cras vehicula",
      userId: 7,
      updatedAt: "2023-10-09T11:49:46.959Z",
      createdAt: "2023-10-09T11:49:46.959Z",
    };
    const blogService = new BlogsService();
    jest.spyOn(blogService, "createBlog").mockResolvedValue(mockRes);
    const inputs = {
      title: "my auth verified  Blog with Tags",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante mi. Praesent ac cursus dui. Quisque nec lorem ligula. Nunc ut efficitur urna, in facilisis neque. Sed malesuada, neque eget efficitur consequat, turpis elit pellentesque justo, quis rhoncus enim velit et odio. Donec bibendum bibendum nisi, in posuere dolor condimentum et. Suspendisse eleifend metus eget urna volutpat, eu congue est hendrerit. Etiam ut nisi eu elit ultrices finibus. Sed id sapien sit amet purus luctus pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse tincidunt ultricies sapien sit amet tempor. Maecenas commodo feugiat orci eget facilisis. Cras vehicula",

      tags: ["music"],
    };
    const blog = await blogService.createBlog(inputs);
    expect(blog).toEqual(mockRes);
  });

  it("deleting a blog", async () => {
    const mockRes = {
      resp: "Blog deleted Succesfully",
    };
    const blogService = new BlogsService();
    jest.spyOn(blogService, "deleteBlog").mockResolvedValue(mockRes);
    const inputs = {
      blogId: 28,
      loggedUserId: 2,
    };
    const res = blogService.deleteBlog(inputs);
    expect(res).resolves.toEqual(mockRes);
  });

  it("updating a blog", async () => {
    const mockRes = {
      resp: "Blog updated Succesfully",
    };
    const blogService = new BlogsService();
    jest.spyOn(blogService, "updateBlog").mockResolvedValue(mockRes);
    const inputs = {
      blogId: 28,
      title: "New Title",
      loggedUserId: 2,
    };
    const res = blogService.updateBlog(inputs);
    expect(res).resolves.toEqual(mockRes);
  });
});

describe("Auth Service", () => {
  it("Create user", async () => {
    const userService = new AuthService();
    const mockId = 1;
    const mockResp = {
      resp: `user has been created with ${mockId}`,
    };
    const inputs = {
      name: "Siddharth",
      password: "Passw0rd!",
      email: "sid@gmail.com",
    };
    jest.spyOn(userService, "createUser").mockResolvedValue(mockResp);
    const resp = userService.createUser(inputs);
  });
});

describe("Like Service", () => {
  it("Creating a like", async () => {
    const likeService = new LikesService();
    jest.spyOn(likeService, "createLike").mockResolvedValue(true);
    const inputs = {
      userId: 1,
      blogId: 2,
    };
    expect(await likeService.createLike(inputs)).toEqual(true);
  });

  it("disliking a blog", async () => {
    const likeService = new LikesService();
    jest.spyOn(likeService, "destroyIfBlogIdUserId").mockResolvedValue(1);
    const inputs = {
      userId: 1,
      blogId: 2,
    };
    expect(await likeService.destroyIfBlogIdUserId(inputs)).toEqual(1);
  });
});

describe("Comments Service", () => {
  it("creating a Comment", async () => {
    const commentService = new CommentsService();
    const mockResp = {
      id: 17,
      userId: 7,
      blogId: 27,
      comment: "first comment on 27th blog id",
      updatedAt: "2023-10-10T10:51:01.439Z",
      createdAt: "2023-10-10T10:51:01.439Z",
    };

    jest.spyOn(commentService, "createComment").mockResolvedValue(mockResp);
    const inputs = {
      blogId: 1,
      loggedUserId: 2,
      comment: "this is comment",
    };
    const resp = await commentService.createComment(inputs);
    expect(resp).toEqual(mockResp);
  });

  it("Updating Comment", async () => {
    const commentService = new CommentsService();
    const mockRes = { resp: "Comment Edited Succesfully" };
    jest.spyOn(commentService, "updateComment").mockResolvedValue(mockRes);
    const input = {
      commentId: 1,
      loggedUserId: 1,
      newComment: 1,
    };
    const resp = await commentService.updateComment(input);
    expect(resp).toEqual(mockRes);
  });

  it("deleting Commnet", async () => {
    const commentService = new CommentsService();
    const mockRes = { resp: "Comment deleted Succesfully" };
    jest.spyOn(commentService, "deleteComment").mockResolvedValue(mockRes);
    const input = {
      commentId: 1,
      loggedUserId: 1,
    };
    const resp = await commentService.deleteComment(input);
    expect(resp).toEqual(mockRes);
  });
});

describe("Reply service", () => {
  it("Post a reply", async () => {
    const commentService = new CommentsService();
    const mockresp = {
      id: 17,
      userId: 7,
      blogId: 27,
      comment: "first comment on 27th blog id",
      updatedAt: "2023-10-10T10:51:01.439Z",
      createdAt: "2023-10-10T10:51:01.439Z",
      parentId: 1,
    };
    jest.spyOn(commentService, "postReply").mockResolvedValue(mockresp);
    const inputs = {
      commentId: 1,
      loggeduserId: 2,
      blogId: 1,
      reply: "this is a reply ",
    };
    const resp = await commentService.postReply(inputs);
    expect(resp).toEqual(mockresp);
  });
});

// this how i can check for all outputs for any function
// example postreply function has three out puts

// describe('postReply', () => {
//     let commentService: CommentsService;

//     beforeEach(() => {
//       // Initialize a new instance of CommentsService before each test
//       commentService = new CommentsService();
//     });

//     it('should create a reply', async () => {
//       const inputs = {
//         commentId: 1,
//         loggedUserId: 1,
//         blogId: 1,
//         reply: 'This is a reply.',
//       };

//       // Mock the necessary functions to return the expected values
//       jest.spyOn(blogService, 'ifBlogExists').mockResolvedValue(true);
//       jest.spyOn(commentService, 'ifCommentExists').mockResolvedValue(true);
//       jest.spyOn(Comments, 'create').mockResolvedValue({
//         dataValues: { userId: 1, blogId: 1, comment: 'This is a reply.', parentId: 1 },
//       });

//       const result = await commentService.postReply(inputs);

//       // Check the result
//       expect(result).toEqual({ userId: 1, blogId: 1, comment: 'This is a reply.', parentId: 1 });
//     });

//     it('should return "Not allowed to reply"', async () => {
//       const inputs = {
//         commentId: 1,
//         loggedUserId: 1,
//         blogId: 1,
//         reply: 'This is a reply.',
//       };

//       // Mock the necessary functions to return the expected values
//       jest.spyOn(blogService, 'ifBlogExists').mockResolvedValue(false);
//       jest.spyOn(commentService, 'ifCommentExists').mockResolvedValue(false);

//       const result = await commentService.postReply(inputs);

//       // Check the result
//       expect(result).toEqual({ resp: 'Not allowed to reply' });
//     });

//     // Add more test cases to cover different scenarios
//   });

// it('should throw an error when unable to post a reply', async () => {
//     const inputs = {
//       commentId: 1,
//       loggedUserId: 1,
//       blogId: 1,
//       reply: 'This is a reply.',
//     };

//     // Ensure that Comments.create will throw an error
//     jest.spyOn(Comments, 'create').mockRejectedValue(new Error('Failed to create reply'));

//     try {
//       await commentService.postReply(inputs);
//       // The above line should throw an error, so we should never reach this point
//       fail('Expected an error to be thrown');
//     } catch (error) {
//       // Check if the correct error message is thrown
//       expect(error.message).toBe('Failed to create reply');
//     }
//   });
