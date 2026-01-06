import Header from "@/components/layouts/portal/components/Header/Header";

const AdminPage = () => {
  return (
    <div className="min-h-screen">
        <Header />
      <div className="mx-auto max-w-4xl mt-4 rounded-lg bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-gray-800">Admin</h1>
        <p className="mt-3 text-gray-600">
          Page réservée aux administrateurs. Contenu à venir.
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
