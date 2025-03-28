"use client";
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Activity, Calendar, UserPlus, Users, TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface DashboardStats {
  totalUsers: number;
  newUsers: number;
  totalBookings: number;
  todayBookings: number;
  userGrowth: string;
  bookingGrowth: string;
}


const HomeE = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      change: stats?.userGrowth || "0%",
      trend: "up",
      icon: Users,
      description: "from last month",
      color: "text-blue-500"
    },
    {
      title: "New Users",
      value: stats?.newUsers || 0,
      change: stats?.userGrowth || "0%",
      trend: "up",
      icon: UserPlus,
      description: "from last week",
      color: "text-green-500"
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      change: stats?.bookingGrowth || "0%",
      trend: "up",
      icon: Activity,
      description: "from yesterday",
      color: "text-purple-500"
    },
    {
      title: "Bookings Today",
      value: stats?.todayBookings || 0,
      change: stats?.bookingGrowth || "0%",
      trend: "up",
      icon: Calendar,
      description: "from yesterday",
      color: "text-orange-500"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your rental business today.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">{card.value}</div>
                  <div className={`flex items-center gap-1 text-sm ${
                    card.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {card.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{card.change}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New booking received</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button 
                className="w-full py-2 px-4 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-colors"
              >
                Add New Car
              </button>
              <button className="w-full py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                View Reports
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomeE