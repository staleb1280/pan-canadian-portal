'use client';

import React, { useState } from 'react';

interface SubmissionFormData {
  clientName: string;
  firmName: string;
  email: string;
  liquidCapital: number;
  targetProvince: string;
  rankedMunicipality: string;
}

export default function LawyerSubmissionForm() {
  const [formData, setFormData] = useState<SubmissionFormData>({
    clientName: '',
    firmName: '',
    email: '',
    liquidCapital: 300000,
    targetProvince: 'Alberta',
    rankedMunicipality: 'Edmonton Metropolitan Region',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Dynamic eligibility checks based on capital and region
  const getEligibilityMetrics = (capital: number, province: string) => {
    let minCapital = 200000;
    let streamName = 'PNP Entrepreneur / Rural Renewal Stream';

    if (province === 'Alberta') {
      minCapital = 200000;
      streamName = 'Alberta Advantage Immigration Program (AAIP) / Rural Renewal';
    } else if (province === 'British Columbia') {
      minCapital = 300000;
      streamName = 'BC PNP Entrepreneur Immigration';
    }

    const isEligible = capital >= minCapital;
    return { minCapital, streamName, isEligible };
  };

  const { minCapital, streamName, isEligible } = getEligibilityMetrics(
    formData.liquidCapital,
    formData.targetProvince
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'liquidCapital' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEligible) {
      alert('Client liquid capital does not meet the minimum threshold for this stream.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API submission call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Client intake file successfully submitted and verified against regional corridors.');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 my-8">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">RCIC / Lawyer Client File Submission</h2>
        <p className="text-sm text-gray-600 mt-1">
          Submit verified investor profiles with real-time corridor ranking and capital threshold validation.
        </p>
      </div>

      {successMessage ? (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center font-medium">
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Full Name</label>
              <input
                type="text"
                name="clientName"
                required
                value={formData.clientName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Law Firm / RCIC Practice Name</label>
              <input
                type="text"
                name="firmName"
                required
                value={formData.firmName}
                onChange={handleChange}
                placeholder="e.g. Apex Immigration Law"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Contact Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="lawyer@practice.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investor Liquid Capital (CAD)
              </label>
              <input
                type="number"
                name="liquidCapital"
                step="10000"
                min="50000"
                required
                value={formData.liquidCapital}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Province</label>
              <select
                name="targetProvince"
                value={formData.targetProvince}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Ontario">Ontario</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ranked Municipal Destination
            </label>
            <select
              name="rankedMunicipality"
              value={formData.rankedMunicipality}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="Edmonton Metropolitan Region">1. Edmonton Metropolitan Region</option>
              <option value="Calgary Regional Corridor">2. Calgary Regional Corridor</option>
              <option value="Central Alberta Rural Hub">3. Central Alberta Rural Hub</option>
            </select>
          </div>

          {/* Real-time Dynamic Eligibility Feedback Box */}
          <div className={`p-4 rounded-lg border ${isSubmitting ? 'bg-blue-50 border-blue-200' : isEligible ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
            <h4 className={`text-sm font-semibold mb-1 ${isEligible ? 'text-emerald-800' : 'text-amber-800'}`}>
              Real-Time Dynamic Eligibility Feedback
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              Path Alignment: <span className="font-medium text-gray-900">{streamName}</span>
            </p>
            <div className="flex justify-between text-xs text-gray-700">
              <span>Minimum Required Capital: <strong>${minCapital.toLocaleString()} CAD</strong></span>
              <span>Status: <strong className={isEligible ? 'text-emerald-600' : 'text-red-600'}>{isEligible ? 'Eligible ✓' : 'Below Threshold ✕'}</strong></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isEligible || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
              !isEligible || isSubmitting
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md'
            }`}
          >
            {isSubmitting ? 'Processing Submission...' : 'Submit Verified Client File'}
          </button>
        </form>
      )}
    </div>
  );
}