import React, { useEffect, useState } from "react";
import { deleteBlog, getBlog, postComment, postReply } from "../../../http";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers";

const approvedStatus = [200, 201];
const Blog = () => {
  const userId = useSelector((state: RootState) => {
    return state.user.userId
  });
  const [openReply, setOpenReply] = useState<Record<string, any>>({
    visible: false,
    id: 0,
  });
  const router = useRouter();
  const blogId = router.query.id;
  console.log(router.query);
  const [blog, setblog] = useState<Record<string, any>>({});
  useEffect(() => {
    async function getblog() {
      if (blogId) {
        const data = await getBlog(+blogId);
        setblog(data.data[0]);
      } else {
        console.error("Not able to find Blog");
      }
    }
    getblog();
  }, [blogId]);
  console.log(blog);

  const [reply, setReply] = useState("");
  const [comment, setComment] = useState("");
  const handleChange = (e: any) => {
    setComment(e.target.value);
    console.log("Comment is ", comment);
  };
  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    console.log("comment is", comment);
    if (blogId) {
      console.log("i am here");

      const resp = await postComment(+blogId, { comment });
      console.log("this is response", resp);

      window.location.reload();
    } else {
      router.push("/LoginReq");
    }
  };

  const handleReplyChange = (commentId: number) => {
    const { visible, id } = openReply;
    setOpenReply({ ...openReply, visible: !visible, id: commentId });
  };
  const handleReplySubmit = async (
    e: any,
    blogId: number,
    commentId: number
  ) => {
    e.preventDefault();
    const resp = await postReply(blogId, commentId, { reply: reply });
    if (!approvedStatus.includes(resp.status)) {
      router.push("/Blogs");
    } else {
      window.location.reload();
    }
  };
  const handleDelete = async () => {
    if (blogId) {
      console.log("deleting the blog")
      const resp = await deleteBlog(+blogId);
      if (approvedStatus.includes(resp.status)) {
        router.push("/Blogs")
      } else {
        console.log("Not able to delete blog");
      }
    }
  };
  console.log("userId is", userId);
  return (
    <>
      <main className=" relative pt-5 pb-10 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-500 antialiased rounded-[20px]">
        {userId != undefined && userId === blog?.userId ? (
          <div className="inline-flex right-0">
            <form
              onClick={handleDelete}
              className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Delete
            </form>
            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Edit
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <div className="mx-auto  max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      {" "}
                      Author:{" "}
                    </p>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {blog?.user?.name}
                    </a>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {" "}
                {blog.title}
              </h1>
            </header>

            <p>{blog.description}</p>

            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion
                </h2>
              </div>
              <form className="mb-6">
                <div className="  bg-white rounded-lg rounded-t-lg  border-gray-200 dark:bg-gray-500   dark:border-gray-500">
                  <label id="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={6}
                    className="p-2 w-full text-sm rounded-md  text-gray-300 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-end py-2.5 px-4 bg-teal-600 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  onClick={handleCommentSubmit}
                >
                  Post comment
                </button>
              </form>

              <div>All comments</div>
              {blog.CommentsOnBlog?.map((comment: Record<string, any>) => {
                return (
                  <article className="p-2 mb-3 w-full text-sm rounded-md  text-gray-300 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800">
                    <p>{comment.comment}</p>
                    {comment?.replies?.length > 0 ? (
                      <>
                        <div className="text-slate-400"> Replies:-</div>
                        {comment?.replies?.map((reply: Record<string, any>) => {
                          return (
                            <ul className=" text-slate-300 text-right underline">
                              <li>{reply.comment}</li>
                            </ul>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="flex items-center mt-4 space-x-4">
                      <button
                        type="button"
                        className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                        onClick={() => {
                          handleReplyChange(comment.id);
                        }}
                      >
                        <svg
                          className="mr-1.5 w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                        </svg>
                        Reply
                      </button>
                    </div>
                    {openReply.visible &&
                    comment.id === openReply.id &&
                    blogId ? (
                      <form
                        className="inline-flex justify-center items-center "
                        onSubmit={(e) => {
                          handleReplySubmit(e, +blogId, comment.id);
                        }}
                      >
                        <input
                          id="reply"
                          name="reply"
                          value={reply}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="your reply"
                          required
                          onChange={(e) => {
                            setReply(e.target.value);
                          }}
                        />

                        <button
                          type="submit"
                          className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg   sm:w-auto  p-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                        >
                          Submit
                        </button>
                      </form>
                    ) : (
                      <></>
                    )}
                  </article>
                );
              })}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
