'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Download, ExternalLink, FileText, Loader2 } from 'lucide-react';
import './CvModal.css';

export const openCvModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-cv-modal'));
  }
};

interface CvModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  cvUrl?: string;
  filename?: string;
}

export default function CvModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  cvUrl = '/cv-mathieu.pdf',
  filename = 'cv-Mathieu_AKAKPO-DJAKPATA.pdf'
}: CvModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Controlled or uncontrolled (via CustomEvent)
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClose = useCallback(() => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [isControlled, controlledOnClose]);

  // Listen for global custom event
  useEffect(() => {
    const handleOpenEvent = () => {
      setInternalIsOpen(true);
      setIsLoading(true);
    };

    window.addEventListener('open-cv-modal', handleOpenEvent);
    return () => {
      window.removeEventListener('open-cv-modal', handleOpenEvent);
    };
  }, []);

  // Keyboard navigation (Escape key) and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="cv-modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div
        className="cv-modal-container glass"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tactical Header */}
        <div className="cv-modal-header">
          <div className="cv-modal-title-group">
            <div className="cv-modal-icon-badge">
              <FileText size={18} />
            </div>
            <div className="cv-modal-text-group">
              <h2 id="cv-modal-title" className="cv-modal-title">
                CURRICULUM VITAE
              </h2>
              <span className="cv-modal-subtitle">
                SYS_DOC // Mathieu_AKAKPO-DJAKPATA.pdf
              </span>
            </div>
          </div>

          <div className="cv-modal-actions">
            <a
              href={cvUrl}
              download={filename}
              className="cv-action-btn cv-download-btn"
              title="Télécharger le CV"
              aria-label="Télécharger le CV en PDF"
            >
              <Download size={16} />
              <span className="cv-action-text">Télécharger</span>
            </a>

            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-action-btn cv-external-btn"
              title="Ouvrir dans un nouvel onglet"
              aria-label="Ouvrir le CV dans un nouvel onglet"
            >
              <ExternalLink size={16} />
              <span className="cv-action-text">Plein écran</span>
            </a>

            <button
              type="button"
              className="cv-action-btn cv-close-btn"
              onClick={handleClose}
              aria-label="Fermer l'aperçu du CV"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Viewer */}
        <div className="cv-modal-body">
          {isLoading && (
            <div className="cv-modal-loader">
              <Loader2 className="cv-spinner" size={32} />
              <p>Chargement du document PDF...</p>
            </div>
          )}

          <iframe
            src={`${cvUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Aperçu du CV de Mathieu AKAKPO-DJAKPATA"
            className="cv-modal-iframe"
            onLoad={() => setIsLoading(false)}
          />

          <noscript>
            <div className="cv-modal-fallback">
              <p>Votre navigateur ne prend pas en charge les iframes.</p>
              <a href={cvUrl} download={filename} className="cta-primary">
                <Download size={16} />
                <span>Télécharger directement le CV</span>
              </a>
            </div>
          </noscript>
        </div>

        {/* Modal Tactical Footer */}
        <div className="cv-modal-footer">
          <div className="cv-modal-status">
            <span className="cv-status-dot"></span>
            <span className="cv-status-text">STATUT: DOCUMENT VÉRIFIÉ // DISPONIBLE AU FORMAT PDF</span>
          </div>
          <div className="cv-modal-hints">
            <span className="cv-hint-tag">[ÉCHAP] pour fermer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
