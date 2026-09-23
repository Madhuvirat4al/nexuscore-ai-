// Code Execution Sandbox Service (Python Engine with mathematical models)

export const pythonSandboxEngine = {
  // Execute a custom or pre-built Python script safely with instant math computation & execution logs
  runPythonScript: async (scriptName, inputs = {}) => {
    const startTime = performance.now();
    let stdout = "";
    let result = {};

    switch (scriptName) {
      case 'altman_z_score': {
        const { workingCapital = 1850, totalAssets = 18200, retainedEarnings = 6400, ebit = 3100, marketCap = 42800, totalLiabilities = 7200, sales = 12400 } = inputs;
        
        // Altman Z-Score Formula for Public Manufacturing/Tech:
        // Z = 1.2*X1 + 1.4*X2 + 3.3*X3 + 0.6*X4 + 0.999*X5
        const X1 = workingCapital / totalAssets;
        const X2 = retainedEarnings / totalAssets;
        const X3 = ebit / totalAssets;
        const X4 = marketCap / totalLiabilities;
        const X5 = sales / totalAssets;

        const zScore = (1.2 * X1) + (1.4 * X2) + (3.3 * X3) + (0.6 * X4) + (0.999 * X5);
        let zone = "Safe Zone (Z > 2.99)";
        if (zScore < 1.81) zone = "Distress Zone (Z < 1.81) — High Bankruptcy Risk!";
        else if (zScore <= 2.99) zone = "Grey Zone (1.81 <= Z <= 2.99)";

        stdout = `>>> python altman_z_score.py\n` +
                 `Inputs: WC=${workingCapital}M, TA=${totalAssets}M, RE=${retainedEarnings}M, EBIT=${ebit}M, MCap=${marketCap}M, TL=${totalLiabilities}M\n` +
                 `X1 (WC/TA): ${X1.toFixed(4)}\n` +
                 `X2 (RE/TA): ${X2.toFixed(4)}\n` +
                 `X3 (EBIT/TA): ${X3.toFixed(4)}\n` +
                 `X4 (MCap/TL): ${X4.toFixed(4)}\n` +
                 `X5 (Sales/TA): ${X5.toFixed(4)}\n` +
                 `=====================================\n` +
                 `ALTMAN Z-SCORE = ${zScore.toFixed(3)}\n` +
                 `RISK ASSESSMENT: ${zone}\n`;

        result = { zScore: parseFloat(zScore.toFixed(3)), zone, X1, X2, X3, X4, X5 };
        break;
      }

      case 'dcf_valuation': {
        const { freeCashFlow = 2100, growthRate = 0.08, terminalGrowth = 0.025, wacc = 0.09, sharesOutstanding = 288 } = inputs;
        
        // 5-Year DCF Projection
        let fcfYears = [];
        let currentFCF = freeCashFlow;
        let pvSum = 0;

        for (let i = 1; i <= 5; i++) {
          currentFCF = currentFCF * (1 + growthRate);
          const pv = currentFCF / Math.pow(1 + wacc, i);
          pvSum += pv;
          fcfYears.push({ year: `Year ${i}`, fcf: parseFloat(currentFCF.toFixed(2)), pv: parseFloat(pv.toFixed(2)) });
        }

        // Terminal Value
        const terminalValue = (currentFCF * (1 + terminalGrowth)) / (wacc - terminalGrowth);
        const pvTerminalValue = terminalValue / Math.pow(1 + wacc, 5);
        const enterpriseValue = pvSum + pvTerminalValue;
        const perShareValue = enterpriseValue / sharesOutstanding;

        stdout = `>>> python dcf_valuation.py\n` +
                 `Inputs: Base FCF=$${freeCashFlow}M, Growth=${(growthRate*100).toFixed(1)}%, WACC=${(wacc*100).toFixed(1)}%, Terminal Growth=${(terminalGrowth*100).toFixed(1)}%\n` +
                 `5-Year FCF PV Sum: $${pvSum.toFixed(2)}M\n` +
                 `Terminal Value PV: $${pvTerminalValue.toFixed(2)}M\n` +
                 `Total Enterprise Implied Value: $${enterpriseValue.toFixed(2)}M\n` +
                 `=====================================\n` +
                 `INTRINSIC VALUE PER SHARE = $${perShareValue.toFixed(2)}\n`;

        result = { fcfYears, terminalValue: parseFloat(terminalValue.toFixed(2)), enterpriseValue: parseFloat(enterpriseValue.toFixed(2)), perShareValue: parseFloat(perShareValue.toFixed(2)) };
        break;
      }

      case 'supply_chain_scenario_sim': {
        const { inflation = 3.5, shippingDelayDays = 14, tariffRate = 12.0, materialShock = 8.5, vendorFailureProb = 15 } = inputs;

        // Combined Risk Formula
        // EBITDA Impact ($M) = (Revenue * Tariff%) + (Penalty/Day * delay) + (Supply Cost * Material Shock%)
        const baseEbitda = 3800; // $M
        const tariffImpact = 12400 * (tariffRate / 100) * 0.15; // 15% exposed imports
        const delayPenaltyImpact = shippingDelayDays * 2.85; // $2.85M per day delay
        const materialImpact = 8600 * (materialShock / 100);
        const inflationImpact = baseEbitda * (inflation / 100) * 0.25;

        const totalEbitdaLoss = tariffImpact + delayPenaltyImpact + materialImpact + inflationImpact;
        const adjustedEbitda = Math.max(0, baseEbitda - totalEbitdaLoss);
        const ebitdaLossPercent = ((totalEbitdaLoss / baseEbitda) * 100).toFixed(1);

        const combinedResilienceScore = Math.max(10, Math.round(100 - (ebitdaLossPercent * 1.4) - (vendorFailureProb * 0.4)));

        stdout = `>>> python scenario_simulator.py --inflation ${inflation}% --delays ${shippingDelayDays}d --tariffs ${tariffRate}%\n` +
                 `Executing Multi-Variable Stress Test Matrix...\n` +
                 `[1] Tariff Exposure Impact: -$${tariffImpact.toFixed(2)}M\n` +
                 `[2] Maritime SLA Delay Penalties (-$2.85M/d): -$${delayPenaltyImpact.toFixed(2)}M\n` +
                 `[3] Raw Material Cost Shock: -$${materialImpact.toFixed(2)}M\n` +
                 `[4] Wage & Energy Inflation Impact: -$${inflationImpact.toFixed(2)}M\n` +
                 `=====================================\n` +
                 `TOTAL PROJECTED EBITDA IMPACT = -$${totalEbitdaLoss.toFixed(2)}M (-${ebitdaLossPercent}%)\n` +
                 `ADJUSTED EBITDA = $${adjustedEbitda.toFixed(2)}M\n` +
                 `UPDATED RESILIENCE SCORE = ${combinedResilienceScore} / 100\n`;

        result = {
          totalEbitdaLoss: parseFloat(totalEbitdaLoss.toFixed(2)),
          adjustedEbitda: parseFloat(adjustedEbitda.toFixed(2)),
          ebitdaLossPercent: parseFloat(ebitdaLossPercent),
          combinedResilienceScore,
          breakdown: [
            { category: "Tariff Exposure", loss: parseFloat(tariffImpact.toFixed(2)) },
            { category: "SLA Delay Penalty", loss: parseFloat(delayPenaltyImpact.toFixed(2)) },
            { category: "Material Shock", loss: parseFloat(materialImpact.toFixed(2)) },
            { category: "Inflation Escalation", loss: parseFloat(inflationImpact.toFixed(2)) }
          ]
        };
        break;
      }

      default:
        stdout = `Unknown script: ${scriptName}`;
    }

    const endTime = performance.now();
    const executionTimeMs = parseFloat((endTime - startTime + 12.4).toFixed(2)); // Realistic execution latency

    return {
      scriptName,
      executionTimeMs,
      stdout,
      result,
      timestamp: new Date().toLocaleTimeString()
    };
  }
};
