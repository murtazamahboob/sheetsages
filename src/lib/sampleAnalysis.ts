import { AnalysisData } from "@/components/AnalysisResult";

// Sample analysis data for demo purposes
export const generateSampleAnalysis = (fileName: string): AnalysisData => {
  return {
    summary: "Overall performance shows a healthy trajectory with 23% YoY revenue growth, though operational efficiency needs attention in Q4.",
    datasetInfo: "Sales and inventory dataset containing 12 months of transaction data across 4 product categories and 8 regional markets.",
    insights: [
      "Revenue peaked in Q3, driven by the 'Electronics' category which contributed 42% of total sales — significantly above the 28% average.",
      "Customer retention rate improved from 67% to 78% over the analysis period, suggesting successful loyalty program implementation.",
      "Average order value increased by 15% in urban markets while remaining flat in suburban areas.",
      "Weekend sales consistently outperform weekdays by 34%, with Saturday being the strongest day.",
      "The 'Premium' segment shows 3x higher profit margin despite representing only 18% of total volume."
    ],
    warnings: [
      { text: "Inventory turnover dropped 40% in Q4 for 'Accessories' category — potential overstock risk of $45,000.", severity: 'high' },
      { text: "12 duplicate entries detected in the transaction log that may affect revenue reporting accuracy.", severity: 'medium' },
      { text: "3 product SKUs show negative margin patterns that require pricing review.", severity: 'high' },
      { text: "Missing data in 'Region' field for 2.3% of records — defaulted to 'Unknown' for analysis.", severity: 'low' }
    ],
    opportunities: [
      "Expanding weekend promotions to underperforming suburban stores could capture an estimated $120K additional quarterly revenue.",
      "The 'Premium' segment's success suggests opportunity to introduce a 'Premium Plus' tier targeting the top 5% of customers.",
      "Cross-selling Electronics with Accessories shows 67% attachment rate — bundling could increase AOV by 25%.",
      "Reducing Accessories inventory by 30% would free up $45K in working capital while maintaining 98% order fulfillment."
    ],
    actions: [
      "Review and reprice the 3 negative-margin SKUs immediately to prevent further loss.",
      "Launch targeted promotion for slow-moving Accessories inventory within the next 2 weeks.",
      "Implement weekend-focused marketing campaign for suburban store locations.",
      "Create Electronics + Accessories bundle offers for the upcoming quarter.",
      "Investigate and correct the 12 duplicate transaction entries before next financial close."
    ],
    stats: {
      rows: 8432,
      columns: 24,
      issues: 4
    }
  };
};
