import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();






const approvedStatus = [200, 201];
export const api = axios.create({
  baseURL: "http://localhost:3030/",
});

export const getBlogsWithoutAuth = async () => {

  return await api.get("Blogs/allBlogs");
};

export const getAuthorizationToken = () => {

  return Cookies.get("authorizationToken");
};

api.interceptors.request.use(
  (config) => {
    const token = getAuthorizationToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
     
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const setAuthorizationToken = (token: string) => {
//   // Store the token in localStorage
//   const secretKey = process.env.SECRET_KEY as string
//  const user=  jwt.verify(token,secretKey) as Record<string,any>
// const userId= user.id;
 
//   Cookies.set("authorizationToken", token);
// };

// export const getuserId = ()=>{
//   return Cookies.get('userId');
// }

// Add a request interceptor

export const login = async (data: Record<string, any>) => {
  try {
    const res = await api.post("Auth/Login", data);
    console.log("res", res);
    if (approvedStatus.includes(res.status)) {
      // await setAuthorizationToken(res.data.token);


      return res.data.response;
    } else {
      throw Error;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const sigin = async (data: Record<string, any>) => {
  try {
    const resp = await api.post("Auth/SignUp", data);
    if (approvedStatus.includes(resp.status)) {
      Cookies.set('userEmail', data.email);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getBlogs = async (page=1, items=5) => {
 
  console.log("page is ", page);
  const resp= await api.get(`Blogs/?page=${page}&items=${items}`);
  
    return resp;
};

export const postBlog =async (data:Record<string,any>) => {
  const resp = await api.post("Blogs/",data);
  return resp;
  
}

export const getBlog =async (id:number) => 
{
  const resp= await api.get(`/Blogs/${id}`);
  return resp;
}

export const getEmail = ()=>
{
  return Cookies.get('userEmail');
}
export const clearCookie= (name:string)=>
{
  Cookies.remove('authorizationToken');
}

export const postComment=async (id:number,data:Record<string,any>) => {
  
  console.log("commenyt is in fynction ", data)
  
  const resp = (await api.post(`Blogs/${id}/comment`,data));
  console.log("Resposnse",resp);
  return resp;
  
}

export const postReply=async (blogId:number,commentId:number,data:Record<string,any>) => {

  const resp = (await api.post(`/Blogs/${blogId}/comment/${commentId}/reply`,data));
  console.log("Resposnse",resp);
  return resp;
}

export const deleteBlog = async(id:number)=>
{
   const resp =await api.delete(`Blogs/${id}`);
   return resp;
}

export const verifyAndSubmitOtp =async (otp:number, email:string) => {
  const resp = api.post('Auth/verifyEmail', {otp,email});
  return resp;
  
}