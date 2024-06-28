import axios from "axios";
import { Baseaxios, LS } from "../Utils/Resuse";
import { toast } from "react-hot-toast";
export const Apiadmin_signup = async ({ email, name }) => {
  const response = await Baseaxios.post("/admin_signup", {
    email: email,
    // password: password,
    name: name,
  }).catch((err) => {
    const a = err;
    toast.error(a);
    throw new Error(a);
  });

  const Comp = response.data;
  LS.save("id", Comp.id);
  LS.save("name", Comp.name);
  LS.save("access_token", Comp.access_token);
  LS.save("Auth", true);

  return Comp;
};

export const Apiadmin_signin = async ({ client_name, email }) => {
  const response = await axios
    .post("http://127.0.0.1:8000/admin_Gsignin", {
      client_name: client_name,
      email: email,
    })
    .catch((err) => {
      const a = err;
      toast.error(a.message);
      throw new Error(a);
    });

  const Comp = response.data;
  LS.save("name", Comp.name);
  LS.save("id", Comp.id);
  LS.save("access_token", Comp.access_token);
  LS.save("Auth", true);
  toast.success("Login Successfully");
  return Comp;
};
