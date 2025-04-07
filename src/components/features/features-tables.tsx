"use client"

import { useState } from "react"
import { FeaturesTable } from "./features-table"
import { externalSocialData, deepBehavioralData, embeddedCustomerData, aiOrchestrationData } from "@/lib/features-data"
export function FeaturesTables() {
  const [activeTab, setActiveTab] = useState<
    | "external-social"
    | "deep-behavioral"
    | "embedded-customer"
    | "ai-orchestration"
  >("external-social")

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button
          onClick={() => setActiveTab("external-social")}
          className={`px-5 py-3 rounded-full text-sm font-medium transition-colors ${
            activeTab === "external-social"
              ? "bg-purple-600 text-white"
              : "bg-black/70 text-gray-300 hover:bg-gray-800"
          }`}
        >
          External Social Listening & Intelligence
        </button>
        <button
          onClick={() => setActiveTab("deep-behavioral")}
          className={`px-5 py-3 rounded-full text-sm font-medium transition-colors ${
            activeTab === "deep-behavioral"
              ? "bg-purple-600 text-white"
              : "bg-black/70 text-gray-300 hover:bg-gray-800"
          }`}
        >
          Deep Behavioral Modeling & Strategic Insights
        </button>
        <button
          onClick={() => setActiveTab("embedded-customer")}
          className={`px-5 py-3 rounded-full text-sm font-medium transition-colors ${
            activeTab === "embedded-customer"
            ? "bg-purple-600 text-white"
              : "bg-black/70 text-gray-300 hover:bg-gray-800"
          }`}
        >
          Embedded Customer Engagement
        </button>
        <button
          onClick={() => setActiveTab("ai-orchestration")}
          className={`px-5 py-3 rounded-full text-sm font-medium transition-colors ${
            activeTab === "ai-orchestration"
               ? "bg-purple-600 text-white"
              : "bg-black/70 text-gray-300 hover:bg-gray-800"
          }`}
        >
          AI Orchestration & Pipeline Automation
        </button>
      </div>

      <div className="bg-black/40 p-8 rounded-2xl">
        {activeTab === "external-social" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              External Social Listening & Intelligence
            </h2>
            <p className="text-gray-300 mb-10 text-center max-w-4xl mx-auto">
              This category of features systematically scours social platforms and online communities, analyzing relevant conversations to derive critical insights about brand perception and industry developments. Exploit these insights to gauge public sentiment and shape your strategic outreach, and leverage them to stay one step ahead of evolving trends.
            </p>
            <FeaturesTable data={externalSocialData} />
          </>
        )}

        {activeTab === "deep-behavioral" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              Deep Behavioral Modeling & Strategic Insights
            </h2>
            <p className="text-gray-300 mb-10 text-center max-w-4xl mx-auto">
              This advanced analytics engine deciphers user intentions, emotional states, and psychological drivers to inform long-term brand strategies. Incorporate these in-depth perspectives to craft deeply resonant messaging, and drive smarter decision-making across your campaigns.
            </p>
            <FeaturesTable data={deepBehavioralData} />
          </>
        )}

        {activeTab === "embedded-customer" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              Embedded Customer Engagement
            </h2>
            <p className="text-gray-300 mb-10 text-center max-w-4xl mx-auto">
              This approach integrates interactive experiences directly into the user journey, sustaining participation without requiring platform switches. Design immersive touchpoints to keep users engaged, and measure their interactions to refine ongoing engagement strategies.
            </p>
            <FeaturesTable data={embeddedCustomerData} />
          </>
        )}

        {activeTab === "ai-orchestration" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              AI Orchestration & Pipeline Automation
            </h2>
            <p className="text-gray-300 mb-10 text-center max-w-4xl mx-auto">
              This system coordinates multiple AI tasks and workflows, automating data processing, model deployment, and continuous integration. Streamline your development cycle to accelerate solution delivery, and utilize automated orchestration to minimize manual overhead.
            </p>
            <FeaturesTable data={aiOrchestrationData} />
          </>
        )}
      </div>
    </div>
  )
} 