import { Suspense } from "react";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import fs from "fs";
import path from "path";
import fm from "front-matter";
import Markdown from 'react-markdown'


function DiagramBase({src, id}: {src: string, id?: string}) {
  return (
    <>
      <div className="container-fluid">
        <MermaidDiagram src={src} id={id} />
      </div>
    </>
  )
}

const dataDir = "public/diagrams";

export function generateStaticParams() {
  const paths = fs.readdirSync(dataDir)
    .map(file => path.basename(file))
    .filter(name => name.endsWith(".mermaid"))
    .map(name => ({id: name.replace(".mermaid", "")}));
  return paths;
};

function getAttr(obj: unknown, attr: string) {
  return obj && typeof obj === "object" && attr in obj ? obj[attr as keyof typeof obj] as unknown : undefined;
}

function parseString(obj: unknown, attr: string): string {
  const attribute = getAttr(obj, attr)
  if (attribute) {
    return String(attribute)
  }
  return "";
}

function parseDescriptions(obj: unknown, attr: string): {title: string, content: string}[] {
  const attribute = getAttr(obj, attr)
  if (Array.isArray(attribute)) {
    return attribute.map(item => ({
      title: parseString(item, "title"),
      content: parseString(item, "content")
    }))
  }
  return []
}


export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const {id} = await params;
  const basePath = process.env.NEXT_PUBLIC_API_URL || "";
  const src = `${basePath}/diagrams/${id}.mermaid`;
  const data = fs.readFileSync(`${dataDir}/${id}.mermaid`, "utf8");
  const content = fm(data);
  const attributes = typeof content.attributes === "object" && content.attributes !== null ?  content.attributes : {};
  const descriptions = parseDescriptions(attributes, "descriptions");

  return (
    <>
      {"title" in attributes ? <h2>{String(attributes.title)}</h2> : undefined}
      <Suspense>
        <DiagramBase src={src} id={id}/>
      </Suspense>
      <div className="row px-2">
      {descriptions.map((item, index) => (
        <div className="col-sm-4 p-2" key={index}>
          <div className="card">
            <div className="card-header">{item.title}</div>
            <div className="card-body">
              <Markdown>{item.content}</Markdown>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  )
}
