import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FileTabsProps {
  openFiles: string[];
  currentFile: string;
  onFileSelect: (file: string) => void;
  onFileClose: (file: string) => void;
  getFileIcon: (fileName: string) => string;
}

export default function FileTabs({ 
  openFiles, 
  currentFile, 
  onFileSelect, 
  onFileClose, 
  getFileIcon 
}: FileTabsProps) {
  return (
    <div className="bg-card border-b dyad-border flex items-center overflow-x-auto">
      <div className="flex items-center">
        {openFiles.map((file) => (
          <div
            key={file}
            className={`flex items-center px-4 py-2 border-r dyad-border text-sm cursor-pointer transition-colors ${
              file === currentFile
                ? "dyad-code-bg font-medium dyad-text"
                : "dyad-text-muted hover:dyad-text"
            }`}
            onClick={() => onFileSelect(file)}
          >
            <i className={`${getFileIcon(file)} mr-2`} />
            <span>{file.split('/').pop()}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-4 w-4 p-0 hover:bg-destructive/20"
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(file);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
