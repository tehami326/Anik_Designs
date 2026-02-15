import AdminLayout from "./AdminLayout";

const AdminSettings = () => {

    return (
        <AdminLayout>

            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-2">
                    Settings
                </h1>
                <p className="text-gray-400 text-sm">
                    Configure system preferences.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                <div className="p-8 border border-white/10 rounded-2xl">
                    <h3 className="text-lg font-medium mb-6">
                        Brand Settings
                    </h3>

                    <div className="space-y-4">
                        <input
                            placeholder="Site Name"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3"
                        />
                        <input
                            placeholder="Support Email"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3"
                        />
                    </div>
                </div>

                <div className="p-8 border border-white/10 rounded-2xl">
                    <h3 className="text-lg font-medium mb-6">
                        System Settings
                    </h3>

                    <div className="space-y-4">
                        <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3">
                            <option>INR (₹)</option>
                            <option>USD ($)</option>
                        </select>

                        <button className="w-full bg-white/10 border border-white/10 rounded-lg py-3 hover:bg-white/20 transition">
                            Save Changes
                        </button>
                    </div>
                </div>

            </div>

        </AdminLayout>
    );
};

export default AdminSettings;
