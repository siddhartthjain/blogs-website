import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { clearCookie, getAuthorizationToken } from "../http";
import { useRouter } from "next/router";

const Navbar = () => {
//  const [token, setToken]= useState<undefined| string>(undefined);
//   // const [client, setclient] = useState(false)
//   useEffect(()=>{
//   setToken( getAuthorizationToken());
   
//   },[token])
  
  // console.log(token)
  const token = getAuthorizationToken()
  return (
    
    <nav className="flex items-center justify-between ">
      <Link href="/">
        <section className=" flex items-center cursor-pointer">
          <Image
            src="/logo.png"
            height={50}
            width={100}
            alt="Blog Logo image"
          />
          <span className="font-bold ml-100 text-primary">
            {" "}
            Blog application
          </span>
        </section>
      </Link>
      <section className="flex items-center justify-between">
       
     {
      token? (<Link
      href="/Auth/Logout"
      className="font-semibold bg-white py-6 px-6 hover:bg-black translate-x-3"
    >
      Logout
    </Link>):
    (
      <><Link
          href="/Auth/Login"
          className="font-semibold bg-white py-6 px-6 hover:bg-black translate-x-3"
        >
          Login
        </Link>
        <Link
          href="/Auth/Signin"
          className="font-semibold bg-white py-6 px-6 hover:bg-black translate-x-3"
        >
          Sign up
        </Link></>
      
    )

     }
        
      </section>
    </nav>
  );
};

export default Navbar;
