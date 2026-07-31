<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
=======
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
>>>>>>> origin/feature/ezra
import api from "../api/api";

/* Columns that should be right-aligned (numbers, amounts, dates) */
const NUM_KEYS = new Set(["amount", "quantity", "reorder_level"]);

const ResourceManager = ({ endpoint, columns, fields, emptyRecord }) => {
    const [data, setData]               = useState([]);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState(null);
    const [showForm, setShowForm]       = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData]       = useState({ ...emptyRecord });
    const [fieldErrors, setFieldErrors] = useState({});
    const { token } = useAuth();

<<<<<<< HEAD
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

    const loadData = async ({ showLoading = false } = {}) => {
        try {
            if (showLoading) {
                setLoading(true);
            }
=======
    const formatDateForAPI = (d) => {
        if (!d) return null;
        if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
        try { const dt = new Date(d); if (!isNaN(dt)) return dt.toISOString().split("T")[0]; } catch {}
        return d;
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(endpoint);
            setData(res.data);
>>>>>>> origin/feature/ezra
            setError(null);

            const response = await api.get(endpoint);
            if (Array.isArray(response.data)) {
                setData(response.data);
            } else {
                setData([]);
                setError('Invalid data format received from server');
            }
        } catch (err) {
<<<<<<< HEAD
            if (err.response?.data?.includes && err.response.data.includes('<!doctype html>')) {
                setError('API endpoint not found. Please check your backend URL.');
            } else {
                setError(err.response?.data?.error || 'Failed to fetch data');
            }
=======
            setError(err.response?.data?.error || "Failed to load records.");
>>>>>>> origin/feature/ezra
        } finally {
            setLoading(false);
        }
    };

<<<<<<< HEAD
    useEffect(() => {
        if (!token) return;

        let isActive = true;

        const initialLoad = async () => {
            try {
                const response = await api.get(endpoint);

                if (!isActive) return;

                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    setData([]);
                    setError('Invalid data format received from server');
                }
            } catch (err) {
                if (!isActive) return;

                if (err.response?.data?.includes && err.response.data.includes('<!doctype html>')) {
                    setError('API endpoint not found. Please check your backend URL.');
                } else {
                    setError(err.response?.data?.error || 'Failed to fetch data');
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        void initialLoad();

        return () => {
            isActive = false;
        };
    }, [endpoint, token]);
=======
    useEffect(() => { fetchData(); }, [endpoint]);
>>>>>>> origin/feature/ezra

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});
<<<<<<< HEAD

        const errors = {};
        fields.forEach((field) => {
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
            fields.forEach((field) => {
                if (field.type === 'date' && formattedData[field.name]) {
                    formattedData[field.name] = formatDateForAPI(formattedData[field.name]);
                }
            });

            if (editingItem) {
                await api.put(`${endpoint}/${editingItem.id}`, formattedData);
            } else {
                await api.post(endpoint, formattedData);
            }

            await loadData({ showLoading: true });
            handleCloseForm();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save record');
=======
        const errs = {};
        fields.forEach(f => { if (f.required && !formData[f.name]) errs[f.name] = `${f.label} is required`; });
        if (Object.keys(errs).length) { setFieldErrors(errs); return; }
        try {
            const payload = { ...formData };
            fields.forEach(f => { if (f.type === "date" && payload[f.name]) payload[f.name] = formatDateForAPI(payload[f.name]); });
            if (editingItem) { await api.put(`${endpoint}/${editingItem.id}`, payload); }
            else             { await api.post(endpoint, payload); }
            await fetchData();
            handleClose();
        } catch (err) {
            setError(err.response?.data?.error || "Failed to save record.");
>>>>>>> origin/feature/ezra
        }
    };

    const handleDelete = async (id) => {
<<<<<<< HEAD
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            await api.delete(`${endpoint}/${id}`);
            await loadData({ showLoading: true });
        } catch {
            setError('Failed to delete record');
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
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
        }
=======
        if (!window.confirm("Delete this record?")) return;
        try { await api.delete(`${endpoint}/${id}`); await fetchData(); }
        catch { setError("Failed to delete record."); }
    };

    const handleEdit  = (item) => { setEditingItem(item); setFormData(item); setShowForm(true); };
    const handleClose = ()     => { setShowForm(false); setEditingItem(null); setFormData({ ...emptyRecord }); setFieldErrors({}); };
    const handleChange = (e)   => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: value }));
        if (fieldErrors[name]) setFieldErrors(p => ({ ...p, [name]: undefined }));
>>>>>>> origin/feature/ezra
    };

    /* ── Loading ── */
    if (loading) return (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
            <div className="spinner" style={{ margin: "0 auto" }} />
            <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#5B6B58" }}>Loading records…</p>
        </div>
    );

    return (
<<<<<<< HEAD
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
=======
        <>
            {/* Error banner */}
>>>>>>> origin/feature/ezra
            {error && (
                <div className="alert-error" style={{ marginBottom: "1.25rem" }}>
                    {error}
                    <button onClick={() => setError(null)} style={{ float: "right", background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: 600 }}>×</button>
                </div>
            )}

<<<<<<< HEAD
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Records</h2>
                <button onClick={() => setShowForm(true)} className="btn-primary">
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
=======
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid #e5e7eb" }}>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#243325" }}>Records</span>
                    <button className="btn-primary" onClick={() => setShowForm(true)}>+ Add New</button>
                </div>

                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                    <table className="data-table">
                        <thead>
>>>>>>> origin/feature/ezra
                            <tr>
                                {columns.map(col => (
                                    <th key={col.key} className={NUM_KEYS.has(col.key) ? "num" : ""}>{col.label}</th>
                                ))}
                                <th style={{ width: "120px" }}>Actions</th>
                            </tr>
<<<<<<< HEAD
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3 text-sm">
                                            {item[col.key] || '-'}
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 text-sm space-x-2">
                                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                                            Delete
                                        </button>
=======
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1} style={{ padding: "3rem 1rem", textAlign: "center", color: "#5B6B58" }}>
                                        <div style={{ fontSize: "0.875rem" }}>No records yet.</div>
                                        <div style={{ fontSize: "0.8125rem", marginTop: "0.25rem", color: "#9ca3af" }}>Click <strong>+ Add New</strong> to create the first one.</div>
>>>>>>> origin/feature/ezra
                                    </td>
                                </tr>
                            ) : data.map(item => (
                                <tr key={item.id}>
                                    {columns.map(col => (
                                        <td key={col.key} className={NUM_KEYS.has(col.key) ? "num" : ""}>
                                            {item[col.key] ?? "—"}
                                        </td>
                                    ))}
                                    <td>
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <button className="btn-ghost" style={{ padding: "0.25rem 0.625rem", fontSize: "0.8125rem" }} onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn-danger" style={{ padding: "0.25rem 0.625rem", fontSize: "0.8125rem" }} onClick={() => handleDelete(item.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Row count */}
                {data.length > 0 && (
                    <div style={{ padding: "0.625rem 1.5rem", borderTop: "1px solid #f3f4f6", fontSize: "0.75rem", color: "#5B6B58" }}>
                        {data.length} record{data.length !== 1 ? "s" : ""}
                    </div>
                )}
            </div>

<<<<<<< HEAD
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">{editingItem ? 'Edit Record' : 'Add New Record'}</h3>
                        <form onSubmit={handleSubmit}>
                            {fields.map((field) => (
                                <div key={field.name} className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
=======
            {/* ── Modal ── */}
            {showForm && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "1rem" }}>
                    <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e5e7eb", width: "100%", maxWidth: "440px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}>
                        {/* Modal header */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid #e5e7eb" }}>
                            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "#243325" }}>
                                {editingItem ? "Edit Record" : "New Record"}
                            </h3>
                            <button onClick={handleClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5B6B58", fontSize: "1.25rem", lineHeight: 1, padding: "0.25rem" }}>×</button>
                        </div>

                        {/* Modal body */}
                        <form onSubmit={handleSubmit} style={{ padding: "1.5rem" }}>
                            {fields.map(field => (
                                <div key={field.name} className="form-field">
                                    <label className="form-label">
>>>>>>> origin/feature/ezra
                                        {field.label}
                                        {field.required && <span style={{ color: "#dc2626", marginLeft: "2px" }}>*</span>}
                                    </label>

<<<<<<< HEAD
                                    {field.type === 'select' ? (
                                        <select
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-harvest-500 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="">Select...</option>
                                            {field.options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'textarea' ? (
                                        <textarea
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-harvest-500 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                                            rows="3"
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-harvest-500 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                                            required={field.required}
                                        />
=======
                                    {field.type === "select" ? (
                                        <select name={field.name} value={formData[field.name] || ""} onChange={handleChange}
                                            className={`form-input${fieldErrors[field.name] ? " error" : ""}`}>
                                            <option value="">Select…</option>
                                            {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    ) : field.type === "textarea" ? (
                                        <textarea name={field.name} value={formData[field.name] || ""} onChange={handleChange} rows={3}
                                            className={`form-input${fieldErrors[field.name] ? " error" : ""}`} />
                                    ) : (
                                        <input type={field.type} name={field.name} value={formData[field.name] || ""} onChange={handleChange}
                                            className={`form-input${fieldErrors[field.name] ? " error" : ""}`} required={field.required} />
>>>>>>> origin/feature/ezra
                                    )}

                                    {fieldErrors[field.name] && <p className="form-error">{fieldErrors[field.name]}</p>}
                                </div>
                            ))}

<<<<<<< HEAD
                            <div className="flex gap-2">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingItem ? 'Update' : 'Create'}
                                </button>
                                <button type="button" onClick={handleCloseForm} className="btn-ghost">
=======
                            {/* Modal footer */}
                            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #e5e7eb" }}>
                                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                                    {editingItem ? "Save changes" : "Create record"}
                                </button>
                                <button type="button" className="btn-secondary" onClick={handleClose} style={{ flex: 1, justifyContent: "center" }}>
>>>>>>> origin/feature/ezra
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResourceManager;
