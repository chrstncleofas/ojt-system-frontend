import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const students = [
    {
      id: '2024-001',
      name: 'Juan Dela Cruz',
      course: 'BSIT',
      year: '4th',
      status: 'Active',
      hours: 120,
    },
    {
      id: '2024-002',
      name: 'Maria Santos',
      course: 'BSCS',
      year: '4th',
      status: 'Active',
      hours: 150,
    },
    {
      id: '2024-003',
      name: 'Pedro Reyes',
      course: 'BSIT',
      year: '3rd',
      status: 'Inactive',
      hours: 80,
    },
    {
      id: '2024-004',
      name: 'Ana Garcia',
      course: 'BSIT',
      year: '4th',
      status: 'Active',
      hours: 200,
    },
    {
      id: '2024-005',
      name: 'Jose Lopez',
      course: 'BSCS',
      year: '3rd',
      status: 'Pending',
      hours: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all OJT students and their information
          </p>
        </div>
        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.hours} hrs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="p-1 text-primary-600 hover:text-primary-900 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-blue-600 hover:text-blue-900 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-900 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Students Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-500">{student.id}</p>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  student.status
                )}`}
              >
                {student.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <span className="text-gray-500">Course:</span>
                <span className="ml-1 text-gray-900">{student.course}</span>
              </div>
              <div>
                <span className="text-gray-500">Year:</span>
                <span className="ml-1 text-gray-900">{student.year}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Hours:</span>
                <span className="ml-1 text-gray-900">{student.hours} hrs</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-3 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm">View</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span>{' '}
          of <span className="font-medium">48</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
