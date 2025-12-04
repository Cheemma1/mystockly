// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(request: NextRequest) {
//   try {
//     const { businessData } = await request.json();

//     if (!businessData) {
//       return NextResponse.json(
//         { error: "Business data is required" },
//         { status: 400 }
//       );
//     }

//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       console.error("GEMINI_API_KEY is not set in environment variables");
//       return NextResponse.json(
//         {
//           error:
//             "API Configuration Error: Gemini API key is missing. Please add GEMINI_API_KEY to your .env.local file.",
//         },
//         { status: 500 }
//       );
//     }

//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//     });

//     // Create a detailed prompt for generating business insights
//     const prompt = `You are an expert business consultant analyzing a Nigerian small business. Based on the following business data, generate actionable insights and growth strategies.

// Business Data:
// - Total Revenue: ${businessData.totalRevenue}
// - Total Orders: ${businessData.totalOrders}
// - Total Customers: ${businessData.totalCustomers}
// - Average Order Value: ${businessData.avgOrderValue}
// - Revenue This Week: ${businessData.currentWeekRevenue}
// - Revenue Last Week: ${businessData.prevWeekRevenue}
// - New Customers (Last 30 days): ${businessData.recentCustomers}
// - Inactive Customers (30+ days): ${businessData.inactiveCustomers}
// - Low Stock Products: ${businessData.lowStockProducts}
// - Top Selling Product: ${businessData.topProduct || "N/A"}

// Generate a JSON response with the following structure:
// {
//   "insights": [
//     {
//       "id": "unique-id",
//       "type": "success|warning|info|opportunity",
//       "title": "Insight Title",
//       "description": "Detailed description of the insight",
//       "action": "Specific recommended action",
//       "impact": "high|medium|low"
//     }
//   ],
//   "strategies": {
//     "sales": [
//       {
//         "title": "Strategy Title",
//         "description": "How to implement this strategy for this specific business"
//       }
//     ],
//     "retention": [
//       {
//         "title": "Strategy Title",
//         "description": "How to implement this strategy for this specific business"
//       }
//     ],
//     "revenue": [
//       {
//         "title": "Strategy Title",
//         "description": "How to implement this strategy for this specific business"
//       }
//     ]
//   }
// }

// Requirements:
// 1. Generate 4-6 insights based on the actual data
// 2. Provide 3-4 strategies for each category (sales, retention, revenue)
// 3. Make insights specific to the business's current situation
// 4. Use Nigerian Naira (₦) for currency
// 5. Be actionable and practical for small business owners
// 6. Prioritize insights by impact level
// 7. Include specific numbers and percentages where relevant

// Focus on:
// - Revenue trends (growth or decline)
// - Customer acquisition and retention
// - Product performance
// - Inventory management
// - Average order value optimization
// - Opportunities for growth`;

//     console.log("Sending request to Gemini AI...");
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log("Received response from Gemini AI");

//     // Try to extract JSON from the response
//     let aiResponse;
//     try {
//       // Remove markdown code blocks if present
//       const jsonText = text
//         .replace(/```json\n?/g, "")
//         .replace(/```\n?/g, "")
//         .trim();
//       aiResponse = JSON.parse(jsonText);
//     } catch (parseError) {
//       console.error("Failed to parse AI response:", parseError);
//       console.log("Raw AI response:", text);

//       // Return a fallback response
//       return NextResponse.json(
//         {
//           error: "Failed to parse AI response",
//           rawResponse: text,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(aiResponse);
//   } catch (error) {
//     console.error("Error generating insights:", error);
//     // Log more details about the error
//     if (error instanceof Error) {
//       console.error("Error message:", error.message);
//       console.error("Error stack:", error.stack);
//     }
//     return NextResponse.json(
//       {
//         error: "Failed to generate insights",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { businessData } = await request.json();

    if (!businessData) {
      return NextResponse.json(
        { error: "Business data is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        {
          error: "API Configuration Error: Gemini API key is missing.",
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `You are a senior business consultant analyzing a Nigerian small business. Provide professional business analytics and strategic recommendations.

BUSINESS DATA:
- Total Revenue: ₦${businessData.totalRevenue}
- Total Orders: ${businessData.totalOrders}
- Total Customers: ${businessData.totalCustomers}
- Average Order Value: ₦${businessData.avgOrderValue}
- Revenue This Week: ₦${businessData.currentWeekRevenue}
- Revenue Last Week: ₦${businessData.prevWeekRevenue}
- Revenue Today: ₦${businessData.todayRevenue || 0}
- Orders Today: ${businessData.todayOrders || 0}
- New Customers (Last 30 days): ${businessData.recentCustomers}
- Inactive Customers (30+ days): ${businessData.inactiveCustomers}
- Low Stock Products: ${businessData.lowStockProducts}
- Out of Stock Products: ${businessData.outOfStockProducts || 0}
- Top Selling Product: ${businessData.topProduct || "N/A"}

Generate a JSON response with this structure:

{
  "overallHealth": 85,
  "healthStatus": "Excellent|Good|Needs Attention|Critical",
  "keyMetrics": {
    "revenueGrowth": {
      "percentage": 15.5,
      "trend": "up|down|stable",
      "analysis": "Detailed analysis of revenue trends and what's driving them"
    },
    "customerRetention": {
      "rate": 72,
      "risk": "low|medium|high",
      "analysis": "Analysis of customer behavior and retention issues"
    },
    "inventoryEfficiency": {
      "score": 68,
      "status": "optimal|warning|critical",
      "analysis": "Stock management and product performance analysis"
    },
    "profitability": {
      "aovTrend": "increasing|decreasing|stable",
      "margin": "Analysis of profit margins and pricing effectiveness"
    }
  },
  "criticalInsights": [
    {
      "id": 1,
      "priority": "High|Medium",
      "category": "Revenue|Customer|Operations|Growth",
      "insight": "Key finding about the business (2-3 sentences with specific numbers)",
      "businessImpact": "How this affects the bottom line in ₦ or %",
      "recommendation": "Professional strategic recommendation",
      "actionSteps": [
        "Specific action 1",
        "Specific action 2",
        "Specific action 3"
      ],
      "expectedOutcome": "What will improve and by how much",
      "timeframe": "Immediate|This Week|This Month"
    }
  ],
  "strategicRecommendations": [
    {
      "category": "Revenue Optimization|Customer Acquisition|Retention|Operational Efficiency",
      "strategy": "Strategic recommendation title",
      "rationale": "Why this matters for this business based on the data",
      "implementation": "How to execute this strategy",
      "expectedImpact": "Quantified expected results (₦ or %)",
      "difficulty": "Easy|Moderate|Complex",
      "timeline": "1 week|2 weeks|1 month"
    }
  ],
  "businessIntelligence": {
    "strengths": [
      "Key strength 1 with data",
      "Key strength 2 with data"
    ],
    "weaknesses": [
      "Critical weakness 1 with impact",
      "Critical weakness 2 with impact"
    ],
    "opportunities": [
      "Growth opportunity 1 with potential ₦",
      "Growth opportunity 2 with potential ₦"
    ],
    "threats": [
      "Business risk 1",
      "Business risk 2"
    ]
  }
}

ANALYSIS REQUIREMENTS:

1. OVERALL HEALTH SCORE (0-100):
   Calculate based on:
   - Revenue trends (30%)
   - Customer health (25%)
   - Inventory management (20%)
   - Growth momentum (15%)
   - Operational efficiency (10%)

2. CRITICAL INSIGHTS (3-5 insights):
   - Focus on HIGH-IMPACT findings only
   - Must be data-driven with specific numbers
   - Each insight must have clear ROI or business impact
   - Include only issues/opportunities worth >₦20,000 impact
   - Prioritize by: High (>₦100k impact) or Medium (₦20k-100k impact)

3. STRATEGIC RECOMMENDATIONS (4-6 strategies):
   Categories to analyze:
   - Revenue Optimization: Pricing, upselling, cross-selling
   - Customer Acquisition: New customer channels, marketing
   - Retention: Win-back campaigns, loyalty programs
   - Operational Efficiency: Inventory, cost reduction, automation

4. BUSINESS INTELLIGENCE (SWOT):
   - Strengths: What's working well (backed by data)
   - Weaknesses: What's hurting performance (with ₦ impact)
   - Opportunities: Untapped revenue potential (with estimates)
   - Threats: Risks that need mitigation

5. BE SPECIFIC AND QUANTITATIVE:
   - Use actual numbers from the data
   - Calculate real percentages and trends
   - Estimate revenue impact in ₦
   - Compare week-over-week, month-over-month
   - Reference specific products when relevant

6. PROFESSIONAL CONSULTANT TONE:
   - Data-driven and analytical
   - Strategic and forward-thinking
   - Clear and actionable
   - No fluff or generic advice
   - Focus on ROI and business impact

7. KEY BUSINESS METRICS TO ANALYZE:
   - Revenue velocity (is it accelerating or slowing?)
   - Customer Lifetime Value vs Acquisition Cost
   - Inventory turnover rate
   - Average order value trends
   - Customer churn rate and reasons
   - Product performance (winners vs losers)
   - Cash flow implications
   - Growth rate sustainability

EXAMPLE OF GOOD INSIGHT:
{
  "priority": "High",
  "insight": "Your top 20% of customers generate 73% of revenue (₦328,500), but 26% of them (23 customers) haven't ordered in 30+ days, putting ₦85,000 monthly revenue at risk.",
  "businessImpact": "Potential revenue loss of ₦85,000/month (26% of total)",
  "recommendation": "Launch a VIP re-engagement campaign targeting inactive high-value customers",
  "actionSteps": [
    "Segment customers by lifetime value and last order date",
    "Create personalized WhatsApp messages with 15% discount for return",
    "Follow up with phone calls to top 10 customers"
  ],
  "expectedOutcome": "Recover 60-70% of at-risk customers, adding ₦51,000-60,000/month",
  "timeframe": "This Week"
}

Focus on insights and strategies that will move the needle for this business. Be a trusted business advisor, not just a data reporter.`;

    console.log("Generating business analysis...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let aiResponse;
    try {
      const jsonText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      aiResponse = JSON.parse(jsonText);

      if (!aiResponse.overallHealth) {
        throw new Error("Invalid response structure");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          rawResponse: text,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("Error generating business analysis:", error);
    return NextResponse.json(
      {
        error: "Failed to generate business analysis",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
