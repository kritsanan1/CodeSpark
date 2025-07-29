import { useEffect, useRef, useState } from "react";

interface MinimapProps {
  code: string;
  currentLine: number;
  visibleRange: { start: number; end: number };
  onLineClick: (lineNumber: number) => void;
}

export default function Minimap({ code, currentLine, visibleRange, onLineClick }: MinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions] = useState({ width: 120, height: 400 });

  useEffect(() => {
    drawMinimap();
  }, [code, currentLine, visibleRange]);

  const drawMinimap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lines = code.split('\n');
    const lineHeight = dimensions.height / Math.max(lines.length, 20);
    
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Draw code blocks
    lines.forEach((line, index) => {
      const y = index * lineHeight;
      const intensity = Math.min(line.trim().length / 80, 1);
      
      // Different colors for different line types
      let color = '#404040';
      if (line.trim().startsWith('//')) {
        color = '#6a6a6a'; // Comments
      } else if (line.includes('function') || line.includes('const') || line.includes('let')) {
        color = '#569cd6'; // Keywords
      } else if (line.includes('import') || line.includes('export')) {
        color = '#c586c0'; // Imports/exports
      } else if (line.includes('{') || line.includes('}')) {
        color = '#d4d4d4'; // Braces
      }

      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3 + (intensity * 0.7);
      ctx.fillRect(2, y, (dimensions.width - 4) * intensity, Math.max(lineHeight - 1, 1));
    });

    // Draw visible area indicator
    const visibleStart = visibleRange.start * lineHeight;
    const visibleEnd = visibleRange.end * lineHeight;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, visibleStart, dimensions.width, visibleEnd - visibleStart);
    
    // Draw visible area border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, visibleStart, dimensions.width, visibleEnd - visibleStart);

    // Draw current line indicator
    if (currentLine >= 0 && currentLine < lines.length) {
      const currentY = currentLine * lineHeight;
      ctx.fillStyle = '#007acc';
      ctx.fillRect(0, currentY, dimensions.width, lineHeight);
      
      ctx.strokeStyle = '#007acc';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, currentY, dimensions.width, lineHeight);
    }

    // Draw scroll thumb
    const thumbHeight = Math.max(20, (visibleRange.end - visibleRange.start) * lineHeight);
    const thumbY = visibleRange.start * lineHeight;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(dimensions.width - 8, thumbY, 6, thumbHeight);
    
    // Reset alpha
    ctx.globalAlpha = 1;
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const lines = code.split('\n');
    const lineHeight = dimensions.height / Math.max(lines.length, 20);
    const clickedLine = Math.floor(y / lineHeight);
    
    if (clickedLine >= 0 && clickedLine < lines.length) {
      onLineClick(clickedLine);
    }
  };

  return (
    <div className="w-32 bg-card border-l dyad-border flex flex-col">
      {/* Minimap Header */}
      <div className="p-2 border-b dyad-border">
        <h4 className="text-xs font-medium dyad-text">Minimap</h4>
      </div>

      {/* Minimap Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full cursor-pointer"
          onClick={handleCanvasClick}
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Line numbers overlay */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
          <div className="relative w-full h-full">
            {Array.from({ length: Math.min(20, code.split('\n').length) }, (_, i) => {
              const lineNum = Math.floor((i / 20) * code.split('\n').length);
              return (
                <div
                  key={i}
                  className="absolute left-1 text-xs dyad-text-muted"
                  style={{ 
                    top: `${(i / 20) * 100}%`,
                    fontSize: '8px',
                    lineHeight: '8px'
                  }}
                >
                  {lineNum + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Minimap Stats */}
      <div className="p-2 border-t dyad-border text-xs dyad-text-muted">
        <div>Lines: {code.split('\n').length}</div>
        <div>Chars: {code.length}</div>
      </div>
    </div>
  );
}