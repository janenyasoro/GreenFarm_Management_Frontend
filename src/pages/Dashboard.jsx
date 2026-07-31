import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/livestock', label: 'Livestock',  desc: 'Manage your animals and herds' },
  { to: '/expenses',  label: 'Expenses',   desc: 'Record and track farm spending' },
  { to: '/income',    label: 'Income',     desc: 'Log sales and other earnings'  },
  { to: '/inventory', label: 'Inventory',  desc: 'Monitor stock and supplies'    },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* User info strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        backgroundColor: '#E7F0DD',
        border: '1px solid #c6ddb0',
        borderRadius: '6px',
        padding: '1rem 1.5rem',
        marginBottom: '2.5rem',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#5B6B58' }}>Email</p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', fontWeight: 500, color: '#243325' }}>{user?.email || '—'}</p>
        </div>
        <div style={{ width: '1px', height: '32px', backgroundColor: '#c6ddb0', flexShrink: 0 }} />
        <div>
          <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#5B6B58' }}>Role</p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', fontWeight: 500, color: '#243325', textTransform: 'capitalize' }}>{user?.role || 'Owner'}</p>
        </div>
      </div>

      {/* Quick access */}
      <p style={{ margin: '0 0 0.875rem', fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5B6B58' }}>
        Quick access
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
        gap: '1rem',
      }}>
        {quickLinks.map(({ to, label, desc }) => (
          <Link
            key={to}
            to={to}
            style={{
              display: 'block',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '1.125rem 1.25rem',
              textDecoration: 'none',
              transition: 'border-color 0.15s, background-color 0.15s',
              backgroundColor: '#ffffff',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2C5F2D';
              e.currentTarget.style.backgroundColor = '#f7fbf4';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#243325' }}>{label}</p>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.8125rem', color: '#5B6B58', lineHeight: 1.5 }}>{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
