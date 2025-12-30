import React from "react";
import PortalLayout from "@/components/layouts/portal/PortalLayout";

const AboutUsPage: React.FC = () => (
  <PortalLayout title="À propos">
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-2 text-center">À propos de ProMatch</h2>
      <p className="text-gray-600 mb-4 text-center">Révolutionner le recrutement grâce à l'intelligence artificielle.</p>
      <h3 className="text-lg font-semibold mt-4">Notre mission</h3>
      <p className="text-gray-700 mb-2">ProMatch est une plateforme innovante...</p>
      <h3 className="text-lg font-semibold mt-4">Notre vision</h3>
      <p className="text-gray-700">Construire un écosystème...</p>
    </div>
  </PortalLayout>
);

export default AboutUsPage;
