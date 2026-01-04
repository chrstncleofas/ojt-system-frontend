import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, Coffee, ChefHat } from 'lucide-react';
import { timelogService } from '../services/timelog.service';
import { TimeLogDTO, TimeLogsSummaryDTO, TimeLogResponseDTO } from '../dtos/timelog.dto';
import { TimeLogAction } from '../interfaces/timelog.interface';

export default function TimeLogs() {
  const [logs, setLogs] = useState<TimeLogsSummaryDTO | null>(null);
  const [todayLogs, setTodayLogs] = useState<TimeLogResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [clocking, setClocking] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTimeLogs();
    loadTodayLogs();
  }, []);

  const loadTimeLogs = async () => {
    try {
      const data = await timelogService.getTimeLogs();
      setLogs(data);
    } catch (err: any) {
      setError('Failed to load time logs');
    }
  };

  const loadTodayLogs = async () => {
    try {
      const data = await timelogService.getTodayLogs();
      setTodayLogs(data);
    } catch (err: any) {
      console.error('Failed to load today logs:', err);
    }
  };

  const handleClockAction = async (action: TimeLogAction) => {
    setClocking(true);
    setError('');

    try {
      await timelogService.clockInOut({ action });
      await loadTimeLogs();
      await loadTodayLogs();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Clock action failed');
    } finally {
      setClocking(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'IN':
        return <Play className="h-4 w-4 text-green-600" />;
      case 'OUT':
        return <Pause className="h-4 w-4 text-red-600" />;
      case 'LUNCH IN':
        return <ChefHat className="h-4 w-4 text-blue-600" />;
      case 'LUNCH OUT':
        return <Coffee className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'IN':
        return 'text-green-600';
      case 'OUT':
        return 'text-red-600';
      case 'LUNCH IN':
        return 'text-blue-600';
      case 'LUNCH OUT':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Time Keeping</h3>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Clock Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => handleClockAction('IN')}
              disabled={clocking}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <Play className="h-4 w-4 mr-2" />
              Time In
            </button>
            <button
              onClick={() => handleClockAction('LUNCH OUT')}
              disabled={clocking}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              <Coffee className="h-4 w-4 mr-2" />
              Lunch Out
            </button>
            <button
              onClick={() => handleClockAction('LUNCH IN')}
              disabled={clocking}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <ChefHat className="h-4 w-4 mr-2" />
              Lunch In
            </button>
            <button
              onClick={() => handleClockAction('OUT')}
              disabled={clocking}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <Pause className="h-4 w-4 mr-2" />
              Time Out
            </button>
          </div>

          {/* Today's Logs */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-3">Today's Activity</h4>
            <div className="space-y-2">
              {todayLogs.length === 0 ? (
                <p className="text-gray-500 text-sm">No time logs for today</p>
              ) : (
                todayLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center">
                      {getActionIcon(log.action)}
                      <span className={`ml-2 text-sm font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{formatTime(log.timestamp)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Time Summary */}
          {logs && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-md">
                <div className="text-sm text-green-600 font-medium">Total Hours</div>
                <div className="text-2xl font-bold text-green-800">
                  {logs.totalHours}h {logs.totalMinutes}m
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="text-sm text-blue-600 font-medium">Required Hours</div>
                <div className="text-2xl font-bold text-blue-800">{logs.requiredHours}h</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-md">
                <div className="text-sm text-orange-600 font-medium">Remaining Hours</div>
                <div className="text-2xl font-bold text-orange-800">
                  {logs.remainingHours}h {logs.remainingMinutes}m
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Time Logs History */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Time Logs History</h3>

          {logs?.logs && logs.logs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.logs.map((log, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getActionIcon(log.action)}
                          <span
                            className={`ml-2 text-sm font-medium ${getActionColor(log.action)}`}
                          >
                            {log.action}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No time logs found</p>
          )}
        </div>
      </div>
    </div>
  );
}
