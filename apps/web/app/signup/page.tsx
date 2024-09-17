<<<<<<< HEAD
"use client";
=======
"use client"; // This directive makes it a client component
>>>>>>> origin/main
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
import { rolesArray } from "@/constants";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { useSignUp } from "@clerk/nextjs";
import { fetchAPI } from '@/lib/fetch';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Page = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(rolesArray[0]?.role || null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [verification, setVerification] = useState({ state: "default", error: "", code: "" });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const router = useRouter();

  const handleRoleSelect = (role: string | null) => setSelectedRole(role);
  const handleCheckboxChange = (checked: boolean) => setIsChecked(checked);

  const handleSubmit = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({ emailAddress: form.email, password: form.password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
      setShowSuccessModal(true);
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  const onVerify = async () => {
    
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code: verification.code });
      const name = form.name
    const email = form.email
    const clerkId = completeSignUp.createdUserId
    const roleName = selectedRole
      if (completeSignUp.status === "complete") {
        await fetchAPI("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            clerkId,
            roleName,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
        router.push('/signin')
      } else {
        setVerification({ ...verification, error: "Verification failed. Please try again.", state: "failed" });
      }
    } catch (err: any) {
      setVerification({ ...verification, error: err.errors[0].longMessage, state: "failed" });
=======

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

      const response = await fetch("/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password,selectedRole }),
      });
      const data = await response.json();
      if(data.success === true){
        alert(`${data.message}`);
        router.push("/signin");
      }else{
        alert(`${data.message}`);
      }
     
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
>>>>>>> origin/main
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center">
<<<<<<< HEAD
      {!showSuccessModal && (
        <Card className="px-4 py-4 min-w-[400px] bg-[#1c1c24] border-none">
          <div className="w-full flex flex-col justify-center items-center max-w-sm gap-1.5 py-2">
            <Image src={logo} height={120} width={120} alt="Marketing Lab" />
            <h1 className="text-3xl font-bold">Registrar</h1>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              type="text"
              id="name"
              placeholder="Nome"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor="role">Selecione um papel</Label>
            <RoleCard onRoleSelect={handleRoleSelect} />
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="terms"
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
              className="text-[#1dc071] w-4 h-4 bg-[#fafafa]"
            />
            <Label htmlFor="terms">Aceitar termos e condições</Label>
          </div>

          <div className="grid w-full items-center max-w-sm gap-1.5 py-2">
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#80D77E] py-4 text-white border-none"
              variant="outline"
            >
              Registrar
            </Button>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <p>
              Já tem uma conta?{" "}
              <Link href="/signin" className="text-[#1dc071]">
                Faça login
              </Link>{" "}
              aqui.
            </p>
          </div>
        </Card>
      )}
      {showSuccessModal && (
        <Card className="px-4 py-4 min-w-[400px] bg-[#1c1c24] border-none">
          <div className="w-full flex flex-col justify-center items-center max-w-sm gap-1.5 py-2">
            <Image src={logo} height={120} width={120} alt="Marketing Lab" />
            <h1 className="text-3xl font-bold ">Verifição</h1>
            <p className="text-md  ">Digite o código enviado ao email!</p>
          </div>
          <div className="flex justify-center items-center py-2">
            <InputOTP
              maxLength={6}
              value={verification.code}
              onChange={(code) => setVerification({ ...verification, code })}
              className="text-[16px] font-semibold "
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="p-2 text-[18px] font-semibold text-white"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="grid w-full items-center max-w-sm gap-1.5 py-2">
            <Button
              onClick={onVerify}
              className="w-full bg-[#80D77E] hover:opacity-100 py-4 text-white border-none"
              variant="outline"
            >
              Verificar
            </Button>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <p>
              Ir para o{" "}
              <Link className="w-full text-[#80D77E]" href="/signin">
                Login
              </Link>{" "}
              agora.
            </p>
          </div>
        </Card>
      )}
=======
      <Card className="px-4 py-4 min-w-[400px] bg-[#1c1c24] border-none">
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
            className="w-full bg-[#80D77E] text-white border-none"
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
>>>>>>> origin/main
    </div>
  );
};

export default Page;
