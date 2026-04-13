"use client"
import { useNav } from "@/contexts";
import Link from "next/link";

export default function Home() {
  const navItems = useNav();
  return (
    <>
      <h2>SDA Download</h2>
      <ul>
        {navItems.filter(n => n.type === "item").map((ni, index) => (
          <li key={index}><Link href={ni.href}>{ni.label}</Link></li>
        ))}
      </ul>
    </>
  )
}