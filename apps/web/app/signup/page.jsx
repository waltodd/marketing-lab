import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {logo} from "@/assets";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox"
const Page = () => {
  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center">
      <Card className="px-4 py-4 min-w-[350px]">
        
        <div className="w-full flex flex-col justify-center items-center max-w-sm items-center gap-1.5 py-2">
          <Image src={logo} height={30} weight={30} alt="Marketing Lab" />
          <h1 className="text-3xl font-bold ">Login</h1>
        </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <div className="grid w-full items-center max-w-sm items-center gap-1.5 py-2">
            <Button className="w-full bg-[#80D77E] text-white" variant="outline">
              Registrar
            </Button>
          </div>
          <div className="flex items-center space-x-2">
        <Checkbox id="terms" className="text-[#1dc071] w-5 h-5 bg-[#fafafa]" />
        <Label htmlFor="terms">Aceitar termos e condições</Label>
      </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <p className="">
            Já tem uma conta? {" "}
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
