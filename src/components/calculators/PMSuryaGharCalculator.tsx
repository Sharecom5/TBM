"use client";

import React, { useState, useMemo } from 'react';
import { STATE_SUBSIDIES } from '@/data/calculators/solar-subsidies';
import { Zap, Sun, MapPin, IndianRupee, Info, TrendingUp, CheckCircle2 } from 'lucide-react';

const TARIFF_RATE = 7.5;
const SOLAR_YIELD_PER_KW = 4;
const COST_PER_KW = 60000;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PMSuryaGharCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(3000);
  const [selectedState, setSelectedState] = useState<string>("Uttar Pradesh");

  const results = useMemo(() => {
    // 1. Determine System Size
    const monthlyUnits = monthlyBill / TARIFF_RATE;
    const dailyUnits = monthlyUnits / 30;
    const rawKwNeeded = dailyUnits / SOLAR_YIELD_PER_KW;
    const recommendedKW = Math.max(1, Math.ceil(rawKwNeeded)); // At least 1kW

    // 2. Calculate Central Subsidy
    let centralSubsidy = 0;
    if (recommendedKW === 1) centralSubsidy = 30000;
    else if (recommendedKW === 2) centralSubsidy = 60000;
    else if (recommendedKW >= 3) centralSubsidy = 78000;

    // 3. Calculate State Top-Up
    const stateData = STATE_SUBSIDIES.find(s => s.state === selectedState);
    let stateSubsidy = 0;
    if (stateData) {
      stateSubsidy = Math.min(
        recommendedKW * stateData.extraPerKW,
        stateData.maxSubsidy
      );
    }

    // 4. Totals
    const totalSubsidy = centralSubsidy + stateSubsidy;
    const totalCost = recommendedKW * COST_PER_KW;
    const netCost = totalCost - totalSubsidy;
    
    // Additional metrics
    const annualSavings = monthlyBill * 12;
    const paybackYears = netCost > 0 ? (netCost / annualSavings).toFixed(1) : "0";

    return {
      recommendedKW,
      centralSubsidy,
      stateSubsidy,
      totalSubsidy,
      totalCost,
      netCost,
      annualSavings,
      paybackYears
    };
  }, [monthlyBill, selectedState]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4 ring-8 ring-yellow-50">
          <Sun className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          PM Surya Ghar Subsidy Calculator
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate your 2026 central and state solar subsidies in seconds. Find out how much you can save by switching to solar energy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-emerald-50 blur-2xl opacity-70"></div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Zap className="w-5 h-5 text-emerald-500 mr-2" />
              Your Details
            </h2>

            {/* Input: Monthly Bill */}
            <div className="mb-8 relative z-10">
              <label htmlFor="monthlyBill" className="block text-sm font-semibold text-slate-700 mb-2">
                Average Monthly Electricity Bill
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-500 font-medium">₹</span>
                <input
                  type="number"
                  id="monthlyBill"
                  min="0"
                  step="100"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold text-slate-900 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-inner"
                  placeholder="e.g. 3000"
                />
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full mt-4 accent-emerald-500"
              />
              <div className="flex justify-between text-xs font-medium text-slate-400 mt-1">
                <span>₹500</span>
                <span>₹20k+</span>
              </div>
            </div>

            {/* Input: State */}
            <div className="relative z-10">
              <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-2">
                Select Your State
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  id="state"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold text-slate-800 appearance-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-inner"
                >
                  {STATE_SUBSIDIES.map((s) => (
                    <option key={s.state} value={s.state}>
                      {s.state}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start text-sm text-slate-600">
              <Info className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <p>Calculations use an average tariff of <strong>₹7.5/unit</strong> and assume <strong>4 units/kW</strong> daily generation.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden">
            {/* Background embellishments */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <p className="text-emerald-400 font-semibold mb-1 flex items-center text-sm uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Recommended System Size
                </p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight">{results.recommendedKW}</span>
                  <span className="text-2xl font-medium text-slate-400 ml-1">kW</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 text-left sm:text-right">
                <p className="text-slate-400 font-medium mb-1 text-sm uppercase tracking-wider">Estimated Setup Cost</p>
                <p className="text-2xl font-bold line-through text-slate-500">{formatCurrency(results.totalCost)}</p>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                <p className="text-slate-400 text-sm font-medium mb-1">Central Subsidy</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(results.centralSubsidy)}</p>
                {results.recommendedKW >= 3 && <p className="text-xs text-emerald-400 mt-1">Maximum cap reached</p>}
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                <p className="text-slate-400 text-sm font-medium mb-1">State Top-Up ({selectedState})</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(results.stateSubsidy)}</p>
              </div>
            </div>

            <div className="relative z-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-inner text-center sm:text-left sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-emerald-50 font-medium mb-1 text-sm uppercase tracking-wide text-center sm:text-left">Net Cost to You</p>
                <p className="text-4xl font-extrabold text-white text-center sm:text-left">{formatCurrency(results.netCost)}</p>
              </div>
              <div className="mt-4 sm:mt-0 px-4 py-2 bg-black/10 rounded-lg backdrop-blur-md inline-block">
                <p className="text-emerald-100 text-xs font-medium uppercase mb-0.5">Total Subsidy</p>
                <p className="text-lg font-bold">{formatCurrency(results.totalSubsidy)}</p>
              </div>
            </div>
          </div>

          {/* ROI Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-start">
              <div className="p-3 bg-green-50 rounded-xl mr-4">
                <IndianRupee className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Annual Savings</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(results.annualSavings)}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-start">
              <div className="p-3 bg-blue-50 rounded-xl mr-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">ROI Payback Period</p>
                <p className="text-2xl font-bold text-slate-900">{results.paybackYears} <span className="text-lg text-slate-500 font-medium">years</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
