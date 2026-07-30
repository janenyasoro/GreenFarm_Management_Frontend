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

    // Format date for API (YYYY-MM-DD)
    const formatDateForAPI = (dateString) => {
        if (!dateString) return null;

        // If it's already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString;
        }

        // Try to parse the date
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
            console.log(`📤 Fetching data from: ${endpoint}`);
            const response = await api.get(endpoint);
            console.log(`✅ Data fetched:`, response.data);
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error(`❌ Failed to fetch data:`, err);
            console.error(`❌ Error response:`, err.response?.data);
            setError(err.response?.data?.error || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});

        // Validate required fields
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
            // Format data for API
            const formattedData = { ...formData };

            // Format date fields
            fields.forEach(field => {
                if (field.type === 'date' && formattedData[field.name]) {
                    formattedData[field.name] = formatDateForAPI(formattedData[field.name]);
                }
            });

            console.log('📤 Sending formatted data:', formattedData);

            if (editingItem) {
                await api.put(`${endpoint}/${editingItem.id}`, formattedData);
                console.log(`✅ Record updated successfully`);
            } else {
                const response = await api.post(endpoint, formattedData);
                console.log(`✅ Record created successfully:`, response.data);
            }

            await fetchData();
            handleCloseForm();
        } catch (err) {
            console.error(`❌ Failed to save record:`, err);
            console.error(`❌ Error response:`, err.response?.data);
            setError(err.response?.data?.error || "Failed to save record");
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            console.log(`📤 Deleting record: ${id}`);
            await api.delete(`${endpoint}/${id}`);
            console.log(`✅ Record deleted successfully`);
            await fetchData();
        } catch (err) {
            console.error(`❌ Failed to delete record:`, err);
            setError("Failed to delete record");
        }
    };

    // Handle edit
    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData(item);
        setShowForm(true);
    };

    // Handle close form
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setFormData({ ...emptyRecord });
        setFieldErrors({});
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
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
        <div className="card">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="card-title">Records</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                >
                    + Add New
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-50">
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
                                <tr key={item.id} className="border-t hover:bg-gray-50">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3 text-sm">
                                            {item[col.key] || '-'}
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 text-sm space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-harvest-600 hover:text-harvest-800"
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

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                                            className={`w-full border rounded px-3 py-2 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select...</option>
                                            {field.options.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === "textarea" ? (
                                        <textarea
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className={`w-full border rounded px-3 py-2 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            rows="3"
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className={`w-full border rounded px-3 py-2 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            required={field.required}
                                        />
                                    )}

                                    {fieldErrors[field.name] && (
                                        <p className="text-red-500 text-sm mt-1">{fieldErrors[field.name]}</p>
                                    )}
                                </div>
                            ))}

                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
                                >
                                    {editingItem ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
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