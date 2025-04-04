"use client"
import { useGetDashboardMetricsQuery } from '@/state/api'
import React from 'react'
import numeral from "numeral";
import {  TrendingDown, TrendingUp } from 'lucide-react';
import { Area,AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip  } from 'recharts';
//import { Tooltip } from '@mui/material';
interface PurchaseDataPoint {
    date: string | Date;
    totalPurchased: number;
    changePercentage?: number;
  }
const CardPurchaseSummary = () => {
    const {data, isLoading,isError} = useGetDashboardMetricsQuery();
    const purchaseData: PurchaseDataPoint[] = data?.purchaseSummary || [];
    const lastDataPoint = purchaseData[purchaseData.length - 1] || null;
    
    if (isError) {
      return <div className="m-5">Failed to fetch data</div>;
    }    
  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
        {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
        <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
         Purchase Summary
          </h3>
          <hr />
          <div className="overflow-auto h-full">
             {/* BODY HEADER */}
             <div className="mb-4 mt-7 px-7">
                <p className="text-xs text-gray-400">Purchased</p>
                <div className="flex items-center">
                    <p className="text-2xl font-bold">
                    {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "0"}
                    </p>
                    {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      lastDataPoint.changePercentage! >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } flex ml-3`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
                </div>
                  {/* CHART */}

                  <ResponsiveContainer width="100%" height={200} className="p-2">
  {purchaseData.length > 0 ? (
    <AreaChart data={purchaseData} margin={{ top: 0, right: 0, left: -50, bottom: 45 }}>
      <XAxis dataKey="date" tick={false} axisLine={false} />
        {/* // If dates are strings, you might need this:
        // tickFormatter={(value) => new Date(value).toLocaleDateString()} */}
      
      <YAxis tickLine={false} tick={false} axisLine={false} />
      <Tooltip
        formatter={(value: number) => [`$${value.toLocaleString("en")}`]}
        labelFormatter={(label) => {
          try {
            return new Date(label).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          } catch {
            return label; // Fallback if date parsing fails
          }
        }}
      />
      <Area
        type="monotone" // Changed from 'linear' to 'monotone' for better curves
        dataKey="totalPurchased"
        stroke="#8884d8"
        fill="#8884d8"
        dot={true}
      />
    </AreaChart>
  ) : (
    <div className="flex items-center justify-center h-full">
      No data available
    </div>
  )}
</ResponsiveContainer>
            </div>
        </div>
        </>
      )}
    </div>
  )
}

export default CardPurchaseSummary