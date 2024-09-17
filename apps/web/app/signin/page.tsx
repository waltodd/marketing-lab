<<<<<<< HEAD
"use client";
import { useState, useCallback } from "react";
=======
"use client"
import { useState } from "react";
>>>>>>> origin/main
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { logo } from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import Cookies from "js-cookie";
// import { useUser } from '@/contexts/UserContext';
import { fetchAPI } from "@/lib/fetch";

const Page = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLogin = useCallback(async () => {
    if (!isLoaded) return;

    try {
      // Step 1: Retrieve user from your Neon database using email or clerkId

      const response = await fetchAPI("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
        }),
      });

      const userRole = response.user[0].role_name;
      alert("ALL GOOD")
      // console.log(userRole)

      switch (userRole) {
        case 'admin':
          return router.push('/dashboard/admin');
        case 'influencer':
          return router.push('/dashboard/influencer');
        case 'sponsor':
          return router.push('/dashboard/sponsor');
        default:
          return router.push('/signin');
      }
    } catch (err: any) {
      console.log("Error during sign-in:", JSON.stringify(err, null, 2));

      // Handle potential errors, including user not found in Neon database
      alert("An error occurred during login. Please try again.");
    }
  }, [isLoaded, form]);
=======
import {logo} from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { db } from "@/pages/api/instant";

async function customSignIn(
  email: string,
  password: string
): Promise<{ token: string }> {

  const response = await fetch("/api/auth/signin", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if(data.success === true){
    // alert(`${data.message}`);

    console.log(`FRONT ${data}`)
     return data.token
  }else{
    alert(`${data.message}`);
  }

  return data.token
}

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const callAuthenticatedEndpoint = async(user:any) =>{
    try{
    const response = await fetch('/api/auth/custom_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.refresh_token}`, // Pass the refresh token in the header
      },
      body: JSON.stringify({ someData: 'example data' }),
    });

    const data = await response.json();
    console.log('API response:', data);
    router.push("/dashboard/admin/");

    if (!response.ok) {
      throw new Error(data.message || 'Error calling the API');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  }
  const handleLogin = async () =>{
    if (!email) {
      alert("Please select a role.");
      return;
    }

    try {
      // initiate your custom sign in flow
      const data = await customSignIn(email, password); 
      const user = db.auth.getUser({email:email})
      await callAuthenticatedEndpoint(user);
      // sign in with the token on success
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  }
>>>>>>> origin/main
  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center">
      <Card className="px-4 py-4 min-w-[400px] bg-[#1c1c24] border-none">
        <div className="w-full flex flex-col justify-center items-center max-w-sm items-center gap-1.5 py-2">
          <Image src={logo} height={120} width={120} alt="Marketing Lab" />
          <h1 className="text-3xl font-bold ">Login</h1>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <Label htmlFor="email">Email</Label>
<<<<<<< HEAD
          <Input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            placeholder="Email"
            className="py-2"
          />
        </div>
        <div className="grid w-full items-center max-w-sm items-center gap-1.5 py-2">
          <Button
            onClick={handleLogin}
            className="w-full border-none bg-[#80D77E] text-white"
            variant="outline"
          >
=======
          <Input type="email" id="email" value={email}
        onChange={handleEmailChange} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" value={password}
            onChange={handlePasswordChange}
            required placeholder="Email" />
        </div>
        <div className="grid w-full items-center max-w-sm items-center gap-1.5 py-2">
          <Button onClick={handleLogin} className="w-full border-none bg-[#80D77E] text-white" variant="outline">
>>>>>>> origin/main
            Login
          </Button>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <p>
<<<<<<< HEAD
            Não tem uma conta?{" "}
            <Link className="w-full text-[#80D77E] " href="/signup">
              Registre-se
            </Link>{" "}
            agora.
=======
            Não tem uma conta? <Link className="w-full text-[#80D77E] " href="/signup">Registre-se</Link> agora.
>>>>>>> origin/main
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Page;
