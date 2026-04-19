import React from 'react';
import css from './Dashboard.module.css';

interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  return <div className={css.dashboardWrapper}>{children}</div>;
};
