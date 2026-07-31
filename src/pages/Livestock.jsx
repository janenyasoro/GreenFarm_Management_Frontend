// src/pages/Livestock.jsx
import Layout from "../components/common/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
    { key: "tag_number", label: "Tag #" },
    { key: "animal_type", label: "Type" },
    { key: "breed", label: "Breed" },
    { key: "gender", label: "Gender" },
    { key: "status", label: "Status" },
];

const fields = [
    { name: "tag_number", label: "Tag number", type: "text" },
    { name: "animal_type", label: "Animal type (e.g. cattle, goat, poultry)", type: "text", required: true },
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
        <Layout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Livestock Management</h1>
                <ResourceManager
                    endpoint="/livestock"
                    columns={columns}
                    fields={fields}
                    emptyRecord={emptyRecord}
                />
            </div>
        </Layout>
    );
}