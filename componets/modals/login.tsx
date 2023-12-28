'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const login = ({ }) => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res)

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      // router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)} />

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)} />
        <button >Login</button>
      </form>



    </div>
  )
}

export default login;