// src/pages/Income.jsx
import React from "react";
import Layout from "../components/Layout";
import ResourceManager from "../components/ResourceManager";

const columns = [
  { key: "source", label: "Source" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
  { key: "date_received", label: "Date Received" },
];

const fields = [
  {
    name: "source",
    label: "Source",
    type: "select",
    options: ["crop_sale", "livestock_sale", "other"],
    required: true
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    required: false
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
    required: true
  },
  {
    name: "date_received",
    label: "Date Received",
    type: "date",
    required: true
  },
];

const emptyRecord = {
  source: "",
  description: "",
  amount: "",
  date_received: "",
};

export default function Income() {
  return (
    <Layout title="Income">
      <ResourceManager
        endpoint="/income"
        columns={columns}
        fields={fields}
        emptyRecord={emptyRecord}
      />
    </Layout>
  );
}