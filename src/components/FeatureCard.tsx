import React from 'react';

export interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  title,
  description,
  tags,
  icon,
}) => {
  return (
    <div className="feature-card-glass">
      <div className="feature-badge-row">
        <span className="feature-number">{number}</span>
        <div className="feature-icon-box">{icon}</div>
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
      <div className="feature-tags-list">
        {tags.map((t, idx) => (
          <span key={idx} className="feature-tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
