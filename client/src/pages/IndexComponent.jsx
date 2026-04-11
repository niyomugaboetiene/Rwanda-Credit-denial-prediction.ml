import axios from "axios";
import React, { useEffect, useState } from "react";

export const PredictingComponent = () => {
  const [provinceList, setProvinceList] = useState(null);
  const [districtList, setDistrictList] = useState(null);
  const [s10aq3_converted, setS10aq3_converted] = useState(0);
  const [ur_converted, setUr_converted] = useState("0");
  const [poverty_converted, setPoverty_converted] = useState("0");
  const [quintile_converted, setQuintile_converted] = useState("0");
  const [district, setSelectedDistrict] = useState("bugesera");
  const [province, setSelectedProvince] = useState("city of kigali");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const GetProvinces = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5000/get_province");

      if (!res.data.province) {
        setMessage("No province found");
      }

      setProvinceList(res.data.province);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load province");
    }
  };

  const GetDistrict = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5000/get_district");

      if (!res.data.district) {
        setMessage("No District found");
      }

      setDistrictList(res.data.district);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load province");
    }
  };

  useEffect(() => {
    GetProvinces();
  }, []);

  useEffect(() => {
    GetDistrict();
  }, []);

  const HandlePrediction = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:5000/predict_credit_denial",
        {
          district,
          province,
          s10aq3_converted: Number(s10aq3_converted),
          ur_converted: Number(ur_converted),
          poverty_converted: Number(poverty_converted),
          quintile_converted: Number(quintile_converted),
        }
      );

      setPrediction(res.data.result);
      setLoading(false);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to predict");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="flex gap-8 max-w-6xl mx-auto">
        {/* Left Column - Form */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
              🇷🇼 Rwanda Credit Denial
            </h1>
            <p className="text-gray-600 text-center text-lg">
              AI-Based Credit Eligibility Prediction
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Error/Message Alert */}
            {message && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">{message}</p>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Province Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Your Province
                </label>
                <select
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 font-medium transition hover:border-gray-400"
                >
                  {provinceList?.map((prov, index) => (
                    <option value={`${prov}`} key={index}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Your District
                </label>
                <select
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 font-medium transition hover:border-gray-400"
                >
                  {districtList?.map((dist, idx) => (
                    <option value={`${dist}`} key={idx}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Previous Credit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Have You Taken Credit Before?
                </label>
                <select
                  onChange={(e) => setS10aq3_converted(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 font-medium transition hover:border-gray-400"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Urban/Rural */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Area Type
                </label>
                <select
                  onChange={(e) => setUr_converted(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 font-medium transition hover:border-gray-400"
                >
                  <option value="0">Rural</option>
                  <option value="1">Urban</option>
                </select>
              </div>

              {/* Poverty Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Poverty Category
                </label>
                <select
                  onChange={(e) => setPoverty_converted(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 font-medium transition hover:border-gray-400"
                >
                  <option value="2">Non Poor</option>
                  <option value="1">Moderately Poor</option>
                  <option value="0">Severely Poor</option>
                </select>
              </div>

              {/* Quintile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Wealth Quintile
                </label>
                <select
                  onChange={(e) => setQuintile_converted(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 font-medium transition hover:border-gray-400"
                >
                  <option value="0">Poor</option>
                  <option value="0.5">Poor/Mid</option>
                  <option value="1">Mid</option>
                  <option value="1.5">Mid/Upper</option>
                  <option value="2">Upper</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                onClick={HandlePrediction}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition duration-200 transform mt-8 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Get Prediction Result"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Result */}
        <div className="w-96 sticky top-12 h-fit">
          {prediction !== null && prediction !== "" ? (
            <div className="bg-white rounded-lg shadow-xl p-8 animate-fadeIn">
              <div
                className={`text-center py-12 px-6 rounded-lg ${
                  prediction === 1
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300"
                    : "bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300"
                }`}
              >
                <div className="mb-4">
                  <div
                    className={`text-7xl font-bold mb-4 ${
                      prediction === 1 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {prediction === 1 ? "✓" : "✗"}
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-3 text-gray-800">
                  {prediction === 1 ? "APPROVED" : "DENIED"}
                </h2>

                <p
                  className={`text-base font-semibold mb-6 ${
                    prediction === 1 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {prediction === 1
                    ? "Congratulations! You are eligible for credit."
                    : "Unfortunately, you are not eligible for credit at this time."}
                </p>

                <div
                  className={`py-4 px-4 rounded-lg ${
                    prediction === 1
                      ? "bg-green-100 border border-green-300"
                      : "bg-red-100 border border-red-300"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      prediction === 1 ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {prediction === 1
                      ? "Please proceed to the next step"
                      : "Please review your information"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-center py-12 px-6">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Your Result
                </h3>
                <p className="text-gray-600 text-sm">
                  Fill out the form and click "Get Prediction Result" to see your credit eligibility status.
                </p>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-blue-50 rounded-lg shadow-lg p-6 mt-6 border-l-4 border-blue-600">
            <h4 className="font-bold text-blue-900 mb-3">ℹ️ How it works</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>✓ Enter your location details</li>
              <li>✓ Provide financial information</li>
              <li>✓ Get instant credit prediction</li>
              <li>✓ AI-powered accuracy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add animation to CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        @media (max-width: 1200px) {
          .flex {
            flex-direction: column;
          }
          .w-96 {
            width: 100%;
          }
          .sticky {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};