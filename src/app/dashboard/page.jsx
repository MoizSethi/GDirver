import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to the CRM Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your customers and reports efficiently.
        </p>
      </div>
    </Layout>
  );
}