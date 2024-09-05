"use client"; // This directive makes it a client component
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logo } from "@/assets";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import RoleCard from "@/components/RoleCard";
import { signUp, db } from "@/api/instant";
import { rolesArray } from "@/constants";
import { useRouter } from "next/navigation";

const Page = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(
    rolesArray[0]?.role || null
  );
  

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleRoleSelect = (role: string | null) => {
    setSelectedRole(role);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    try {
      const response = await signUp(email, password, selectedRole);

      console.log(response);

      alert("Registration successful!");
      router.push("/signin");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center">
      <Card className="px-4 py-4 min-w-[400px]">
        <div className="w-full flex flex-col justify-center items-center max-w-sm items-center gap-1.5 py-2">
          <Image src={logo} height={120} width={120} alt="Marketing Lab" />
          <h1 className="text-3xl font-bold ">Login</h1>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <Label htmlFor="password">Selecione um papel</Label>
          <RoleCard onRoleSelect={handleRoleSelect} />
        </div>
        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="terms"
            className="text-[#1dc071] w-4 h-4 bg-[#fafafa]"
          />
          <Label htmlFor="terms">Aceitar termos e condições</Label>
        </div>

        <div className="grid w-full items-center max-w-sm items-center gap-1.5 py-2">
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#80D77E] text-white"
            variant="outline"
          >
            Registrar
          </Button>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
          <p className="">
            Já tem uma conta?{" "}
            <Link href="/signin" className="text-[#1dc071]">
              Faça login
            </Link>{" "}
            aqui.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Page;
