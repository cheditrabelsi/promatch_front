import React, { useState, ChangeEvent, FormEvent } from "react";
import PortalLayout from "@/components/layouts/portal/PortalLayout";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = { type: "success" | "error"; message: string } | null;

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    // --- Validation côté frontend ---
    if (formData.name.trim().length < 2) {
      setStatus({ type: "error", message: "Le nom doit contenir au moins 2 caractères" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: "error", message: "Email invalide" });
      return;
    }
    if (formData.subject.trim().length === 0) {
      setStatus({ type: "error", message: "Le sujet ne peut pas être vide" });
      return;
    }
    if (formData.message.trim().length < 10) {
      setStatus({ type: "error", message: "Le message doit contenir au moins 10 caractères" });
      return;
    }
    if (formData.message.length > 5000) {
      setStatus({ type: "error", message: "Le message ne peut pas dépasser 5000 caractères" });
      return;
    }

    // --- Envoi au backend ---
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus({ type: "success", message: "Message envoyé avec succès 🎉" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (data.errors) {
        // Afficher les erreurs précises du serializer
        const fieldErrors = Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${messages}`)
          .join("\n");
        setStatus({ type: "error", message: fieldErrors });
      } else {
        setStatus({ type: "error", message: data.message || "Erreur lors de l'envoi" });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Impossible de contacter le serveur. Vérifiez qu'il fonctionne.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortalLayout title="Contact">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
        <h2 className="text-2xl font-bold mb-2 text-center">Nous contacter</h2>
        <p className="mb-4 text-sm text-gray-600 text-center">
          Envoyez-nous un message, nous vous répondrons sous 24h.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            name="subject"
            placeholder="Sujet"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
          />
          {status && (
            <div
              className={`p-2 rounded text-sm ${
                status.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded font-semibold bg-blue-600 text-white hover:bg-blue-700 transition ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </form>
      </div>
    </PortalLayout>
  );
};

export default ContactUsPage;
