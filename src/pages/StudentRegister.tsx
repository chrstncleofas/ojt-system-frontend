import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Hash,
  Lock,
  AlertCircle,
  CheckCircle,
  UserPlus,
  MapPin,
  Building,
} from 'lucide-react';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentService } from '../services/student.service';
import { StudentRegistrationDTO } from '../dtos/student.dto';

export default function StudentRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<StudentRegistrationDTO>({
    pendingStudentId: '',
    pendingFirstname: '',
    pendingMiddlename: '',
    pendingLastname: '',
    pendingPrefix: '',
    pendingEmail: '',
    pendingAddress: '',
    pendingNumber: '',
    pendingCourse: '',
    pendingYear: '',
    pendingUsername: '',
    pendingPassword: '',
    nameOfSupervisor: '',
    hteAddress: '',
    contactNumber: '',
    department: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  const formatStudentId = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format based on length
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}-${digits.slice(2, 3)}-${digits.slice(3, 7)}`;
    }
  };

  const isStudentIdValid = (studentId: string) => {
    const studentIdRegex = /^\d{2}-\d{1,4}$|^\d{2}-\d{1}-\d{4}$/;
    return studentIdRegex.test(studentId);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.pendingStudentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    if (!formData.pendingFirstname.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.pendingLastname.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.pendingEmail.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.pendingAddress.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.pendingCourse.trim()) {
      newErrors.course = 'Course is required';
    }
    if (!formData.pendingPassword.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.pendingEmail && !emailRegex.test(formData.pendingEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation (11 digits starting with 09)
    const phoneRegex = /^09\d{9}$/;
    if (formData.pendingNumber && !phoneRegex.test(formData.pendingNumber)) {
      newErrors.phoneNumber = 'Phone number must be 11 digits starting with 09';
    }

    // Contact number validation (11 digits starting with 09)
    if (formData.contactNumber && !phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 11 digits starting with 09';
    }

    // Password strength
    if (formData.pendingPassword && formData.pendingPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Confirm password
    if (formData.pendingPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Student ID format validation
    const studentIdRegex = /^\d{2}-\d{1,4}$|^\d{2}-\d{1}-\d{4}$/;
    if (formData.pendingStudentId && !studentIdRegex.test(formData.pendingStudentId)) {
      newErrors.studentId = 'Student ID format: YY-NNNN or YY-N-NNNN';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess('');

    try {
      // Ensure pendingUsername is set; use email as a sensible default
      const payload = { ...formData };
      if (!payload.pendingUsername || payload.pendingUsername.trim() === '') {
        payload.pendingUsername = payload.pendingEmail || payload.pendingStudentId || '';
      }
      await studentService.register(payload);
      setSuccess('Registration submitted successfully! Please wait for admin approval.');
      setTimeout(() => {
        navigate('/login', {
          state: {
            message: 'Registration submitted successfully. Please wait for admin approval.',
          },
        });
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Map new field names to old ones
    const fieldMapping: Record<string, string> = {
      studentId: 'pendingStudentId',
      firstName: 'pendingFirstname',
      middleName: 'pendingMiddlename',
      lastName: 'pendingLastname',
      email: 'pendingEmail',
      phoneNumber: 'pendingNumber',
      address: 'pendingAddress',
      course: 'pendingCourse',
      year: 'pendingYear',
      password: 'pendingPassword',
    };

    const actualFieldName = fieldMapping[name] || name;
    // For phone inputs, keep only digits and limit to 11
    let newValue = value;
    if (name === 'phoneNumber' || name === 'contactNumber') {
      newValue = value.replace(/\D/g, '').slice(0, 11);
    }

    if (name === 'studentId') {
      const formatted = formatStudentId(value);
      setFormData((prev) => ({
        ...prev,
        [actualFieldName]: formatted,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [actualFieldName]: newValue,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-2 sm:px-4 lg:px-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join Our OJT Program</h1>
          <p className="text-lg text-gray-600">Create your account and start your journey</p>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {errors.general && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-red-600 text-xs">!</span>
            </div>
            <p className="text-red-800 font-medium">{errors.general}</p>
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student ID and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Student ID Field */}
                <div>
                  <label
                    htmlFor="studentId"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Student ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="studentId"
                      name="studentId"
                      type="text"
                      required
                      value={formData.pendingStudentId}
                      onChange={handleChange}
                      placeholder="e.g., 18-02132 or 22-1-02322"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.studentId
                          ? 'border-red-300 focus:ring-red-500'
                          : isStudentIdValid(formData.pendingStudentId) &&
                            formData.pendingStudentId.trim()
                          ? 'border-green-300 focus:ring-green-500'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.studentId && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.studentId}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.pendingEmail}
                      onChange={handleChange}
                      placeholder="your.email@university.edu"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* First Name, Middle Name and Last Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First Name Field */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.pendingFirstname}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Middle Name Field */}
                <div>
                  <label
                    htmlFor="middleName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Middle Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="middleName"
                      name="middleName"
                      type="text"
                      value={formData.pendingMiddlename}
                      onChange={handleChange}
                      placeholder="Enter your middle name (optional)"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.middleName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.middleName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.middleName}
                    </p>
                  )}
                </div>

                {/* Last Name Field */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.pendingLastname}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number and Address Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone Number Field */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={11}
                      required
                      value={formData.pendingNumber}
                      onChange={handleChange}
                      placeholder="09171274229"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.phoneNumber ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Address Field */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={formData.pendingAddress}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.address ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Course and Year Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Field */}
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Course
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="course"
                      name="course"
                      required
                      value={formData.pendingCourse}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.course ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your course</option>
                      <option value="BS Information Technology">BS Information Technology</option>
                      <option value="BS Computer Science">BS Computer Science</option>
                      <option value="BS Information Systems">BS Information Systems</option>
                      <option value="BS Software Engineering">BS Software Engineering</option>
                    </select>
                  </div>
                  {errors.course && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.course}
                    </p>
                  )}
                </div>

                {/* Year Field */}
                <div>
                  <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
                    Year Level
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="year"
                      name="year"
                      value={formData.pendingYear}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.year ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select year level</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                    </select>
                  </div>
                  {errors.year && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.year}
                    </p>
                  )}
                </div>
              </div>

              {/* Name of Supervisor and HTE Address Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name of Supervisor Field */}
                <div>
                  <label
                    htmlFor="nameOfSupervisor"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name of Supervisor
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="nameOfSupervisor"
                      name="nameOfSupervisor"
                      type="text"
                      value={formData.nameOfSupervisor}
                      onChange={handleChange}
                      placeholder="Enter supervisor's name"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.nameOfSupervisor
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.nameOfSupervisor && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.nameOfSupervisor}
                    </p>
                  )}
                </div>

                {/* HTE Address Field */}
                <div>
                  <label
                    htmlFor="hteAddress"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    HTE Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="hteAddress"
                      name="hteAddress"
                      type="text"
                      value={formData.hteAddress}
                      onChange={handleChange}
                      placeholder="Enter HTE company address"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.hteAddress ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.hteAddress && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.hteAddress}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Number and Department Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Number Field */}
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Contact Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={11}
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.contactNumber
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.contactNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.contactNumber}
                    </p>
                  )}
                </div>

                {/* Department Field */}
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Department
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="department"
                      name="department"
                      type="text"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Enter department"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.department ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.department}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Fields - Full Width */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.pendingPassword}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Confirm your password"
                      className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
