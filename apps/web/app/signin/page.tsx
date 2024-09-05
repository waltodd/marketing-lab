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
import { signIn } from "@/api/instant";



const Page = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const handleLogin = async () =>{
    if (!email) {
      alert("Please select a role.");
      return;
    }

    try {
      const response = await signIn(email);

      console.log(response);

      alert("Foi enviado um codigo no teu email");
      router.push(`/code?email=${email}`);
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
            onChange={(e) => setEmail(e.target.value)}
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
