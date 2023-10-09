import React, { useState } from "react";
import { postBlog } from "../../../http";
import { useRouter } from "next/router";

const approvedStatus = [200, 201];

const post = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log("name is ", name);
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else {
      setTagsInput(value);
    }
  };
  const handleSpace = (e: any) => {
    if (e.key === " " && tagsInput) {
      console.log(tagsInput);
      setTags([...tags, tagsInput]);
      setTagsInput("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("title is ", title);
    console.log("description is", description);
    console.log("tags are", tags);

    const resp = await postBlog({ title, description, tags });
    if (approvedStatus.includes(resp.status)) {
      console.log("Blog posted Succesfully");
      router.push("/Blogs");
    } else {
      console.log("failed due to ", resp.status);
      router.push("/LoginReq");
    }
  };
  return (
    <section className="  flex flex-col rounded-lg p-2 mx-auto shadow dark:border justify-center sm:max-w-md xl:p-2 dark:bg-gray-100 dark:border-gray-700">
      <h1 className="text-lg font-bold mx-auto">Post Your blog here</h1>
      <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            id="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            {" "}
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
          />
        </div>

        <label
          id="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          name="description"
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="description of Blog"
          onChange={handleChange}
        ></textarea>
        <div className="mt-6">
          <label
            id="tags"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Tags
          </label>
          <input
            name="tags"
            type="text"
            id="tags"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={tagsInput}
            onChange={handleChange}
            onKeyPress={handleSpace}
            placeholder="press space to save the tags"
          />
        </div>

        <div className="flex items-center mt-2">
          {tags?.map((tag) => {
            return (
              <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5  mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {tag}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className=" mx-auto w-20 mt-5 text-white bg-slate-800 hover:bg-dark-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default post;
