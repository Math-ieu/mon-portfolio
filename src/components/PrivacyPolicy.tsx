import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-section">
      <div className="privacy-container">
        <header className="privacy-header">
          <div className="telemetry-tag">
            <Shield size={12} style={{ marginRight: '6px' }} />
            <span>[SYS_LEGAL_COMPLIANCE // SEC_LEVEL_0]</span>
          </div>
          <h1 className="privacy-title">Politique de Confidentialité</h1>
        </header>

        <main className="privacy-content">
          <p className="last-update"><strong>Dernière mise à jour :</strong> 8 juillet 2026</p>
          
          <p>
            La protection de votre vie privée est une priorité absolue. Cette politique de confidentialité détaille de manière transparente les informations collectées sur le site <strong>mathdev.consulting</strong>, leur finalité et vos droits.
          </p>

          <h2 className="privacy-subtitle">1. Identité de l'Éditeur</h2>
          <p>
            Ce site internet est un portfolio professionnel édité par <strong>Mathieu AKAKPO-DJAKPATA</strong>, agissant en tant que consultant indépendant (freelance) en ingénierie Cloud &amp; DevSecOps, domicilié en France.
          </p>
          <p>
            Contact Email : <a href="mailto:mathieu@mathdev.consulting" className="privacy-accent-link">mathieu@mathdev.consulting</a>
          </p>

          <h2 className="privacy-subtitle">2. Collecte et Traitement des Données</h2>
          <p>Dans le cadre de l'utilisation de ce site web, les données suivantes sont susceptibles d'être traitées :</p>
          <ul className="privacy-list">
            <li>
              <strong>Formulaire de Contact :</strong> Lorsque vous envoyez un message via le formulaire de contact, les informations saisies (nom, adresse email, objet, message) sont transmises de manière sécurisée afin de pouvoir traiter votre demande professionnelle et y répondre. Ces données ne sont jamais partagées avec des tiers à des fins publicitaires.
            </li>
            <li>
              <strong>Données de Navigation (Analytics) :</strong> Ce site intègre le service d'analyse web <strong>Vercel Analytics</strong>. Ces mesures d'audience nous permettent d'optimiser le site en collectant des données techniques anonymisées (type d'appareil, pays de connexion, pages visitées) de manière respectueuse de la vie privée, sans stocker de cookies traceurs intrusifs.
            </li>
          </ul>

          <h2 className="privacy-subtitle">3. Hébergement du Site</h2>
          <p>Le site <strong>mathdev.consulting</strong> est hébergé et propulsé par la plateforme Cloud <strong>Vercel Inc.</strong>, située à l'adresse suivante :</p>
          <div className="telemetry-block">
            Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723, États-Unis
          </div>

          <h2 className="privacy-subtitle">4. Base Légale et Durée de Conservation</h2>
          <p>
            Le traitement de vos données est basé sur l'intérêt légitime de l'éditeur à communiquer ses services et répondre aux demandes de ses prospects (RGPD, article 6.1.f). Les données issues des formulaires de contact sont conservées pendant une durée maximale de trois (3) ans à compter du dernier contact commercial avant d'être supprimées ou archivées conformément à la législation.
          </p>

          <h2 className="privacy-subtitle">5. Vos Droits Concernant vos Données</h2>
          <p>
            Conformément à la réglementation sur la protection des données personnelles (notamment le Règlement Général sur la Protection des Données ou RGPD), vous disposez des droits suivants :
          </p>
          <ul className="privacy-list">
            <li>Droit d'accès et de rectification de vos données.</li>
            <li>Droit à l'effacement (« droit à l'oubli ») de vos données personnelles.</li>
            <li>Droit d'opposition ou de limitation du traitement de vos données.</li>
          </ul>
          <p>
            Pour exercer l'un de ces droits, veuillez adresser votre demande directement par email à : <strong>mathieu@mathdev.consulting</strong>.
          </p>

          <Link href="/" className="back-btn">
            <ArrowLeft size={14} style={{ marginRight: '8px' }} />
            <span>[RETOUR_ACCUEIL]</span>
          </Link>
        </main>
      </div>
    </div>
  );
}
