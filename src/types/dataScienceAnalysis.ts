// Comprehensive Data Science Analysis Types

export interface DataHealthReport {
  totalRows: number;
  totalColumns: number;
  columnTypes: ColumnTypeInfo[];
  missingValues: MissingValueInfo[];
  duplicateRows: number;
  outlierCount: number;
  dataQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  dataQualityScore: number; // 0-100
  dataLeakageRisk: 'None' | 'Low' | 'Medium' | 'High';
  dataImbalance: DataImbalanceInfo | null;
}

export interface ColumnTypeInfo {
  name: string;
  type: 'numerical' | 'categorical' | 'datetime' | 'text' | 'boolean' | 'id';
  uniqueValues: number;
  nullPercentage: number;
  potentialRole: 'target' | 'feature' | 'id' | 'datetime' | 'drop';
}

export interface MissingValueInfo {
  column: string;
  missingCount: number;
  missingPercentage: number;
  suggestedStrategy: 'mean' | 'median' | 'mode' | 'drop' | 'model-based' | 'forward-fill';
}

export interface DataImbalanceInfo {
  targetColumn: string;
  imbalanceRatio: number;
  minorityClass: string;
  majorityClass: string;
  suggestedTechnique: string;
}

export interface EDAInsight {
  category: 'trend' | 'pattern' | 'anomaly' | 'correlation' | 'distribution';
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
  technicalDetails?: string;
}

export interface CorrelationInfo {
  feature1: string;
  feature2: string;
  correlationValue: number;
  strength: 'strong' | 'moderate' | 'weak';
  direction: 'positive' | 'negative';
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  reason: string;
}

export interface MLModelRecommendation {
  modelName: string;
  modelType: 'regression' | 'classification' | 'clustering' | 'time-series' | 'dimensionality-reduction';
  suitabilityScore: number; // 0-100
  pros: string[];
  cons: string[];
  expectedPerformance: string;
  interpretability: 'high' | 'medium' | 'low';
  trainingComplexity: 'low' | 'medium' | 'high';
  justification: string;
}

export interface ModelPerformance {
  modelName: string;
  metrics: ModelMetric[];
  rank: number;
  isRecommended: boolean;
  notes: string;
}

export interface ModelMetric {
  name: string;
  value: number;
  benchmark?: number;
  interpretation: string;
}

export interface DataPreparationStep {
  step: number;
  action: string;
  reason: string;
  impact: 'high' | 'medium' | 'low';
  code?: string;
}

export interface BusinessRecommendation {
  priority: number;
  action: string;
  rationale: string;
  expectedOutcome: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

export interface RiskLimitation {
  type: 'data' | 'model' | 'business' | 'technical';
  description: string;
  severity: 'low' | 'medium' | 'high';
  mitigation: string;
}

export interface NextStep {
  priority: number;
  step: string;
  category: 'data' | 'feature' | 'model' | 'deployment' | 'monitoring';
  effort: 'low' | 'medium' | 'high';
}

// Main comprehensive analysis output
export interface DataScienceAnalysis {
  // Executive Summary
  executiveSummary: {
    headline: string;
    keyFindings: string[];
    bottomLine: string;
    confidenceLevel: 'high' | 'medium' | 'low';
  };

  // Data Health Report
  dataHealth: DataHealthReport;

  // Data Preparation
  dataPreparation: {
    cleaningSteps: DataPreparationStep[];
    encodingStrategy: {
      categorical: string;
      text: string;
    };
    scalingMethod: string;
    featureEngineering: string[];
  };

  // EDA Insights
  edaInsights: {
    statisticalSummary: string;
    insights: EDAInsight[];
    topCorrelations: CorrelationInfo[];
    featureImportance: FeatureImportance[];
  };

  // ML Recommendations
  mlRecommendations: {
    inferredGoal: 'prediction' | 'classification' | 'clustering' | 'forecasting' | 'insight-generation';
    targetVariable: string | null;
    recommendedModels: MLModelRecommendation[];
    bestModel: string;
    alternativeApproaches: string[];
  };

  // Model Performance
  modelPerformance: {
    performanceComparison: ModelPerformance[];
    bestModelDetails: {
      name: string;
      whyBest: string;
      keyMetrics: ModelMetric[];
    };
  };

  // Final Insights & Recommendations
  finalInsights: {
    keyDrivers: string[];
    businessRecommendations: BusinessRecommendation[];
    risksAndLimitations: RiskLimitation[];
    nextSteps: NextStep[];
  };
}

// Legacy interface for backward compatibility
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

// Transform DataScienceAnalysis to legacy AnalysisData format
export function transformToLegacyFormat(analysis: DataScienceAnalysis): AnalysisData {
  return {
    summary: analysis.executiveSummary.headline,
    datasetInfo: `${analysis.dataHealth.totalRows} rows × ${analysis.dataHealth.totalColumns} columns | Data Quality: ${analysis.dataHealth.dataQuality}`,
    insights: analysis.edaInsights.insights.map(i => i.description),
    warnings: analysis.finalInsights.risksAndLimitations.map(r => ({
      text: r.description,
      severity: r.severity
    })),
    opportunities: analysis.executiveSummary.keyFindings,
    actions: analysis.finalInsights.businessRecommendations.map(r => r.action),
    stats: {
      rows: analysis.dataHealth.totalRows,
      columns: analysis.dataHealth.totalColumns,
      issues: analysis.dataHealth.missingValues.length + analysis.dataHealth.duplicateRows + analysis.dataHealth.outlierCount
    }
  };
}
