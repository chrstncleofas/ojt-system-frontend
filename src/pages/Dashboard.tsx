import React from 'react';
import { Users, Clock, FileText, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      name: 'Total Students',
      value: '48',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
      trend: 'up',
    },
    {
      name: 'Active Today',
      value: '32',
      change: '+8%',
      icon: Clock,
      color: 'bg-green-500',
      trend: 'up',
    },
    {
      name: 'Pending Submissions',
      value: '15',
      change: '-5%',
      icon: FileText,
      color: 'bg-yellow-500',
      trend: 'down',
    },
    {
      name: 'Completion Rate',
      value: '87%',
      change: '+3%',
      icon: TrendingUp,
      color: 'bg-purple-500',
      trend: 'up',
    },
  ];

  const recentActivities = [
    { student: 'Juan Dela Cruz', action: 'Clocked in', time: '8:30 AM', type: 'timelog' },
    {
      student: 'Maria Santos',
      action: 'Submitted Weekly Report',
      time: '10:15 AM',
      type: 'submission',
    },
    { student: 'Pedro Reyes', action: 'Clocked out', time: '5:00 PM', type: 'timelog' },
    { student: 'Ana Garcia', action: 'Submitted DTR', time: 'Yesterday', type: 'submission' },
  ];

  const upcomingDeadlines = [
    { title: 'Monthly Report Submission', date: 'Jan 15, 2026', days: 12 },
    { title: 'Performance Evaluation', date: 'Jan 20, 2026', days: 17 },
    { title: 'Final Presentation', date: 'Feb 1, 2026', days: 29 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p
                    className={`mt-2 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.student}</p>
                    <p className="mt-1 text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all activities →
            </button>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{deadline.date}</p>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {deadline.days} days
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-amber-800">Attention Required</h3>
            <p className="mt-1 text-sm text-amber-700">
              15 students have pending document submissions. Please review and approve before the
              deadline.
            </p>
            <button className="mt-3 text-sm font-medium text-amber-800 hover:text-amber-900">
              Review submissions →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
