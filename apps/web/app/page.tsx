import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {logo} from "@/assets";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
     
      <Image src={logo} height={130} width={130} alt="Marketing Lab" />
      <h1>Marketing Lab</h1>
      <Button variant="outline" className="mt-6">
        <Link href="/signin">Login</Link>
      </Button>
    </div>
  );
}
