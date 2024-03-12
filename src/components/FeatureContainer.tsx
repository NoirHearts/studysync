import React, { ReactNode } from 'react';

interface Props {
  prefix: string;
  title: string;
  icon: any;
  children?: ReactNode;
}

const FeatureContainer: React.FC<Props> = ({
  prefix,
  title,
  icon,
  children,
}: Props) => {
  prefix = prefix.toLowerCase();
  return (
    <div id={`${prefix}-container`} className="feature-container">
      <input
        id={`${prefix}-button`}
        className="feature-button"
        type="checkbox"
      />
      <label htmlFor={`${prefix}-button`}>
        <img className="icons" src={icon} /> {title}
      </label>
      <div id={`${prefix}-content`} className="feature-content">
        {children}
      </div>
    </div>
  );
};

export default FeatureContainer;
