"use client";

import React, { useEffect, useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// Types for backend data
type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

type StatisticsData = {
  totalReservations: number;
  revenue: number;
  tablesInUse: number;
  topMenuItems: MenuItem[];
};

const API_URL = "http://localhost:5000/api/statistics";

const StatisticsPage: React.FC = () => {
  const [stats, setStats] = useState<StatisticsData>({
    totalReservations: 0,
    revenue: 0,
    tablesInUse: 0,
    topMenuItems: [],
  });

  // Fetch data from backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(err => console.error("Statistics fetch error:", err));
  }, []);

  // Animated counters (optional)
  const [counts, setCounts] = useState({
    reservations: 0,
    revenue: 0,
    tablesInUse: 0,
  });

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCounts({
          reservations: stats.totalReservations,
          revenue: stats.revenue,
          tablesInUse: stats.tablesInUse,
        });
        clearInterval(timer);
        return;
      }
      setCounts({
        reservations: Math.round(stats.totalReservations * (step / steps)),
        revenue: Math.round(stats.revenue * (step / steps)),
        tablesInUse: Math.round(stats.tablesInUse * (step / steps)),
      });
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stats]);

  // Line chart – example data (can replace with dynamic if available)
  const lineData = {
    labels: Array.from({ length: 30 }, (_, i) =>
      format(subDays(new Date(), 29 - i), 'MMM d')
    ),
    datasets: [
      {
        label: 'Reservations',
        data: Array(30).fill(stats.totalReservations / 30), // example
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Doughnut – Table types (example, replace with real if backend provides)
  const tableData = {
    labels: ['Tables in use', 'Available Tables'],
    datasets: [
      {
        data: [stats.tablesInUse, 50 - stats.tablesInUse], // 50 = total tables example
        backgroundColor: ['#f97316', '#fdba74'],
        borderWidth: 0,
      },
    ],
  };

  // Bar – Top menu items
  const menuData = {
    labels: stats.topMenuItems.map(item => item.name),
    datasets: [
      {
        label: 'Orders',
        data: stats.topMenuItems.map(item => item.price), // price as example
        backgroundColor: '#f97316',
        borderRadius: 8,
        barThickness: 20,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
        <h1 className="text-4xl font-bold">Main Dashboard</h1>
        <p className="text-muted-foreground mt-2">Restaurant Statistics • November 2025</p>
      </motion.div>

      {/* Top small cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { icon:"📊", label: "Total Reservations", value: counts.reservations },
          { icon: "💰", label: "Revenue", value: `$${counts.revenue.toLocaleString()}` },
          { icon: "🪑" , label: "Tables Used", value: counts.tablesInUse },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-5 text-center hover:border-primary/50 transition-all duration-300"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-xl font-bold text-primary">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold mb-6 text-primary text-center">Table Occupancy</h3>
          <div className="w-64 h-64 mx-auto">
            <Doughnut
              data={tableData}
              options={{
                cutout: '78%',
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
              }}
            />
          </div>
        </motion.div>

        {/* Line chart */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-primary">Reservations Trend</h3>
          <Line data={lineData} options={{ plugins: { legend: { display: false } } }} />
        </motion.div>

        {/* Top menu items */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold mb-6 text-primary">Top Menu Items</h3>
          <Bar data={menuData} options={{ indexAxis: 'y', plugins: { legend: { display: false } } }} />
        </motion.div>
      </div>
    </div>
  );
};

export default StatisticsPage;
