"use client";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";

export default function Dashboard() {
  const pathname = usePathname();
  console.log("pathname", pathname);
  return (
    <main className="min-h-full">
      <Button variant="contained">hello</Button>
    </main>
  );
}
