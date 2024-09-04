import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center">
      <Card>
        <div className="p-4">
          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <div className="grid w-full items-center max-w-sm items-center gap-1.5 py-2">
            <Button className="w-full" variant="outline">
              Registrar
            </Button>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <p className="text-xl">
              Não tem uma conta?{" "}
              <Link href="/signup" className="text-[#1dc071]">
                Registre-se
              </Link>{" "}
              agora.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
