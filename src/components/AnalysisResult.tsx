import { 
  FileSpreadsheet, 
  Lightbulb, 
  AlertTriangle, 
  Rocket, 
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AnalysisData {
  summary: string;
  datasetInfo: string;
  insights: string[];
  warnings: { text: string; severity: 'low' | 'medium' | 'high' }[];
  opportunities: string[];
  actions: string[];
  stats: {
    rows: number;
    columns: number;
    issues: number;
  };
}

interface AnalysisResultProps {
  data: AnalysisData;
  fileName: string;
  onNewAnalysis: () => void;
}

const AnalysisResult = ({ data, fileName, onNewAnalysis }: AnalysisResultProps) => {
  return (
    <section className="py-16 bg-gradient-subtle min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl">Analysis Complete</h1>
                <p className="text-sm text-muted-foreground">{fileName}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onNewAnalysis}>
              Analyze Another File
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <StatCard label="Rows" value={data.stats.rows.toLocaleString()} icon={<TrendingUp className="w-4 h-4" />} />
            <StatCard label="Columns" value={data.stats.columns.toString()} icon={<FileSpreadsheet className="w-4 h-4" />} />
            <StatCard 
              label="Issues Found" 
              value={data.stats.issues.toString()} 
              icon={<AlertTriangle className="w-4 h-4" />}
              variant={data.stats.issues > 0 ? 'warning' : 'success'}
            />
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Summary */}
          <AnalysisCard
            icon={<FileSpreadsheet className="w-5 h-5" />}
            title="📌 Summary"
            variant="default"
          >
            <p className="text-muted-foreground mb-2">{data.datasetInfo}</p>
            <p className="font-medium">{data.summary}</p>
          </AnalysisCard>

          {/* Key Insights */}
          <AnalysisCard
            icon={<Lightbulb className="w-5 h-5" />}
            title="🔍 Key Insights"
            variant="insight"
          >
            <ul className="space-y-3">
              {data.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </AnalysisCard>

          {/* Warnings */}
          {data.warnings.length > 0 && (
            <AnalysisCard
              icon={<AlertTriangle className="w-5 h-5" />}
              title="⚠️ Warnings / Risks"
              variant="warning"
            >
              <ul className="space-y-3">
                {data.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                      warning.severity === 'high' ? 'bg-destructive' :
                      warning.severity === 'medium' ? 'bg-warning' : 'bg-muted-foreground'
                    }`} />
                    <span>{warning.text}</span>
                  </li>
                ))}
              </ul>
            </AnalysisCard>
          )}

          {/* Opportunities */}
          <AnalysisCard
            icon={<Rocket className="w-5 h-5" />}
            title="🚀 Opportunities"
            variant="opportunity"
          >
            <ul className="space-y-3">
              {data.opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-success shrink-0" />
                  <span>{opportunity}</span>
                </li>
              ))}
            </ul>
          </AnalysisCard>

          {/* Recommended Actions */}
          <AnalysisCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            title="✅ Recommended Actions"
            variant="action"
          >
            <ul className="space-y-4">
              {data.actions.map((action, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <span className="font-medium">{action}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                </li>
              ))}
            </ul>
          </AnalysisCard>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ 
  label, 
  value, 
  icon,
  variant = 'default'
}: { 
  label: string; 
  value: string; 
  icon: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
}) => (
  <div className="bg-card border border-border rounded-xl p-4 shadow-soft">
    <div className="flex items-center gap-2 mb-2">
      <span className={
        variant === 'warning' ? 'text-warning' :
        variant === 'success' ? 'text-success' : 'text-primary'
      }>
        {icon}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="font-display font-bold text-2xl">{value}</p>
  </div>
);

const AnalysisCard = ({ 
  icon, 
  title, 
  children,
  variant = 'default'
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
  variant?: 'default' | 'insight' | 'warning' | 'opportunity' | 'action';
}) => {
  const borderColors = {
    default: 'border-border',
    insight: 'border-l-4 border-l-primary border-border',
    warning: 'border-l-4 border-l-warning border-border',
    opportunity: 'border-l-4 border-l-opportunity border-border',
    action: 'border-l-4 border-l-success border-border',
  };

  return (
    <div className={`bg-card rounded-xl p-6 shadow-soft border ${borderColors[variant]}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-primary">{icon}</span>
        <h2 className="font-display font-semibold text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default AnalysisResult;
