import React, { useState } from 'react';
import { usePhysicalTilt } from '../hooks/usePhysicalTilt';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', type: 'Collaboration' });

  const boxTilt = usePhysicalTilt({
    maxTilt: 3,
    perspective: 1000,
    scaleOnHover: 1.008,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="scroll-section contact-section" id="contact">
      <div className="contact-container">
        <div
          ref={boxTilt.ref}
          {...boxTilt.props}
          style={boxTilt.style}
          className="contact-box"
        >
          <div className="card-shine-layer" style={boxTilt.shineStyle} />

          <div className="section-eyebrow">05 / INITIATE CONNECT</div>
          <h2 className="contact-heading">
            Let's Engineer Exceptional <span className="gradient-word">Digital Products</span>.
          </h2>
          <p className="contact-desc">
            Available for select senior engineering roles, AI system architecture consulting, custom 3D web applications, and creative technology collaborations.
          </p>

          {submitted ? (
            <div className="contact-success-msg">
              <span className="success-icon">✓</span>
              <h3>Transmission Received</h3>
              <p>Thank you for reaching out. I will respond to your message shortly.</p>
              <button
                className="btn-secondary"
                style={{ marginTop: '1.25rem' }}
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@studio.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label className="form-label">INQUIRY CATEGORY</label>
                <select
                  className="form-input"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Collaboration">Full-Stack / AI / 3D Project Collaboration</option>
                  <option value="Architecture">System Architecture Consulting</option>
                  <option value="Employment">Engineering Role Opportunity</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label className="form-label">PROJECT / MESSAGE DETAILS</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project, system requirements, or vision..."
                  className="form-input"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-cta"
                style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
              >
                <span>Send Message Transmission</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          )}

          <div className="contact-direct-links">
            <div className="direct-item">
              <span className="direct-lbl">DIRECT EMAIL</span>
              <a href="mailto:sakthi@engineering.dev" className="direct-val">
                sakthi@engineering.dev
              </a>
            </div>
            <div className="direct-item">
              <span className="direct-lbl">GITHUB</span>
              <a href="https://github.com/sakthi" target="_blank" rel="noreferrer" className="direct-val">
                github.com/sakthi
              </a>
            </div>
            <div className="direct-item">
              <span className="direct-lbl">LOCATION</span>
              <span className="direct-val">Global / Remote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
