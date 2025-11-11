"use client"
import useSWR from "swr";
import mermaid from "mermaid";
import { useId } from "react";

mermaid.initialize({ startOnLoad: false })

async function fetchDiagramData([url, renderId, data]: [string, string, undefined] | [undefined, string, string]): Promise<{svg: string, data: string}> {
    const sourceData = url === undefined ? data : await (await fetch(url)).text();
    const renderElement = document.createElement("div");
    renderElement.id = renderId;
    const {svg} = await mermaid.render(renderElement.id, sourceData);
    renderElement.remove();
    return {svg, data: sourceData};
}

export function MermaidDiagram(props: {src: string} | {data: string}) {
  const renderId = useId();
  const {data} = useSWR(["src" in props ? props.src : undefined, renderId, "data" in props ? props.data : undefined], fetchDiagramData);
  const {svg} = data || {};

  return (
    svg ? <div dangerouslySetInnerHTML={{__html: svg}}/> : <></>
  )
}

