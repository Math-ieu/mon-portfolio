import type { Metadata } from "next";
import PrivacyPolicy from "../../components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Mathieu AKAKPO-DJAKPATA",
  description: "La protection de votre vie privée est une priorité absolue. Cette politique de confidentialité détaille les informations collectées sur mathdev.consulting.",
};

export default function Privacy() {
  return <PrivacyPolicy />;
}
