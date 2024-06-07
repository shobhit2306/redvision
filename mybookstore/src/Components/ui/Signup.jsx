import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { InputWithEye } from "./InputWithEye";
import { AuthDataObject } from "../services/Controller";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (val) => {
    const digitsOnly = val.replace(/\D/g, "");
    const limitedValue = digitsOnly.slice(0, 10);
    setPhoneNumber(limitedValue);
  };

  const signupHandler = () => {
    if (!email || !password || !phoneNumber || !fullName) {
      toast.error("Please fill all the fields");
    }

    const body = {
      name: fullName,
      phoneNo: phoneNumber,
      email: email,
      password: password,
    };
    AuthDataObject.Signup(body, (result) => {
      if (result.status === 200 && result.data.status) {
        toast.success(result.data.message);
        localStorage.setItem("token", result?.data?.data?.loginToken);
        localStorage.setItem("role", result?.data?.data?.role);
        navigate("/user/dashboard");
      } else {
        toast.error(result.data.data?.[0].msg);
      }
    });
  };

  return (
    <div className="relative">
      <div className="bg-white-A700 flex flex-col font-poppins items-center justify-end mx-auto w-[42%] md:w-[90%]">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="border-gray border shadow-lg my-4 flex flex-col gap-[15px] items-center justify-end p-5 md:px-10 sm:px-5 w-full">
            <div className="flex flex-col items-center justify-start mt-4">
              <div
                className="sm:text-2xl md:text-[26px] text-[28px] text-center text-white-A700"
                size="txtPoppinsBold28"
              >
                Signup
              </div>
            </div>
            <div className="bg-white-A700 flex flex-col sm:items-center items-start justify-end sm:justify-end py-[27px] md:px-5 rounded-[5px] shadow-bs1 w-full md:w-full">
              <div className="flex flex-col items-center justify-start ml-6 md:ml-[0] mt-6 w-[89%] md:w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div
                    className="text-base text-gray-800 w-auto"
                    size="txtPoppinsMedium16"
                  >
                    Fullname
                  </div>
                  <div className="relative w-full">
                    <Input
                      name="fullname"
                      placeholder="Enter fullname"
                      className="p-0 w-full"
                      wrapClassName="border-2 border-solid border-gray flex h-10 m-auto px-2.5 w-full"
                      onChange={(e) => setFullName(e)}
                      value={fullName}
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start ml-6 md:ml-[0] mt-6 w-[89%] md:w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div
                    className="text-base text-gray-800 w-auto"
                    size="txtPoppinsMedium16"
                  >
                    Email
                  </div>
                  <div className="relative w-full">
                    <Input
                      name="email"
                      placeholder="Enter email"
                      className="p-0 w-full"
                      wrapClassName="border-2 border-solid border-gray flex h-10 m-auto px-2.5 w-full"
                      onChange={(e) => setEmail(e)}
                      value={email}
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start md:ml-[0] ml-[22px] mt-8 w-[89%] md:w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div
                    className="text-base text-gray-800 w-auto"
                    size="txtPoppinsMedium16"
                  >
                    Password
                  </div>
                  <div className="relative w-full">
                    <InputWithEye
                      name="password"
                      placeholder="Enter password"
                      className="p-0 w-full"
                      wrapClassName="border-2 border-solid border-gray flex h-10 m-auto px-2.5 w-full"
                      onChange={(e) => setPassword(e)}
                      value={password}
                      shape="round"
                    ></InputWithEye>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start md:ml-[0] ml-[22px] mt-8 w-[89%] md:w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div
                    className="text-base text-gray-800 w-auto"
                    size="txtPoppinsMedium16"
                  >
                    Phone Number
                  </div>
                  <div className="relative w-full">
                    <Input
                      name="phoneNumber"
                      type="number"
                      placeholder="Enter phone number"
                      className="p-0 w-full"
                      wrapClassName="border-2 border-solid border-gray flex h-10 m-auto px-2.5 w-full"
                      onChange={(e) => handleChange(e)}
                      value={phoneNumber}
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-10"
                  onClick={signupHandler}
                >
                  Signup
                </button>
              </div>
            </div>
            <div className="self-start">
              <div className="flex  md:flex-col gap-[5px] items-start md:justify-center justify-start w-auto">
                <div
                  className="text-[15px] text-center text-white-A700 w-auto"
                  size="txtPoppinsRegular15"
                >
                  Already have an account?
                </div>
                <div
                  className="text-base text-center cursor-pointer text-blue-700 underline w-auto"
                  size="txtPoppinsMedium16WhiteA700"
                  onClick={() => navigate("/login")}
                >
                  Login
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
