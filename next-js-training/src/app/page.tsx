import { Button } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="app_page">
      <h1>HELLO WORLD</h1>
      <Button color="secondary" as={Link} href="/members" startContent={<MoveRight color="white" />}>Click Me</Button>
    </div>
  );
}
