import React, { useState, useEffect } from 'react';
import { Plus, FolderTree, Fingerprint, Activity, Layers, ChevronRight, Sparkles, X, Hash } from 'lucide-react';
import { PageLoader, AdminLoader } from '@/admin/components/AdminLoader';
import { GENDER_OPTIONS } from '@/admin/utils/constants';
import type { Category } from '@/admin/types';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
    // Integration Hook: Replace with adminApi.getCategories()
    setTimeout(() => {
      setCategories([
        { id: '1', name: 'Shirts', slug: 'shirts', gender: 'men', productCount: 24, createdAt: '2025-01-01T10:00:00Z' },
        { id: '2', name: 'Pants', slug: 'pants', gender: 'men', productCount: 18, createdAt: '2025-01-01T10:00:00Z' },
        { id: '4', name: 'Tops', slug: 'tops', gender: 'women', productCount: 32, createdAt: '2025-01-01T10:00:00Z' },
      ]);
      setIsLoading(false);
    }, 800);
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
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

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

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-12 animate-fade-in p-2 md:p-6 lg:p-10 bg-[#050505] min-h-screen text-white">
      
      {/* HEADER PROTOCOL */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-10 border-b border-white/5">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase leading-none">TAXONOMY CONTROL</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">Global <br />Categories<span className="text-primary not-italic">.</span></h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
           <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/5">
              <button
                onClick={() => setGenderFilter('')}
                className={cn(
                  "px-6 py-3 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all duration-500",
                  !genderFilter ? "bg-primary text-white shadow-xl" : "text-white/20 hover:text-white"
                )}
              >
                ALL
              </button>
              {GENDER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setGenderFilter(opt.value)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all duration-500",
                    genderFilter === opt.value ? "bg-primary text-white shadow-xl" : "text-white/20 hover:text-white"
                  )}
                >
                  {opt.label}
                </button>
              ))}
           </div>
           <button
             onClick={() => setAddModalOpen(true)}
             className="btn-luxury px-10 py-4 flex items-center gap-4 group"
           >
             <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-500" />
             NEW CATEGORY
           </button>
        </div>
      </div>

      {/* STATS TELEMETRY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {GENDER_OPTIONS.map((opt) => {
          const count = categories.filter((c) => c.gender === opt.value).length;
          const products = categories
            .filter((c) => c.gender === opt.value)
            .reduce((sum, c) => sum + c.productCount, 0);
          return (
            <div key={opt.value} className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-10 group hover:border-primary/20 transition-all duration-700">
              <p className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">{opt.label}'S ARCHIVE</p>
              <div className="flex items-baseline gap-4 mt-6">
                 <p className="text-5xl font-black italic tracking-tighter text-white">{count}</p>
                 <span className="text-[9px] font-bold text-primary tracking-widest uppercase">{products} ASSETS</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CATEGORY LEDGER */}
      <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">CLASSIFICATION</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">DIRECTORY</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">GENDER</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">ASSET COUNT</th>
                     <th className="px-10 py-8 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">ACTIONS</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredCategories.map((category) => (
                    <motion.tr 
                      key={category.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-6">
                             <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-all group-hover:scale-110 group-hover:bg-primary/10">
                                <FolderTree className="h-6 w-6" />
                             </div>
                             <span className="text-[11px] font-black text-white uppercase tracking-widest leading-none">{category.name}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">/{category.slug}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/40 text-[9px] font-black tracking-widest uppercase">
                             {category.gender}
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-baseline gap-2">
                             <span className="text-sm font-black italic tracking-tighter text-primary">{category.productCount}</span>
                             <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">PIECES</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <button className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all">
                             <ChevronRight className="h-5 w-5" />
                          </button>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* ADD CATEGORY MODAL */}
      <AnimatePresence>
        {addModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-xl w-full bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 space-y-12 shadow-full"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-primary">
                    <Plus className="h-4 w-4" /> NEW TAXONOMY
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Add Category</h3>
                </div>
                <button 
                  onClick={() => setAddModalOpen(false)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">CATEGORY IDENTITY</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="ENTER NOMENCLATURE..."
                    className="w-full bg-white/5 border border-white/5 py-6 px-10 rounded-2xl text-[11px] font-black tracking-widest uppercase focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/5"
                  />
                  {errors.name && <p className="text-[9px] font-bold text-destructive tracking-widest uppercase">{errors.name}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">GENDER CLASSIFICATION</label>
                  <div className="grid grid-cols-3 gap-6">
                    {GENDER_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, gender: opt.value }))}
                        className={cn(
                          "py-5 rounded-2xl text-[9px] font-black tracking-widest uppercase border transition-all duration-500",
                          formData.gender === opt.value ? "bg-primary border-primary text-white shadow-xl" : "bg-white/5 border-white/10 text-white/20 hover:bg-white/10"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.gender && <p className="text-[9px] font-bold text-destructive tracking-widest uppercase">{errors.gender}</p>}
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full btn-luxury py-6 text-[10px] flex items-center justify-center gap-4"
                  >
                    {isSaving ? <AdminLoader size="sm" /> : <>CREATE PROTOCOL <ChevronRight className="h-5 w-5" /></>}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;
