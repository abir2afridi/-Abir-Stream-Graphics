import React from 'react';

export interface StreamIdea {
  title: string;
  brbMessage: string;
  themeDescription: string;
}

export interface PanelProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  images: string[];
  client: string;
  year: string;
  tags: string[];
  challenge: string;
  solution: string;
  testimonial?: Testimonial;
}