import React from 'react';

export default function Announcements() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage announcements</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Announcements page - Coming soon</p>
      </div>
    </div>
  );
}
