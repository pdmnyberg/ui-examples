import { DiagramPage, generateStaticParams as baseGenerateStaticParams } from "@/components/DiagramPage";

export default async function Page(args: {params: Promise<{ id: string }>}) {
  return DiagramPage(args);
}

export function generateStaticParams() {
  return baseGenerateStaticParams((name) => name.startsWith("sda-"));
}
