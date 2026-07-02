import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import './Contact.css';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" ry="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string => {
    if (!value.trim()) {
      return "Ce champ est obligatoire.";
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Veuillez entrer une adresse email valide.";
      }
    }

    if (name === 'message' && value.trim().length < 10) {
      return "Le message doit faire au moins 10 caractères.";
    }

    return "";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on the fly if already touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Touch and validate all fields
    const newTouched = { name: true, email: true, subject: true, message: true };
    setTouched(newTouched);

    const newErrors: FormErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      // Focus on first invalid field
      if (newErrors.name) (formRef.current?.querySelector('[name="name"]') as HTMLInputElement)?.focus();
      else if (newErrors.email) (formRef.current?.querySelector('[name="email"]') as HTMLInputElement)?.focus();
      else if (newErrors.subject) (formRef.current?.querySelector('[name="subject"]') as HTMLInputElement)?.focus();
      else if (newErrors.message) (formRef.current?.querySelector('[name="message"]') as HTMLTextAreaElement)?.focus();
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">Me Contacter</h2>

      <div className="contact-grid">
        {/* Contact info cards */}
        <div className="contact-info">
          <h3>Coordonnées</h3>
          <p className="contact-info-subtitle">
            N'hésitez pas à me contacter pour toute proposition de stage, collaboration, ou échange technique.
          </p>

          <div className="info-cards-list">
            <a href="mailto:mathieuakakpodjakpata@gmail.com" className="info-card glass">
              <Mail className="info-icon" />
              <div>
                <h4>Email</h4>
                <span>mathieuakakpodjakpata@gmail.com</span>
              </div>
            </a>

            <a href="tel:+212669372603" className="info-card glass">
              <Phone className="info-icon" />
              <div>
                <h4>Téléphone</h4>
                <span>+212 669-372603</span>
              </div>
            </a>

            <div className="info-card glass">
              <MapPin className="info-icon" />
              <div>
                <h4>Localisation</h4>
                <span>2 rue Abou Ishak El Ouajjaj, Maârif-Casablanca, Maroc</span>
              </div>
            </div>
          </div>

          <div className="contact-socials-card glass">
            <h4>Mes réseaux</h4>
            <div className="contact-socials-links">
              <a 
                href="https://github.com/Math-ieu" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={22} />
                <span>GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/mathieu-akakpo-djakpata" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={22} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-wrapper glow-card">
          <h3>Envoyer un Message</h3>

          {status === 'success' ? (
            <div className="form-status success glass">
              <CheckCircle size={36} className="status-icon-check" />
              <div>
                <h4>Message envoyé !</h4>
                <p>Merci pour votre intérêt. Je vous répondrai dans les plus brefs délais.</p>
              </div>
              <button onClick={() => setStatus('idle')} className="cta-secondary reset-btn glass">
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
              
              {status === 'error' && (
                <div className="form-status error glass">
                  <AlertTriangle size={20} className="status-icon-error" />
                  <span>Une erreur s'est produite lors de l'envoi. Veuillez réessayer.</span>
                </div>
              )}

              {/* Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nom Complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input glass ${touched.name && errors.name ? 'invalid' : ''}`}
                  disabled={status === 'loading'}
                  placeholder="Ex: Jean Dupont"
                  required
                />
                {touched.name && errors.name && (
                  <span className="field-error">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Adresse Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input glass ${touched.email && errors.email ? 'invalid' : ''}`}
                  disabled={status === 'loading'}
                  placeholder="Ex: jean.dupont@company.com"
                  required
                />
                {touched.email && errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input glass ${touched.subject && errors.subject ? 'invalid' : ''}`}
                  disabled={status === 'loading'}
                  placeholder="Ex: Offre de stage Ingénieur Cloud"
                  required
                />
                {touched.subject && errors.subject && (
                  <span className="field-error">{errors.subject}</span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input form-textarea glass ${touched.message && errors.message ? 'invalid' : ''}`}
                  disabled={status === 'loading'}
                  placeholder="Détaillez votre demande ici..."
                  required
                />
                {touched.message && errors.message && (
                  <span className="field-error">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="spinner"></span>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer le Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
