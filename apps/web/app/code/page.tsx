"use client";
import jwt from "jsonwebtoken";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logo, loader } from "@/assets";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSearchParams, useRouter } from "next/navigation";
import {  db } from "@/pages/api/instant";

const Page = () => {

  
  const [code, setCode] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  
  // Check if `email` is not null before using it
  if (email === null) {
    return <div>No email provided</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center max-w-sm items-center gap-1.5 py-2">
          <Image src={logo} height={120} width={120} alt="Marketing Lab" />
          <h1 className="text-3xl font-bold ">Marketing Lab</h1>
          <Image src={loader} height={50} width={50} alt="Marketing Lab" />
        </div>
      </div>
    );
  }

  const handleVerifyCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (data.success) {
        // Handle success, such as saving token in client-side storage (not sensitive data)
         console.log('User authenticated:', data.user);

        
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        router.push("/dashboard/admin/");
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };
  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center">
      <Card className="px-4 py-4 min-w-[400px] bg-[#1c1c24] border-none">
        <div className="w-full flex flex-col justify-center items-center max-w-sm items-center gap-1.5 py-2">
          <Image src={logo} height={120} width={120} alt="Marketing Lab" />
          <h1 className="text-3xl font-bold ">Verifição</h1>
          <p className="text-md  ">Digite o código enviado ao email!</p>
        </div>
        <div className="flex justify-center items-center py-2">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(code) => setCode(code)}
            className="text-[16px] font-semibold "
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="p-2 text-[18px] font-semibold text-white"
              />
              <InputOTPSlot
                index={1}
                className="p-2 text-[18px] font-semibold text-white"
              />
              <InputOTPSlot
                index={2}
                className="p-2 text-[18px] font-semibold text-white"
              />
              <InputOTPSlot
                index={3}
                className="p-2 text-[18px] font-semibold text-white"
              />
              <InputOTPSlot
                index={4}
                className="p-2 text-[18px] font-semibold text-white"
              />
              <InputOTPSlot
                index={5}
                className="p-2 text-[18px] font-semibold text-white"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="grid w-full items-center max-w-sm items-center gap-1.5 py-2">
          <Button
            onClick={handleVerifyCode}
            className=" border-none w-full bg-[#80D77E] text-white"
            variant="outline"
          >
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
