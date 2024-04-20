"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import  AnalyticChart from "@/components/Analytics/Analytics";

const Analytics: React.FC = () => {
    return (
        <DefaultLayout>
            <AnalyticChart></AnalyticChart>
        </DefaultLayout>
    );
};

export default Analytics;
