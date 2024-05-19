import dynamic from "next/dynamic";
const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/excalidraw/excalidrawWrapper")).default,
  {
    ssr: false,
  },
);
export default function ExcaliCanvas({ width="90vw", height="55vh" }) {
  return (
      <ExcalidrawWrapper height={height} width={width} />      
  );
}
