import Warning from "../../warning";
import { DiagramPage, generateStaticParams as baseGenerateStaticParams } from "@/components/DiagramPage";

export default async function Page(args: {params: Promise<{ id: string }>}) {
  return (
    <>
      <div className="container">
        <Warning>
          <p>Using flowcharts from <a href="https://mermaid.js.org/syntax/flowchart.html">mermaid</a>. Also consider using sequence diagram from <a href="https://mermaid.js.org/syntax/sequenceDiagram.html">mermaid</a>.</p>
        </Warning>
      </div>
      {DiagramPage(args)}
    </>
  );
}

export function generateStaticParams() {
  return baseGenerateStaticParams();
}
