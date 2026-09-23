import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';

// Custom Dark Glass Tooltip for Bloomberg Aesthetic
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B132B]/95 border border-cyan-500/40 p-3 rounded-xl shadow-2xl backdrop-blur-md font-mono text-xs text-slate-100">
        <p className="font-bold text-cyan-300 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="flex items-center justify-between gap-4 text-[11px]" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span className="font-bold">{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Chart 1: 5-Year DCF Free Cash Flow & Present Value Bar Chart
export function DCFValuationChart({ fcfData = [] }) {
  const data = fcfData.length > 0 ? fcfData : [
    { year: 'Year 1', fcf: 2268, pv: 2080 },
    { year: 'Year 2', fcf: 2450, pv: 2062 },
    { year: 'Year 3', fcf: 2646, pv: 2043 },
    { year: 'Year 4', fcf: 2857, pv: 2024 },
    { year: 'Year 5', fcf: 3086, pv: 2005 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="fcf" name="Nominal FCF ($M)" fill="#48CAE4" radius={[6, 6, 0, 0]} />
          <Bar dataKey="pv" name="Present Value ($M)" fill="#3B82F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Chart 2: Altman Z-Score 5-Factor Radar Breakdown Chart
export function AltmanZRadarChart({ zInputs }) {
  const data = zInputs || [
    { factor: 'X1: Working Cap', value: 85, fullMark: 100 },
    { factor: 'X2: Retained Earn', value: 78, fullMark: 100 },
    { factor: 'X3: EBIT Margin', value: 92, fullMark: 100 },
    { factor: 'X4: Equity Solvency', value: 88, fullMark: 100 },
    { factor: 'X5: Asset Turnover', value: 70, fullMark: 100 },
  ];

  return (
    <div className="h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
          <PolarAngleAxis dataKey="factor" stroke="#CBD5E1" fontSize={10} tickLine={false} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748B" fontSize={8} />
          <Radar name="Target Solvency Vector" dataKey="value" stroke="#48CAE4" fill="#48CAE4" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Chart 3: Scenario EBITDA Risk Impact Breakdown Chart
export function ScenarioEbitdaChart({ breakdown = [] }) {
  const data = breakdown.length > 0 ? breakdown : [
    { category: 'Tariff Exposure', loss: 223.2 },
    { category: 'SLA Delay Penalty', loss: 39.9 },
    { category: 'Material Shock', loss: 731.0 },
    { category: 'Inflation Escalation', loss: 33.25 },
  ];

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
          <XAxis type="number" stroke="#94A3B8" fontSize={10} />
          <YAxis dataKey="category" type="category" stroke="#94A3B8" fontSize={10} tickLine={false} width={100} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="loss" name="Projected Loss ($M)" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 2 ? '#FF5A5F' : index === 0 ? '#FFD166' : '#48CAE4'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
