// src/pages/Livestock.jsx
import React from "react";
import Layout from "../components/Layout";
import ResourceManager from "../components/ResourceManager";

// Table columns
const columns = [
    { key: "tag_number", label: "Tag #" },
    { key: "animal_type", label: "Type" },
    { key: "breed", label: "Breed" },
    { key: "gender", label: "Gender" },
    { key: "status", label: "Status" },
];

// Form fields - MUST match backend expectations
const fields = [
    {
        name: "tag_number",
        label: "Tag number",
        type: "text",
        placeholder: "e.g., T001"
    },
    {
        name: "animal_type",
        label: "Animal type",
        type: "text",
        placeholder: "e.g., cattle, goat, poultry",
        required: true  // This is required by backend
    },
    {
        name: "breed",
        label: "Breed",
        type: "text",
        placeholder: "e.g., Holstein, Nubian"
    },
    {
        name: "birth_date",
        label: "Birth date",
        type: "date"
    },
    {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["male", "female"]
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: ["active", "sold", "deceased"]
    },
    {
        name: "notes",
        label: "Notes",
        type: "textarea"
    },
];

// Default empty record
const emptyRecord = {
    tag_number: "",
    animal_type: "",
    breed: "",
    birth_date: "",
    gender: "",
    status: "active",
    notes: "",
};

export default function Livestock() {
    return (
        <Layout title="Livestock">
            <ResourceManager
                endpoint="/livestock"
                columns={columns}
                fields={fields}
                emptyRecord={emptyRecord}
            />
        </Layout>
    );
}