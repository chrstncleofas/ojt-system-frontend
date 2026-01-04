import React, { useState, useEffect } from 'react';
import { submissionService } from '../services/submission.service';
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import {
  SubmitRequirementDTO,
  SubmittedRequirementDTO,
  AvailableRequirementDTO,
} from '../dtos/submission.dto';

export default function Submissions() {
  const [availableRequirements, setAvailableRequirements] = useState<AvailableRequirementDTO[]>([]);
  const [submittedRequirements, setSubmittedRequirements] = useState<SubmittedRequirementDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [available, submitted] = await Promise.all([
        submissionService.getAvailableRequirements(),
        submissionService.getSubmittedRequirements(),
      ]);
      setAvailableRequirements(available);
      setSubmittedRequirements(submitted);
    } catch (err: any) {
      setError('Failed to load submission data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedRequirement || !selectedFile) {
      setError('Please select a requirement and file');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // In a real app, you'd upload the file first and get the URL
      // For now, we'll use a placeholder
      const submitData: SubmitRequirementDTO = {
        nameOfDocs: selectedRequirement,
      };

      await submissionService.submitRequirement(submitData, selectedFile);
      setSelectedFile(null);
      setSelectedRequirement('');
      await loadData(); // Refresh data
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'revision':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'revision':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Submit Requirements</h3>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Requirement
              </label>
              <select
                value={selectedRequirement}
                onChange={(e) => setSelectedRequirement(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Choose a requirement...</option>
                {availableRequirements.map((req) => (
                  <option key={req.id} value={req.nameOfFile}>
                    {req.nameOfFile}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                  {selectedFile && (
                    <p className="text-sm text-green-600">Selected: {selectedFile.name}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || !selectedRequirement || !selectedFile}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Requirement'}
            </button>
          </div>
        </div>
      </div>

      {/* Submitted Requirements */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">My Submissions</h3>

          {submittedRequirements.length === 0 ? (
            <p className="text-gray-500">No submissions yet</p>
          ) : (
            <div className="space-y-4">
              {submittedRequirements.map((submission) => (
                <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {submission.nameOfDocs}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Submitted: {new Date(submission.submission_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Due: {new Date(submission.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Status: </span>
                      <span className={`text-sm font-medium ${getStatusColor('pending')}`}>
                        Pending Review
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Available Requirements */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Available Requirements
          </h3>

          {availableRequirements.length === 0 ? (
            <p className="text-gray-500">No requirements available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableRequirements.map((req) => (
                <div key={req.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{req.nameOfFile}</h4>
                      <p className="text-sm text-gray-500">
                        Uploaded: {new Date(req.upload_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
