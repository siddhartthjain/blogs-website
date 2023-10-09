import { Head } from "next/document";
import React, { useEffect, useState } from "react";
import Tabs from "../../../components/Tabs";

import { Inter } from "next/font/google";
import { GetServerSideProps, NextApiRequest } from "next";
import {
  api,
  getAuthorizationToken,
  getBlogs,
  getBlogsWithoutAuth,
} from "../../../http";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const approvedStatus = [200, 201];

const AddBlog = dynamic(import("../../../components/AddBlog"), { ssr: false });
const index = () => {
  const [page, setPage] = useState(1);
  const handlePrev = async () => {
    setPage((page) => Math.max(1, page - 1));
    const data = await getBlogs(page);
    if (approvedStatus.includes(data.status)) {
      setBlogs(data);
    } else {
      console.log("im here");
      router.push("/LoginReq");
    }
  };
  const handleNext = async () => {
    console.log("old oage is ", page);
    setPage((page) => page + 1);

    console.log("next event ", page);
    const data = await getBlogs(page);
    console.log("data is ", data);
    if (approvedStatus.includes(data.status)) {
      setBlogs(data);
    } else {
      console.log("im here");
      router.push("/LoginReq");
    }
  };
  const router = useRouter();
  const [Blogs, setBlogs] = useState<Record<string, any>>([]);

  useEffect(() => {
    async function getAuthBlogs() {
      const data = await getBlogs();
      console.log(data);
      if (approvedStatus.includes(data.status)) {
        setBlogs(data);
      } else {
        console.log("im here");
        router.push("/LoginReq");
      }
    }
    getAuthBlogs();
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      <p className=" mb-4"> Blogs</p>
      <Tabs blogs={Blogs.data} />
      <div className="inline-flex justify-between">
        <button
          className="text-white bg-blue-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          onClick={handlePrev}
        >
          Prev
        </button>{" "}
        <AddBlog />
        <button
          className="text-white bg-blue-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </main>
  );
};
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     try {

//   const {req}= context;
//      console.log("req at serverside is", req.headers.cookie);

//   const data= {};
//       return {
//         props: {
//           data,
//         },
//       };
//     } catch (error) {
//       console.error("An error occurred:", error);
//       return {
//         props: { res: null },
//       };
//     }
//   };

export default index;
