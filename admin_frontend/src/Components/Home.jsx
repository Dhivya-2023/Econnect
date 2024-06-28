import { useState } from "react";
import computerSvg from "../assets/login.gif";
import { Toaster } from "react-hot-toast";
import { Apiadmin_signin, Apiadmin_signup } from "../api/Loginauth";
import { useNavigate } from "react-router-dom";
import { Authdata } from "../Utils/Authprovider";
import { LS } from "../Utils/Resuse";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Home({ log }) {
  const navigate = useNavigate();
  const { SetStatedata } = Authdata();
  const [Signupdata, setSignupdata] = useState({
    name: "",
    email: "",
    // password: "",
  });

  const handleSignup = async () => {
    try {
      const res = await Apiadmin_signup({
        email: Signupdata.email,
        // password: Signupdata.password,
        name: Signupdata.name,
      });
      navigate("/time", {
        state: { id: res.id, token: res.access_token },
      });
    } catch (error) {
      console.error("Error in handleSignup:", error);
      // Handle error, show message to user, etc.
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      let userDecode = jwtDecode(credentialResponse.credential);
      console.log(userDecode);
      const res = await Apiadmin_signin({
        client_name: userDecode.name,
        email: userDecode.email,
      });
      console.log(res);
      LS.save("userid", res.id);
      if (res.access_token)
        navigate("/time", {
          state: { id: res.id, token: res.access_token },
        });
    } catch (error) {
      console.error("Error in handleGoogleLogin:", error);
      // Handle error, show message to user, etc.
    }
  };

  return (
    <div className="h-full w-full flex items-start">
      <div className="h-full w-full bg-white flex items-center flex-col justify-center">
        <img className="h-5/6 w-auto" src={computerSvg} alt="Login GIF" />
      </div>
      <div className="h-full w-full bg-[#ffffff] items-center justify-center flex">
        {log ? (
          <div className="max-w-4xl text-start rounded-lg bg-[#e6eaf0] flex-col items-center justify-center px-8 py-8">
            <h1 className="text-center text-4xl font-bold font-Merriweather mb-[2rem]">
              Signup
            </h1>
            <p className="font-Domine text-sm mb-[1.5rem] md:text-lg">
              Enter your details to create a new account
            </p>
            <div className="mb-[1rem] md:mb-[2rem]">
              <p className="text-[0.7rem] md:text-[1rem] font-bold text-start md:font-Merriweather mb-[0.9rem]">
                Email
              </p>
              <input
                onChange={(e) =>
                  setSignupdata({ ...Signupdata, email: e.target.value })
                }
                className="w-full rounded-md py-1.5 placeholder:pl-[2rem] placeholder:text-[0.8rem] placeholder:tracking-wide pl-5 font-Merriweather outline-none border-2 border-black"
                placeholder="Email"
              />
            </div>
            <button
              onClick={handleSignup}
              className="w-52 text-white bg-[#6d9eeb;] px-2 py-2 rounded-lg font-Merriweather font-bold md:text-[1.1rem] uppercase md:py-3 mb-[1rem]"
            >
              Create User
            </button>
          </div>
        ) : (
          <div className="max-w-8xl text-start rounded-3xl bg-gradient-to-b from-blue-400 to-indigo-800 flex-col items-center justify-center px-8 py-8 md:px-[3rem] md:py-[5rem]">
            <div className="text-center text-4xl text-white font-bold font-poppins mb-[2rem]">
              RBG Admin Portal
              <p className="mb-3 mt-4 font-poppins text-base text-center text-zinc-300">
                Use your Google account to continue with RBG Admin Portal!
              </p>
            </div>
            <div className="flex justify-center">
              <GoogleOAuthProvider clientId="333036008565-7qkpcqr080na6l9fpcn492kc00ea2bv1.apps.googleusercontent.com">
                <GoogleLogin
                  className="w-full h-full"
                  onSuccess={handleGoogleLogin}
                  useOneTap
                  
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        )}
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default Home;
