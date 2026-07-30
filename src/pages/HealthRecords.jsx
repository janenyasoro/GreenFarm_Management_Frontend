/**
 * Health Records Management Page (React Router version)
 */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // React Router v6
import Layout from "../components/common/Layout";
import ResourceManager from "../components/ResourceManager";

// Table columns configuration
const columns = [
    { key: "record_type", label: "Record Type" },
    { key: "date_administered", label: "Date Administered" },
    { key: "administered_by", label: "Administered By" },
    { key: "notes", label: "Notes" },
];

// Form fields configuration
const fields = [
    {
        name: "record_type",
        label: "Record Type",
        type: "select",
        options: ["Vaccination", "Treatment", "Checkup", "Surgery", "Medication", "Other"]
    },
    { name: "date_administered", label: "Date Administered", type: "date" },
    { name: "administered_by", label: "Administered By", type: "text" },
    { name: "notes", label: "Notes", type: "textarea" },
];

// Default empty record
const emptyRecord = {
    record_type: "",
    date_administered: "",
    administered_by: "",
    notes: "",
};

export default function HealthRecords() {
    // Get the livestock_id from the URL parameter
    const { livestock_id } = useParams(); // URL: /health-records/:livestock_id
    const navigate = useNavigate();
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (livestock_id) {
            fetchAnimalDetails(livestock_id);
        }
    }, [livestock_id]);

    const fetchAnimalDetails = async (id) => {
        try {
            const response = await fetch(`/api/livestock/${id}`);
            if (response.ok) {
                const data = await response.json();
                setAnimal(data);
            }
        } catch (error) {
            console.error("Error fetching animal details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout title="Health Records">
                <div className="text-center py-10">Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout title={`Health Records - ${animal?.tag_number || 'Animal'}`}>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h2 className="text-xl font-semibold">
                    Health Records for: {animal?.tag_number} ({animal?.animal_type})
                </h2>
                <button
                    onClick={() => navigate('/livestock')}
                    className="mt-2 text-blue-600 hover:underline"
                >
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