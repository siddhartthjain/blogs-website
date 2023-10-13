import React, { useState } from "react";
import { getEmail, verifyAndSubmitOtp } from "../../../http";
import { useRouter } from "next/router";

const Verify = () => {

  const approvedStatus= [200,201];
  const router = useRouter()
  const [otp, setOtp] = useState("");
  const [feild, setFeild] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  const handleChangeFeild = (e: any) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFeild({
      ...feild,
      [name]: value,
    });
    setOtp(() => otp + value);
    console.log(otp);
  };
  const handleOnKeyup = (e: any) => {
    console.log("i am at key up", e.target);
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;  // we have to minus 2 to reach correct index 
      if (next > -1) {
        e.target.form.elements[next].focus();
        setOtp(()=>{ return otp.slice(0,-1)});
        console.log("otp is", otp);
      }
    } else {
      const next = e.target.tabIndex;  // tab index are already pointing to next index(0 based indexing) only so we just have to activate next
      if (next < 4) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const handleSubmit=async(e:any)=>{
    console.log("otp is", otp);
       e.preventDefault();
       try {
        const email= getEmail();
        if(otp && email)
        {
          console.log(otp,email);
          const resp= await verifyAndSubmitOtp(+otp,email);
          if(approvedStatus.includes(resp.status))
          {
            router.push("/Auth/Login");
          }
        }
        
       } catch (error) {
        console.log(error);
        
       }
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
        <div className="relative bg-gray-500 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-white">
                <p>We have sent a code to your Registred email</p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} method="post">
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="first"
                        id="first"
                        required={true}
                        onChange={handleChangeFeild}
                        maxLength={1}
                        tabIndex={1}
                        onKeyUp={handleOnKeyup}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="second"
                        id="second"
                        required={true}
                        onChange={handleChangeFeild}
                        maxLength={1}
                        tabIndex={2}
                        onKeyUp={handleOnKeyup}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="third"
                        id="third"
                        required={true}
                        onChange={handleChangeFeild}
                        maxLength={1}
                        tabIndex={3}
                        onKeyUp={handleOnKeyup}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="fourth"
                        id="fourth"
                        required={true}
                        onChange={handleChangeFeild}
                        maxLength={1}
                        tabIndex={4}
                        onKeyUp={handleOnKeyup}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button type= 'submit'className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
