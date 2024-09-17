"use client";
import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center">
      <Card className="px-4 py-4 min-w-[400px] bg-[#1c1c24] border-none">
        <div className="w-full flex flex-col justify-center items-center max-w-sm items-center gap-1.5 py-2">
          <Image src={logo} height={120} width={120} alt="Marketing Lab" />
          <h1 className="text-3xl font-bold ">Login</h1>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <Label htmlFor="email">Email</Label>
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
            Login
          </Button>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <p>
            Não tem uma conta?{" "}
            <Link className="w-full text-[#80D77E] " href="/signup">
              Registre-se
            </Link>{" "}
            agora.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Page;
