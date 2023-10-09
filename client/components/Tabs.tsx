import Link from "next/link";
import React from "react";

const Tabs = ({ blogs }: Record<string, any>) => {
  const truncateText = (text: string | any) => {
    return text.slice(0, 100) + "...";
  };

  return (
    <ul className="flex flex-col list-none space-x-8 ">
      {blogs?.map((blog: any) => {
        return (
          <li>
            {" "}
            <div
              className="border-solid border-2 mb-6 p-4 h-auto w-auto "
              key={blog.id}
            >
              <Link href={`Blogs/${blog.id}`} className="cursor-pointer">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-600">Written By: {blog.user.name}</p>
                <hr />

                <p className=" text-gray-700">
                  {" "}
                  {truncateText(blog.description)}{" "}
                </p>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
