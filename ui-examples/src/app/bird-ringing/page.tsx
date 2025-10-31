"use client"
import Link from "next/link";
import { useNav } from "./contexts";

export default function Home() {
  const navItems = useNav();
  return (
    <div className="container">
      <h2>Bird Ringing Example Pages</h2>
      <p>The following are example pages to demonstrate layout an interaction behaviors. These document do not aim to show anything related to a final design.</p>
      <ul>
        {navItems.filter(n => n.type === "item").map((ni, index) => (
          <li key={index}><Link href={ni.href}>{ni.label}</Link></li>
        ))}
      </ul>
    </div>
  )
}
