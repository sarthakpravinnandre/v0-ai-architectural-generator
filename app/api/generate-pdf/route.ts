import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      floorPlanSvg,
      structuralSvg,
      costData,
      buildingStats,
      plotInput,
    } = body

    // Generate a simple PDF-like response
    // In production, you would use a library like PDFKit or call a backend service
    // For now, return SVG as base64 that can be rendered
    const pdfContent = generatePDFContent({
      floorPlanSvg,
      structuralSvg,
      costData,
      buildingStats,
      plotInput,
    })

    // Return as blob that can be downloaded
    return new NextResponse(pdfContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="floor-plan-${Date.now()}.pdf"`,
      },
    })
  } catch (error) {
    console.error('[v0] PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}

function generatePDFContent(data: any): Buffer {
  // This is a placeholder implementation
  // In production, integrate with a proper PDF library or backend service
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Floor Plan Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #1a3a52; }
        .header { border-bottom: 2px solid #1a3a52; padding-bottom: 10px; margin-bottom: 20px; }
        .section { margin-bottom: 30px; page-break-inside: avoid; }
        .section-title { font-size: 18px; font-weight: bold; color: #1a3a52; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; font-weight: bold; }
        .metric { display: inline-block; margin-right: 30px; margin-bottom: 10px; }
        .metric-label { font-size: 12px; color: #666; }
        .metric-value { font-size: 20px; font-weight: bold; color: #2563eb; }
        .svg-container { margin: 20px 0; border: 1px solid #ddd; padding: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Architectural Floor Plan Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>

      <div class="section">
        <div class="section-title">Project Details</div>
        <div class="metric">
          <div class="metric-label">Plot Length</div>
          <div class="metric-value">${data.plotInput.length}m</div>
        </div>
        <div class="metric">
          <div class="metric-label">Plot Breadth</div>
          <div class="metric-value">${data.plotInput.breadth}m</div>
        </div>
        <div class="metric">
          <div class="metric-label">Number of Floors</div>
          <div class="metric-value">${data.plotInput.numFloors}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Building Type</div>
          <div class="metric-value">${data.plotInput.plotType}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Building Statistics</div>
        <table>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Total Plot Area</td>
            <td>${data.buildingStats.totalPlotArea.toFixed(2)} m²</td>
          </tr>
          <tr>
            <td>Built-up Area</td>
            <td>${data.buildingStats.builtUpArea.toFixed(2)} m²</td>
          </tr>
          <tr>
            <td>Carpet Area</td>
            <td>${data.buildingStats.carpetArea.toFixed(2)} m²</td>
          </tr>
          <tr>
            <td>Space Efficiency</td>
            <td>${data.buildingStats.efficiency.toFixed(1)}%</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Floor Plan</div>
        <div class="svg-container">
          <!-- SVG will be embedded here in actual PDF generation -->
          <p>Floor plan visualization</p>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Cost Estimation Summary</div>
        <table>
          <tr>
            <th>Category</th>
            <th>Amount (₹ Lakhs)</th>
            <th>Percentage</th>
          </tr>
          ${data.costData.items
            .reduce((acc: any[], item: any) => {
              const existing = acc.find((x: any) => x.category === item.category)
              if (existing) {
                existing.total += item.total
              } else {
                acc.push({ category: item.category, total: item.total })
              }
              return acc
            }, [])
            .map(
              (cat: any) =>
                `<tr>
              <td>${cat.category}</td>
              <td>₹${(cat.total / 100000).toFixed(1)}</td>
              <td>${((cat.total / data.costData.totalCost) * 100).toFixed(1)}%</td>
            </tr>`
            )
            .join('')}
          <tr style="font-weight: bold; background-color: #f0f0f0;">
            <td>Total Estimated Cost</td>
            <td>₹${(data.costData.totalCost / 100000).toFixed(1)}</td>
            <td>100%</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Cost Breakdown Details</div>
        <table>
          <tr>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Unit Rate</th>
            <th>Total (₹)</th>
          </tr>
          ${data.costData.items
            .map(
              (item: any) =>
                `<tr>
              <td>${item.description}</td>
              <td>${item.quantity.toFixed(0)}</td>
              <td>₹${item.rate.toFixed(0)}</td>
              <td>₹${(item.total / 100000).toFixed(1)}</td>
            </tr>`
            )
            .join('')}
        </table>
      </div>

      <div class="section">
        <div class="section-title">Important Notes</div>
        <ul>
          <li>This is a preliminary design for visualization purposes</li>
          <li>Detailed structural design required by qualified structural engineer</li>
          <li>Soil investigation report necessary before final design</li>
          <li>Local building regulations and bylaws must be followed</li>
          <li>All dimensions are indicative and subject to site conditions</li>
          <li>Cost estimates are preliminary and subject to market variations</li>
        </ul>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
        <p>Generated by Visionary - AI Architectural Plan Generator</p>
        <p>${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
  `

  // Convert HTML to PDF buffer (simplified - returns as text for now)
  // In production, use a library like html2pdf, pdfkit, or puppeteer
  return Buffer.from(htmlContent, 'utf-8')
}
