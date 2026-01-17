import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { DataTable } from '@/admin/components/DataTable';
import { Modal } from '@/admin/components/Modal';
import { PageLoader } from '@/admin/components/AdminLoader';
import { formatCurrency } from '@/admin/utils/constants';
import type { AdminProduct } from '@/admin/types';

// Mock data
const mockProducts: AdminProduct[] = [
  {
    id: '1',
    name: 'Premium Linen Oxford Shirt',
    brand: 'LUNAR Essentials',
    gender: 'men',
    category: 'shirts',
    subcategory: 'shirts',
    price: 89.00,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop',
    description: 'Elegant linen shirt',
    inStock: true,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-15T14:30:00Z',
  },
  {
    id: '2',
    name: 'Silk Blend Blouse',
    brand: 'LUNAR Collection',
    gender: 'women',
    category: 'tops',
    subcategory: 'tops',
    price: 145.00,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=100&h=100&fit=crop',
    description: 'Luxurious silk blouse',
    inStock: true,
    createdAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-14T11:00:00Z',
  },
  {
    id: '3',
    name: 'Classic Chinos',
    brand: 'LUNAR Essentials',
    gender: 'men',
    category: 'pants',
    subcategory: 'pants',
    price: 75.00,
    stock: 62,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&h=100&fit=crop',
    description: 'Comfortable chino pants',
    inStock: true,
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-12T09:00:00Z',
  },
  {
    id: '4',
    name: 'Fun Graphic Tee',
    brand: 'LUNAR Kids',
    gender: 'kids',
    category: 'boys',
    subcategory: 'boys',
    price: 35.00,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=100&h=100&fit=crop',
    description: 'Colorful graphic t-shirt',
    inStock: false,
    createdAt: '2026-01-03T10:00:00Z',
    updatedAt: '2026-01-10T16:00:00Z',
  },
];

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; product: AdminProduct | null }>({
    open: false,
    product: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteModal.product) {
      setProducts(products.filter((p) => p.id !== deleteModal.product?.id));
      setDeleteModal({ open: false, product: null });
    }
  };

  const columns = [
    {
      key: 'product',
      header: 'Product',
      render: (product: AdminProduct) => (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <p className="font-medium line-clamp-1">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.brand}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'gender',
      header: 'Category',
      render: (product: AdminProduct) => (
        <div>
          <p className="capitalize">{product.gender}</p>
          <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (product: AdminProduct) => formatCurrency(product.price),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (product: AdminProduct) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 10
              ? 'bg-green-100 text-green-800'
              : product.stock > 0
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (product: AdminProduct) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/products/edit/${product.id}`);
            }}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal({ open: true, product });
            }}
            className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
      className: 'w-24',
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">{products.length} products in catalog</p>
        </div>
        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-2 px-4 py-2 bg-admin-sidebar text-admin-sidebar-foreground rounded-md font-medium hover:bg-admin-sidebar-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-admin-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredProducts}
        keyField="id"
        emptyMessage="No products found"
      />

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, product: null })}
        title="Delete Product"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteModal({ open: false, product: null })}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
            >
              Delete
            </button>
          </div>
        }
      >
        <p>
          Are you sure you want to delete{' '}
          <span className="font-semibold">{deleteModal.product?.name}</span>?
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default Products;
