import type { Metadata } from "next";
import ServicesPage from "../../components/ServicesPage";

export const metadata: Metadata = {
  title: "Services & Tarifs | Mathieu AKAKPO-DJAKPATA - Consultant Cloud & DevSecOps",
  description: "Découvrez mes offres de services professionnels : Cloud, DevSecOps, architectures Kubernetes, développement d'applications SaaS web/mobile et intégration d'IA.",
  alternates: {
    canonical: "https://mathdev.consulting/services",
  },
};

export default function Services() {
  return <ServicesPage />;
}
