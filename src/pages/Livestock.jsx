import React from "react";
import Layout from "../components/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
    { key: "tag_number", label: "Tag #" },
    { key: "animal_type", label: "Type" },
    { key: "breed", label: "Breed" },
    { key: "gender", label: "Gender" },
    { key: "status", label: "Status" },
    {
        key: "actions",
        label: "Actions",
        render: (item) => (
            <Link href={`/health-records?livestock_id=${item.id}`}>
                <button className="text-blue-600 hover:underline">
                    View Health Records
                </button>
            </Link>
        )
    },
];

const fields = [
    { name: "tag_number", label: "Tag number", type: "text" },
    { name: "animal_type", label: "Animal type (e.g. cattle, goat, poultry)", type: "text" },
    { name: "breed", label: "Breed", type: "text" },
    { name: "birth_date", label: "Birth date", type: "date" },
    { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
    { name: "status", label: "Status", type: "select", options: ["active", "sold", "deceased"] },
    { name: "notes", label: "Notes", type: "textarea" },
];

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
            <ResourceManager endpoint="/livestock" columns={columns} fields={fields} emptyRecord={emptyRecord} />
        </Layout>
    );
}
