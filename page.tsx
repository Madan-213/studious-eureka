"use client";

import React, { useState } from "react";
import { Sparkles, Briefcase, MapPin, Building } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  summary?: string;
}

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "GlobalCo Solutions",
    location: "Hyderabad, India (Onsite)",
    type: "Full-Time",
    description:
      "We are looking for a Software Engineer proficient in React, Next.js, and CI/CD automation pipelines. Experience with AI tooling is highly desirable.",
  },
  {
    id: 2,
    title: "Full Stack AI Developer",
    company: "TechPulse",
    location: "Remote",
    type: "Full-Time",
    description:
      "Build scalable microservices and integrate LLM API endpoints into modern Web applications using TypeScript and Next.js.",
  },
];

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const generateAISummary = (id: number) => {
    setLoadingId(id);
    setTimeout(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === id
            ? {
                ...job,
                summary:
                  "✨ AI Summary: High-priority role focusing on full-stack web architectures, modern cloud CI/CD workflows, and AI integration capabilities.",
              }
            : job
        )
      );
      setLoadingId(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12">
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          SkillMatch <span className="text-indigo-600">AI</span>
        </h1>
        <p className="text-slate-600">
          Smart job search platform powered by AI insights.
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{job.title}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" /> {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> {job.type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => generateAISummary(job.id)}
                disabled={loadingId === job.id}
                className="flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium px-3 py-1.5 rounded-lg text-sm border border-indigo-200 transition"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                {loadingId === job.id ? "Analyzing..." : "AI Summary"}
              </button>
            </div>

            <p className="text-slate-600 text-sm mb-4">{job.description}</p>

            {job.summary && (
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 text-sm text-indigo-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span>{job.summary}</span>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}