import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const AdminNotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
      <p className="text-xl font-medium mb-2">Page Not Found</p>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-admin-sidebar text-admin-sidebar-foreground rounded-md font-medium hover:bg-admin-sidebar-hover transition-colors"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AdminNotFound;
