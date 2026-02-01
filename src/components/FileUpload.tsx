import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet, X, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  isAuthenticated: boolean;
}

const FileUpload = ({ onFileSelect, isProcessing, isAuthenticated }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!isAuthenticated) return;
    
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      setSelectedFile(file);
    }
  }, [isAuthenticated]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      setSelectedFile(file);
    }
  }, []);

  const isValidFile = (file: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    return validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  if (!isAuthenticated) {
    return (
      <section id="demo" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Upload Your Spreadsheet
            </h2>
            <p className="text-muted-foreground">
              Create an account to start analyzing your spreadsheets with AI
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="relative border-2 border-dashed rounded-2xl p-12 text-center border-border bg-card/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              
              <h3 className="font-display font-semibold text-lg mb-2">
                Sign up to unlock
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Create a free account to analyze up to 3 spreadsheets per month
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="lg">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Upload Your Spreadsheet
          </h2>
          <p className="text-muted-foreground">
            Drop your CSV or Excel file and let SheetSage analyze it in seconds
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
                ${isDragging 
                  ? 'border-primary bg-primary/5 scale-[1.02]' 
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
                }
              `}
            >
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center">
                <Upload className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              
              <h3 className="font-display font-semibold text-lg mb-2">
                {isDragging ? 'Drop your file here' : 'Drag & drop your spreadsheet'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 rounded bg-secondary">.CSV</span>
                <span className="px-2 py-1 rounded bg-secondary">.XLSX</span>
                <span className="px-2 py-1 rounded bg-secondary">.XLS</span>
              </div>
            </div>
          ) : (
            <div className="border border-border rounded-2xl p-8 bg-card shadow-soft">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={clearFile}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  disabled={isProcessing}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <Button 
                variant="hero" 
                className="w-full" 
                size="lg"
                onClick={handleAnalyze}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-5 h-5" />
                    Analyze with SheetSage
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FileUpload;
