import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
    { key: "record_type",       label: "Record Type"     },
    { key: "date_administered", label: "Date"            },
    { key: "administered_by",   label: "Administered By" },
    { key: "notes",             label: "Notes"           },
];

const fields = [
    { name: "record_type",       label: "Record Type",      type: "select", options: ["Vaccination", "Treatment", "Checkup", "Surgery", "Medication", "Other"] },
    { name: "date_administered", label: "Date Administered", type: "date"   },
    { name: "administered_by",   label: "Administered By",   type: "text"   },
    { name: "notes",             label: "Notes",             type: "textarea" },
];

const emptyRecord = { record_type: "", date_administered: "", administered_by: "", notes: "" };

export default function HealthRecords() {
    const { livestock_id } = useParams();
    const navigate = useNavigate();
    const [animal, setAnimal]   = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (livestock_id) fetchAnimalDetails(livestock_id);
    }, [livestock_id]);

    const fetchAnimalDetails = async (id) => {
        try {
            const res = await fetch(`/api/livestock/${id}`);
            if (res.ok) setAnimal(await res.json());
        } catch (err) {
            console.error("Error fetching animal details:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <Layout title="Health Records">
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
                <div className="spinner" style={{ margin: "0 auto" }} />
                <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#5B6B58" }}>Loading…</p>
            </div>
        </Layout>
    );

    return (
        <Layout title={`Health Records — ${animal?.tag_number || 'Animal'}`}>
            {/* Context banner */}
            <div style={{ backgroundColor: "#E7F0DD", border: "1px solid #c6ddb0", borderRadius: "6px", padding: "0.875rem 1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#243325" }}>
                        {animal?.tag_number}
                    </span>
                    {animal?.animal_type && (
                        <span style={{ fontSize: "0.875rem", color: "#5B6B58", marginLeft: "0.5rem" }}>
                            · {animal.animal_type}
                        </span>
                    )}
                </div>
                <button onClick={() => navigate('/livestock')} className="btn-ghost"
                    style={{ fontSize: "0.8125rem", padding: "0.25rem 0.625rem" }}>
                    ← Back to Livestock
                </button>
            </div>

            <ResourceManager
                endpoint={`/livestock/${livestock_id}/health-records`}
                columns={columns}
                fields={fields}
                emptyRecord={emptyRecord}
            />
        </Layout>
    );
}
