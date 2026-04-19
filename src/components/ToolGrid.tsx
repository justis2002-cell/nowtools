import { Tool } from "@/types/tool";
import ToolCard from "./ToolCard";

interface ToolGridProps {
  tools: Tool[];
  onToolClick: (tool: Tool) => void;
}

export default function ToolGrid({ tools, onToolClick }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500 font-medium">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} onClick={onToolClick} />
      ))}
    </div>
  );
}
