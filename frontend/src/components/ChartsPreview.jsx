import React, { useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartsPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current.querySelectorAll(".reveal");
    cards.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const lineData = [
    { month: "Jan", attendance: 78 },
    { month: "Feb", attendance: 82 },
    { month: "Mar", attendance: 88 },
    { month: "Apr", attendance: 90 },
    { month: "May", attendance: 85 },
  ];

  const barData = [
    { name: "Low Risk", value: 65 },
    { name: "Medium Risk", value: 25 },
    { name: "High Risk", value: 10 },
  ];

  const pieData = [
    { name: "Present", value: 82 },
    { name: "Absent", value: 18 },
  ];

  const areaData = [
    { day: "Mon", students: 50 },
    { day: "Tue", students: 72 },
    { day: "Wed", students: 31 },
    { day: "Thu", students: 86 },
    { day: "Fri", students: 112 },
  ];

  const COLORS = ["#A5C89E", "#FFFBB1", "#AEB877"];

  const ChartCard = ({ title, children }) => (
    <div className="reveal min-w-[360px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(165,200,158,0.6)]">
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-apsGreen via-apsLime to-apsOlive">
        <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:p-8">
          <h3 className="text-lg font-bold mb-4 text-center text-gray-800">
            {title}
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            {children}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-16 px-10 charts-glass-bg">

      <h2 className="text-3xl font-bold text-center mb-10 text-apsOlive">
        Live Analytics Preview
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide items-stretch">

        {/* LINE CHART */}
        <ChartCard title="Attendance Trend">
          <LineChart data={lineData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#AEB877"
              strokeWidth={3}
            />
          </LineChart>
        </ChartCard>

        {/* BAR CHART */}
        <ChartCard title="Risk Distribution">
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#D8E983" />
          </BarChart>
        </ChartCard>

        {/* PIE CHART */}
        <ChartCard title="Attendance Ratio">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        {/* NEW AREA CHART */}
        <ChartCard title="Weekly Engagement">
          <AreaChart data={areaData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="students"
              stroke="#A5C89E"
              fill="#D8E983"
            />
          </AreaChart>
        </ChartCard>

      </div>
    </section>
  );
}
