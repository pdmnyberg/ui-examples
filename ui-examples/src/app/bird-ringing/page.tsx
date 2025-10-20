import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h2>Bird Ringing Example Pages</h2>
      <p>The following are example pages to demonstrate layout an interaction behaviors. These document do not aim to show anything related to a final design.</p>
      <ul>
        <li><Link href="/bird-ringing/list-view">List view</Link></li>
        <li><Link href="/bird-ringing/actor-view/?entryId=actor-0">Actor view</Link></li>
      </ul>
    </div>
  )
}
