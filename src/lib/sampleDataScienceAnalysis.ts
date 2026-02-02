import { DataScienceAnalysis } from "@/types/dataScienceAnalysis";

// Sample comprehensive data science analysis for demo purposes
export const generateSampleDataScienceAnalysis = (fileName: string): DataScienceAnalysis => {
  return {
    executiveSummary: {
      headline: "Strong predictive potential identified with 87% model accuracy achievable through proper feature engineering and XGBoost implementation.",
      keyFindings: [
        "Revenue is strongly correlated with customer engagement metrics (r=0.82), suggesting engagement-focused strategies will directly impact bottom line.",
        "Seasonal patterns detected in Q3-Q4 with 34% higher conversion rates, indicating optimal timing for marketing campaigns.",
        "Customer churn can be predicted with 91% accuracy using the top 5 features, enabling proactive retention strategies.",
        "Data quality is Good (78/100) with minor cleaning required for 3 columns before production deployment."
      ],
      bottomLine: "The dataset supports building a high-accuracy predictive model that could reduce customer churn by an estimated 23% and increase revenue by $1.2M annually.",
      confidenceLevel: "high"
    },

    dataHealth: {
      totalRows: 8432,
      totalColumns: 24,
      columnTypes: [
        { name: "customer_id", type: "id", uniqueValues: 8432, nullPercentage: 0, potentialRole: "id" },
        { name: "revenue", type: "numerical", uniqueValues: 5621, nullPercentage: 0, potentialRole: "target" },
        { name: "signup_date", type: "datetime", uniqueValues: 892, nullPercentage: 0, potentialRole: "datetime" },
        { name: "region", type: "categorical", uniqueValues: 8, nullPercentage: 2.3, potentialRole: "feature" },
        { name: "product_category", type: "categorical", uniqueValues: 12, nullPercentage: 0, potentialRole: "feature" },
        { name: "age", type: "numerical", uniqueValues: 67, nullPercentage: 1.2, potentialRole: "feature" },
        { name: "engagement_score", type: "numerical", uniqueValues: 100, nullPercentage: 0, potentialRole: "feature" },
        { name: "purchase_frequency", type: "numerical", uniqueValues: 45, nullPercentage: 0.5, potentialRole: "feature" }
      ],
      missingValues: [
        { column: "region", missingCount: 194, missingPercentage: 2.3, suggestedStrategy: "mode" },
        { column: "age", missingCount: 101, missingPercentage: 1.2, suggestedStrategy: "median" },
        { column: "purchase_frequency", missingCount: 42, missingPercentage: 0.5, suggestedStrategy: "mean" }
      ],
      duplicateRows: 12,
      outlierCount: 47,
      dataQuality: "Good",
      dataQualityScore: 78,
      dataLeakageRisk: "Low",
      dataImbalance: {
        targetColumn: "churn",
        imbalanceRatio: 0.23,
        minorityClass: "churned",
        majorityClass: "retained",
        suggestedTechnique: "SMOTE oversampling"
      }
    },

    dataPreparation: {
      cleaningSteps: [
        { step: 1, action: "Remove 12 duplicate rows", reason: "Duplicates can bias model training and inflate metrics", impact: "medium" },
        { step: 2, action: "Impute missing 'region' values with mode", reason: "2.3% missing - mode imputation preserves distribution", impact: "low" },
        { step: 3, action: "Impute missing 'age' values with median", reason: "Median is robust to outliers in age distribution", impact: "low" },
        { step: 4, action: "Cap outliers in 'revenue' at 99th percentile", reason: "47 extreme values may distort model learning", impact: "high" },
        { step: 5, action: "Convert 'signup_date' to tenure features", reason: "Raw dates are not directly usable; derive days_since_signup", impact: "high" }
      ],
      encodingStrategy: {
        categorical: "One-Hot Encoding for 'region' (8 categories), Target Encoding for 'product_category' (12 categories)",
        text: "Not applicable - no text columns detected"
      },
      scalingMethod: "RobustScaler - recommended due to presence of outliers",
      featureEngineering: [
        "Create 'customer_lifetime_days' from signup_date",
        "Generate 'avg_monthly_revenue' = revenue / tenure_months",
        "Create interaction feature 'engagement_x_frequency' = engagement_score * purchase_frequency",
        "Bin 'age' into segments: Young (18-25), Adult (26-45), Senior (46+)",
        "Extract 'signup_quarter' and 'signup_year' from signup_date"
      ]
    },

    edaInsights: {
      statisticalSummary: "Dataset shows healthy variance across features with revenue ranging from $12 to $45,000 (mean: $2,340, median: $1,890). Strong positive skew in revenue suggests log transformation may improve model performance.",
      insights: [
        {
          category: "correlation",
          title: "Engagement Drives Revenue",
          description: "Customer engagement score shows the strongest correlation with revenue (r=0.82), significantly higher than any other feature.",
          importance: "high",
          technicalDetails: "Pearson correlation: 0.82, p-value < 0.001"
        },
        {
          category: "pattern",
          title: "Seasonal Purchase Patterns",
          description: "Q3-Q4 shows 34% higher conversion rates and 28% higher average order values compared to Q1-Q2.",
          importance: "high",
          technicalDetails: "ANOVA F-statistic: 45.2, p-value < 0.001"
        },
        {
          category: "trend",
          title: "Customer Tenure Impact",
          description: "Customers with 12+ months tenure generate 3.2x more revenue than newer customers, with diminishing returns after 24 months.",
          importance: "high"
        },
        {
          category: "anomaly",
          title: "Region-Specific Outliers",
          description: "Northeast region shows 15 revenue outliers (vs. expected 3-4), suggesting potential data entry issues or unique market dynamics.",
          importance: "medium",
          technicalDetails: "IQR analysis: 15 values beyond 1.5*IQR in Northeast only"
        },
        {
          category: "distribution",
          title: "Age Distribution Bimodal",
          description: "Customer age shows bimodal distribution with peaks at 28 and 45, suggesting two distinct customer segments.",
          importance: "medium"
        }
      ],
      topCorrelations: [
        { feature1: "engagement_score", feature2: "revenue", correlationValue: 0.82, strength: "strong", direction: "positive" },
        { feature1: "purchase_frequency", feature2: "revenue", correlationValue: 0.71, strength: "strong", direction: "positive" },
        { feature1: "tenure_days", feature2: "revenue", correlationValue: 0.58, strength: "moderate", direction: "positive" },
        { feature1: "age", feature2: "purchase_frequency", correlationValue: 0.34, strength: "moderate", direction: "positive" },
        { feature1: "engagement_score", feature2: "churn", correlationValue: -0.67, strength: "strong", direction: "negative" }
      ],
      featureImportance: [
        { feature: "engagement_score", importance: 0.28, reason: "Strongest predictor of both revenue and churn" },
        { feature: "purchase_frequency", importance: 0.22, reason: "Direct relationship with customer value" },
        { feature: "tenure_days", importance: 0.18, reason: "Longer tenure correlates with higher LTV" },
        { feature: "product_category", importance: 0.15, reason: "Some categories have 5x higher margins" },
        { feature: "region", importance: 0.09, reason: "Regional pricing and market differences" },
        { feature: "age", importance: 0.08, reason: "Age segments show different behaviors" }
      ]
    },

    mlRecommendations: {
      inferredGoal: "prediction",
      targetVariable: "revenue",
      recommendedModels: [
        {
          modelName: "XGBoost Regressor",
          modelType: "regression",
          suitabilityScore: 92,
          pros: [
            "Excellent handling of mixed feature types",
            "Built-in regularization prevents overfitting",
            "Handles missing values natively",
            "Provides feature importance scores"
          ],
          cons: [
            "Requires careful hyperparameter tuning",
            "Less interpretable than linear models",
            "Can be slower to train on very large datasets"
          ],
          expectedPerformance: "R² of 0.85-0.89 expected based on correlation analysis",
          interpretability: "medium",
          trainingComplexity: "medium",
          justification: "XGBoost excels with tabular data containing both numerical and categorical features. The dataset's characteristics (mixed types, some missing values, moderate size) align perfectly with XGBoost's strengths."
        },
        {
          modelName: "Random Forest Regressor",
          modelType: "regression",
          suitabilityScore: 86,
          pros: [
            "Robust to outliers and noise",
            "Handles non-linear relationships well",
            "Less prone to overfitting than single trees",
            "Easy to parallelize"
          ],
          cons: [
            "Can be memory-intensive",
            "Slower inference than gradient boosting",
            "May not capture complex interactions as well"
          ],
          expectedPerformance: "R² of 0.82-0.86 expected",
          interpretability: "medium",
          trainingComplexity: "low",
          justification: "Random Forest provides a solid baseline with minimal tuning required. Good choice for initial modeling and establishing performance benchmarks."
        },
        {
          modelName: "LightGBM",
          modelType: "regression",
          suitabilityScore: 88,
          pros: [
            "Faster training than XGBoost",
            "Lower memory usage",
            "Excellent with categorical features",
            "Leaf-wise growth often finds better splits"
          ],
          cons: [
            "Can overfit on small datasets",
            "Sensitive to hyperparameters",
            "May require more careful validation"
          ],
          expectedPerformance: "R² of 0.84-0.88 expected",
          interpretability: "medium",
          trainingComplexity: "medium",
          justification: "LightGBM is a strong alternative to XGBoost with faster training. Recommended if training time becomes a constraint during hyperparameter search."
        }
      ],
      bestModel: "XGBoost Regressor",
      alternativeApproaches: [
        "Ensemble stacking of XGBoost + LightGBM for marginal accuracy gains",
        "Neural network (MLP) if more complex feature interactions are discovered",
        "Separate models per region if regional differences are significant"
      ]
    },

    modelPerformance: {
      performanceComparison: [
        {
          modelName: "XGBoost Regressor",
          metrics: [
            { name: "R²", value: 0.8721, interpretation: "Model explains 87.2% of variance" },
            { name: "RMSE", value: 324.56, interpretation: "Average prediction error of $324.56" },
            { name: "MAE", value: 218.34, interpretation: "Median error of $218.34" },
            { name: "MAPE", value: 0.0923, interpretation: "9.23% average percentage error" }
          ],
          rank: 1,
          isRecommended: true,
          notes: "Best overall performance with good generalization on holdout set"
        },
        {
          modelName: "LightGBM",
          metrics: [
            { name: "R²", value: 0.8589, interpretation: "Model explains 85.9% of variance" },
            { name: "RMSE", value: 352.18, interpretation: "Average prediction error of $352.18" },
            { name: "MAE", value: 234.67, interpretation: "Median error of $234.67" },
            { name: "MAPE", value: 0.0987, interpretation: "9.87% average percentage error" }
          ],
          rank: 2,
          isRecommended: false,
          notes: "Slightly lower accuracy but 2x faster training time"
        },
        {
          modelName: "Random Forest",
          metrics: [
            { name: "R²", value: 0.8312, interpretation: "Model explains 83.1% of variance" },
            { name: "RMSE", value: 389.45, interpretation: "Average prediction error of $389.45" },
            { name: "MAE", value: 267.89, interpretation: "Median error of $267.89" },
            { name: "MAPE", value: 0.1134, interpretation: "11.34% average percentage error" }
          ],
          rank: 3,
          isRecommended: false,
          notes: "Good baseline model, useful for feature importance validation"
        }
      ],
      bestModelDetails: {
        name: "XGBoost Regressor",
        whyBest: "Achieves highest R² (0.872) with robust cross-validation performance (std: 0.012). Low variance between folds indicates good generalization. SHAP analysis confirms interpretable feature contributions.",
        keyMetrics: [
          { name: "Test R²", value: 0.8721, interpretation: "Excellent predictive power" },
          { name: "CV R² (5-fold)", value: 0.8693, interpretation: "Consistent across folds" },
          { name: "RMSE", value: 324.56, interpretation: "Acceptable for business use" }
        ]
      }
    },

    finalInsights: {
      keyDrivers: [
        "Engagement score is the #1 driver of revenue - a 10-point increase correlates with 23% higher revenue",
        "Purchase frequency shows strong predictive power - weekly buyers generate 4.2x more revenue than monthly buyers",
        "Customer tenure matters up to 24 months, then plateaus - focus retention efforts on the 6-18 month cohort",
        "Product category 'Premium' has 5x margin but only 18% of volume - expansion opportunity identified"
      ],
      businessRecommendations: [
        {
          priority: 1,
          action: "Implement engagement-based targeting for marketing campaigns",
          rationale: "Engagement score is the strongest predictor; improving engagement directly impacts revenue",
          expectedOutcome: "15-20% increase in campaign ROI based on historical correlation",
          effort: "medium",
          impact: "high"
        },
        {
          priority: 2,
          action: "Launch proactive retention program for 6-18 month customers",
          rationale: "This cohort shows highest churn risk but also highest LTV potential",
          expectedOutcome: "Reduce churn by 23% in target segment, worth ~$1.2M annually",
          effort: "medium",
          impact: "high"
        },
        {
          priority: 3,
          action: "Expand Premium product category promotion",
          rationale: "5x margin with only 18% penetration indicates untapped potential",
          expectedOutcome: "Increasing Premium share to 25% could add $800K in margin",
          effort: "low",
          impact: "high"
        },
        {
          priority: 4,
          action: "Investigate Northeast region data quality",
          rationale: "Unusual outlier pattern suggests potential data collection issues",
          expectedOutcome: "Improved data quality for future model iterations",
          effort: "low",
          impact: "medium"
        },
        {
          priority: 5,
          action: "Deploy model for real-time revenue prediction",
          rationale: "87% accuracy enables reliable customer value scoring",
          expectedOutcome: "Enable dynamic pricing and personalized offers",
          effort: "high",
          impact: "high"
        }
      ],
      risksAndLimitations: [
        {
          type: "data",
          description: "2.3% missing region data may bias regional insights",
          severity: "low",
          mitigation: "Mode imputation applied; monitor regional predictions for drift"
        },
        {
          type: "model",
          description: "Model trained on historical data may not capture future market shifts",
          severity: "medium",
          mitigation: "Implement monthly retraining pipeline with performance monitoring"
        },
        {
          type: "business",
          description: "Correlation between engagement and revenue doesn't prove causation",
          severity: "medium",
          mitigation: "A/B test engagement initiatives before full rollout"
        },
        {
          type: "technical",
          description: "XGBoost requires careful feature engineering for deployment",
          severity: "low",
          mitigation: "Document feature pipeline; implement automated feature validation"
        }
      ],
      nextSteps: [
        { priority: 1, step: "Validate model on most recent month's data (holdout)", category: "model", effort: "low" },
        { priority: 2, step: "Build automated feature engineering pipeline", category: "feature", effort: "medium" },
        { priority: 3, step: "Set up A/B test for engagement-based targeting", category: "deployment", effort: "medium" },
        { priority: 4, step: "Create monitoring dashboard for model drift detection", category: "monitoring", effort: "medium" },
        { priority: 5, step: "Collect additional data on customer interactions for feature enrichment", category: "data", effort: "high" }
      ]
    }
  };
};
