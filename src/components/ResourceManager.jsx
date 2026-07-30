// src/components/ResourceManager.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

const ResourceManager = ({ endpoint, columns, fields, emptyRecord }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ ...emptyRecord });
    const [fieldErrors, setFieldErrors] = useState({});
    const { token } = useAuth();

    // Format date for API
    const formatDateForAPI = (dateString) => {
        if (!dateString) return null;
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString;
        }
        try {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }
        } catch (e) {
            console.error('Date parsing error:', e);
        }
        return dateString;
    };

    // Fetch data
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log(`📤 Fetching data from: ${endpoint}`);

            const response = await api.get(endpoint);
            console.log(`✅ Data fetched:`, response.data);

            // Check if response is an array
            if (Array.isArray(response.data)) {
                setData(response.data);
            } else {
                console.error('❌ Data is not an array:', response.data);
                setData([]);
                setError('Invalid data format received from server');
            }
        } catch (err) {
            console.error(`❌ Fetch error:`, err);
            // Check if it's an HTML response (like Vite's 404 page)
            if (err.response?.data?.includes && err.response.data.includes('<!doctype html>')) {
                setError('API endpoint not found. Please check your backend URL.');
            } else {
                setError(err.response?.data?.error || "Failed to fetch data");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [endpoint, token]);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});

        const errors = {};
        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                errors[field.name] = `${field.label} is required`;
            }
        });

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        try {
            const formattedData = { ...formData };
            fields.forEach(field => {
                if (field.type === 'date' && formattedData[field.name]) {
                    formattedData[field.name] = formatDateForAPI(formattedData[field.name]);
                }
            });

            console.log('📤 Sending:', formattedData);

            if (editingItem) {
                await api.put(`${endpoint}/${editingItem.id}`, formattedData);
            } else {
                await api.post(endpoint, formattedData);
            }

            await fetchData();
            handleCloseForm();
        } catch (err) {
            console.error(`❌ Save error:`, err);
            setError(err.response?.data?.error || "Failed to save record");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            await api.delete(`${endpoint}/${id}`);
            await fetchData();
        } catch (err) {
            console.error(`❌ Delete error:`, err);
            setError("Failed to delete record");
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData(item);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setFormData({ ...emptyRecord });
        setFieldErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harvest-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Records</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                >
                    + Add New
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            {columns.map((col) => (
                                <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center py-8 text-gray-500">
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3 text-sm">
                                            {item[col.key] || '-'}
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 text-sm space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">
                            {editingItem ? "Edit Record" : "Add New Record"}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            {fields.map((field) => (
                                <div key={field.name} className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>

                                    {field.type === "select" ? (
                                        <select
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-harvest-500 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select...</option>
                                            {field.options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : field.type === "textarea" ? (
                                        <textarea
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-harvest-500 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            rows="3"
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-harvest-500 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            required={field.required}
                                        />
                                    )}

                                    {fieldErrors[field.name] && (
                                        <p className="text-red-500 text-sm mt-1">{fieldErrors[field.name]}</p>
                                    )}
                                </div>
                            ))}

                            <div className="flex gap-2">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingItem ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="btn-ghost"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceManager;