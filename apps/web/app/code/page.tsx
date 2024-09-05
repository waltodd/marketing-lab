"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logo } from "@/assets";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyCode } from "@/api/instant";

const Page = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();

   // Check if `email` is not null before using it
   if (email === null) {
    return <div>No email provided</div>;
  }
  const handleCode = async () =>{
    if (!value) {
      alert("Priencha todos os campos!");
      return;
    }

    try {
      const response = await verifyCode(email, value);

      console.log(response);
      router.push(`/dashboard/admin/`);
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
        <div className="flex justify-center items-center py-2">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        </div>
        <div className="grid w-full items-center max-w-sm items-center gap-1.5 py-2">
          <Button onClick={handleCode} className=" border-none w-full bg-[#80D77E] text-white" variant="outline">
            Verificar
          </Button>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <p>
            Ir para o{" "}
            <Link className="w-full text-[#80D77E] " href="/signin">
              Login
            </Link>{" "}
            agora.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Page;
