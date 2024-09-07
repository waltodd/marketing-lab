"use client"
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {logo} from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { db } from "@/pages/api/instant";

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
  return data;
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
  const handleLogin = async () =>{
    if (!email) {
      alert("Please select a role.");
      return;
    }

    try {
      // initiate your custom sign in flow
      const data = await customSignIn(email, password); 
      // sign in with the token on success

      // router.push(`/code?email=${email}`);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  }
  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center">
      <Card className="px-4 py-4 min-w-[400px] bg-[#1c1c24] border-none">
        <div className="w-full flex flex-col justify-center items-center max-w-sm items-center gap-1.5 py-2">
          <Image src={logo} height={120} width={120} alt="Marketing Lab" />
          <h1 className="text-3xl font-bold ">Login</h1>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <Label htmlFor="email">Email</Label>
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
            Login
          </Button>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <p>
            Não tem uma conta? <Link className="w-full text-[#80D77E] " href="/signup">Registre-se</Link> agora.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Page;
