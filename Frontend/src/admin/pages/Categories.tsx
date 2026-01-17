import React, { useState, useEffect } from 'react';
import { Plus, FolderTree } from 'lucide-react';
import { DataTable } from '@/admin/components/DataTable';
import { Modal } from '@/admin/components/Modal';
import { PageLoader, AdminLoader } from '@/admin/components/AdminLoader';
import { GENDER_OPTIONS } from '@/admin/utils/constants';
import type { Category } from '@/admin/types';
import { z } from 'zod';

// Mock categories
const mockCategories: Category[] = [
  { id: '1', name: 'Shirts', slug: 'shirts', gender: 'men', productCount: 24, createdAt: '2025-01-01T10:00:00Z' },
  { id: '2', name: 'Pants', slug: 'pants', gender: 'men', productCount: 18, createdAt: '2025-01-01T10:00:00Z' },
  { id: '3', name: 'Footwear', slug: 'footwear', gender: 'men', productCount: 12, createdAt: '2025-01-01T10:00:00Z' },
  { id: '4', name: 'Tops', slug: 'tops', gender: 'women', productCount: 32, createdAt: '2025-01-01T10:00:00Z' },
  { id: '5', name: 'Skirts', slug: 'skirts', gender: 'women', productCount: 15, createdAt: '2025-01-01T10:00:00Z' },
  { id: '6', name: 'Bags', slug: 'bags', gender: 'women', productCount: 20, createdAt: '2025-01-01T10:00:00Z' },
  { id: '7', name: 'Boys', slug: 'boys', gender: 'kids', productCount: 18, createdAt: '2025-01-01T10:00:00Z' },
  { id: '8', name: 'Girls', slug: 'girls', gender: 'kids', productCount: 22, createdAt: '2025-01-01T10:00:00Z' },
];

const categorySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(50),
  gender: z.string().min(1, 'Please select a gender'),
});

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [genderFilter, setGenderFilter] = useState('');
  const [formData, setFormData] = useState({ name: '', gender: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setTimeout(() => {
      setCategories(mockCategories);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredCategories = genderFilter
    ? categories.filter((c) => c.gender === genderFilter)
    : categories;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = categorySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newCategory: Category = {
      id: String(Date.now()),
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      gender: formData.gender as Category['gender'],
      productCount: 0,
      createdAt: new Date().toISOString(),
    };

    setCategories((prev) => [...prev, newCategory]);
    setFormData({ name: '', gender: '' });
    setAddModalOpen(false);
    setIsSaving(false);
  };

  const columns = [
    {
      key: 'name',
      header: 'Category',
      render: (category: Category) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
            <FolderTree className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{category.name}</p>
            <p className="text-xs text-muted-foreground">/{category.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'gender',
      header: 'Gender',
      render: (category: Category) => (
        <span className="capitalize">{category.gender}</span>
      ),
    },
    {
      key: 'products',
      header: 'Products',
      render: (category: Category) => (
        <span className="font-medium">{category.productCount}</span>
      ),
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-admin-sidebar text-admin-sidebar-foreground rounded-md font-medium hover:bg-admin-sidebar-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setGenderFilter('')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            !genderFilter
              ? 'bg-admin-sidebar text-admin-sidebar-foreground'
              : 'bg-secondary hover:bg-accent'
          }`}
        >
          All
        </button>
        {GENDER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setGenderFilter(opt.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              genderFilter === opt.value
                ? 'bg-admin-sidebar text-admin-sidebar-foreground'
                : 'bg-secondary hover:bg-accent'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {GENDER_OPTIONS.map((opt) => {
          const count = categories.filter((c) => c.gender === opt.value).length;
          const products = categories
            .filter((c) => c.gender === opt.value)
            .reduce((sum, c) => sum + c.productCount, 0);
          return (
            <div key={opt.value} className="bg-admin-card rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">{opt.label}'s Categories</p>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">{products} products</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredCategories}
        keyField="id"
        emptyMessage="No categories found"
      />

      {/* Add Category Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setFormData({ name: '', gender: '' });
          setErrors({});
        }}
        title="Add Category"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setAddModalOpen(false)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-admin-sidebar text-admin-sidebar-foreground rounded-md font-medium hover:bg-admin-sidebar-hover transition-colors disabled:opacity-50"
            >
              {isSaving ? <AdminLoader size="sm" /> : 'Create Category'}
            </button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Category Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter category name"
              className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Gender *</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
              className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select gender</option>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.gender && <p className="mt-1 text-xs text-destructive">{errors.gender}</p>}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
