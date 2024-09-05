import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {logo} from "@/assets";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Button variant="outline">
        <Link href="/signin">Login</Link>
      </Button>
      <Image src={logo} height={130} width={130} alt="Marketing Lab" />
      <h1>Marketing Lab</h1>
    </div>
  );
}
