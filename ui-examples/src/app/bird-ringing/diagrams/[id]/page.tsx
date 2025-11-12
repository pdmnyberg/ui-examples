import Warning from "../../warning";
import { Suspense } from "react";
import { MermaidDiagram } from "../../mermaid-diagram";
import fs from "fs";
import path from "path";


function DiagramBase({src, id}: {src: string, id?: string}) {
  return (
    <>
      <div className="container">
        <Warning>
          <p>Using flowcharts from <a href="https://mermaid.js.org/syntax/flowchart.html">mermaid</a>. Also consider using sequence diagram from <a href="https://mermaid.js.org/syntax/sequenceDiagram.html">mermaid</a>.</p>
        </Warning>
      </div>
      <div className="container-fluid">
        <MermaidDiagram src={src} id={id} />
      </div>
    </>
  )
}

export function generateStaticParams() {
  const paths = fs.readdirSync("public/diagrams")
    .map(file => path.basename(file))
    .filter(name => name.endsWith(".mermaid"))
    .map(name => ({id: name.replace(".mermaid", "")}));
  return paths;
};


export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const {id} = await params;
  const basePath = process.env.NEXT_PUBLIC_API_URL || "";
  const src = `${basePath}/diagrams/${id}.mermaid`;
  return (
    <Suspense>
      <DiagramBase src={src} id={id}/>
    </Suspense>
  )
}
