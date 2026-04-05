"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Loader2, 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Image as ImageIcon,
  Tag,
  CheckCircle2,
  ChevronRight,
  Search,
  Filter,
  Cake,
  Weight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = ["signature", "classic", "bento"];
const TAG_OPTIONS = ["Birthday", "Cupcake", "Wedding", "Celebration", "Anniversary", "Vegan"];
const SIZE_OPTIONS = ["0.5kg", "1kg", "1.5kg", "2kg", "3kg"];

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  description: string;
  flavor: string;
  long_description: string;
  quantity_options: string[];
  tags: string[];
  is_best_seller: boolean;
}

export default function InventoryClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "signature",
    image_url: "",
    description: "",
    flavor: "",
    long_description: "",
    quantity_options: ["0.5kg", "1kg"],
    tags: [],
    is_best_seller: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Fetch Error:", error);
      setError("Failed to load inventory.");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setFormData({
      name: "",
      price: 0,
      category: "signature",
      image_url: "",
      description: "",
      flavor: "",
      long_description: "",
      quantity_options: ["0.5kg", "1kg"],
      tags: [],
      is_best_seller: false
    });
    setIsAddingNew(true);
    setEditingId(null);
  };

  const handleSave = async () => {
    setError(null);
    if (!formData.name || !formData.price) {
      setError("Name and Price are required.");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price)
    };

    if (editingId) {
      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingId);
      
      if (error) setError(error.message);
      else {
        setEditingId(null);
        fetchProducts();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([payload]);
      
      if (error) setError(error.message);
      else {
        setIsAddingNew(false);
        fetchProducts();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) setError(error.message);
    else fetchProducts();
  };

  const toggleTag = (tag: string) => {
    const currentTags = formData.tags || [];
    if (currentTags.includes(tag)) {
      setFormData({ ...formData, tags: currentTags.filter(t => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...currentTags, tag] });
    }
  };

  const toggleSize = (size: string) => {
    const currentSizes = formData.quantity_options || [];
    if (currentSizes.includes(size)) {
      setFormData({ ...formData, quantity_options: currentSizes.filter(s => s !== size) });
    } else {
      setFormData({ ...formData, quantity_options: [...currentSizes, size] });
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="font-headline text-4xl font-bold italic text-on-surface">Kitchen Inventory</h1>
          <p className="text-stone-500 mt-2 font-medium italic opacity-70">Manage your collection of artisanal masterpieces</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-stone-100 rounded-2xl pl-12 pr-6 py-3 text-sm focus:ring-4 focus:ring-primary/10 transition-all outline-none w-64 shadow-sm"
            />
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-premium hover:shadow-2xl transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Masterpiece
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-2">
          <X className="w-4 h-4" onClick={() => setError(null)} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-premium group hover:border-primary/20 transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-stone-50">
                <img 
                  src={product.image_url || "/images/placeholder-cake.png"} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-white/50 shadow-lg">
                    {product.category}
                  </div>
                </div>
              </div>

              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline text-2xl italic font-bold text-on-surface line-clamp-1">{product.name}</h3>
                    <p className="text-stone-400 font-bold text-xs uppercase tracking-widest mt-1 italic">{product.flavor}</p>
                  </div>
                  <span className="font-bold text-primary italic text-xl">₹{product.price}</span>
                </div>

                <p className="text-stone-500 text-sm italic font-medium leading-relaxed line-clamp-2 mb-6">
                  {product.description}
                </p>

                <div className="space-y-4 mb-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags?.map((tag) => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-stone-50 rounded-full text-[10px] font-bold text-stone-500">
                        <Tag className="w-3 h-3" /> {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Sizes */}
                  <div className="flex flex-wrap gap-2">
                    {product.quantity_options?.map((size) => (
                      <span key={size} className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 rounded-full text-[10px] font-bold text-primary italic">
                        <Weight className="w-3 h-3" /> {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="flex-grow flex items-center justify-center gap-2 p-4 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-2xl transition-all font-bold text-sm active:scale-95"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Details
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-4 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-2xl transition-all active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Slide-over Form Container */}
      <AnimatePresence>
        {(editingId || isAddingNew) && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setEditingId(null); setIsAddingNew(false); }}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                <div>
                  <h2 className="font-headline text-3xl font-bold italic text-on-surface">
                    {editingId ? "Refine Creation" : "New Masterpiece"}
                  </h2>
                  <p className="text-sm text-stone-500 font-medium italic opacity-60">
                    Drafting your next artisanal success
                  </p>
                </div>
                <button 
                  onClick={() => { setEditingId(null); setIsAddingNew(false); }}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-stone-100 transition-colors"
                >
                  <X className="w-6 h-6 text-stone-400" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-12 space-y-10 custom-scrollbar">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Product Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        placeholder="e.g. Midnight Truffle"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Price (₹)</label>
                      <input 
                        type="number" 
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Category</label>
                       <select 
                         value={formData.category}
                         onChange={(e) => setFormData({...formData, category: e.target.value})}
                         className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                       >
                         {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Lead Flavor</label>
                      <input 
                        type="text" 
                        value={formData.flavor}
                        onChange={(e) => setFormData({...formData, flavor: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        placeholder="e.g. Belgian Dark"
                      />
                    </div>
                  </div>
                </div>

                {/* Imagery */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Image URL</label>
                  <div className="flex gap-4">
                    <div className="flex-grow relative">
                      <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input 
                        type="text" 
                        value={formData.image_url}
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-14 pr-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        placeholder="Full image path..."
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Short Appetizer</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 font-medium text-stone-600 focus:ring-4 focus:ring-primary/5 outline-none transition-all min-h-[100px] resize-none"
                      placeholder="One sentence hook..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Story & Details</label>
                    <textarea 
                      value={formData.long_description}
                      onChange={(e) => setFormData({...formData, long_description: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 font-medium text-stone-600 focus:ring-4 focus:ring-primary/5 outline-none transition-all min-h-[160px] resize-none"
                      placeholder="Full product story..."
                    />
                  </div>
                </div>

                {/* Options & Tags */}
                <div className="grid grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Available Portions</label>
                      <div className="flex flex-wrap gap-2">
                         {SIZE_OPTIONS.map(size => (
                           <button 
                             key={size}
                             onClick={() => toggleSize(size)}
                             className={cn(
                               "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                               formData.quantity_options?.includes(size)
                                 ? "bg-primary text-white border-primary shadow-lg"
                                 : "bg-white text-stone-400 border-stone-100 hover:border-primary/20"
                             )}
                           >
                             {size}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 ml-1">Event Tags</label>
                      <div className="flex flex-wrap gap-2">
                         {TAG_OPTIONS.map(tag => (
                           <button 
                             key={tag}
                             onClick={() => toggleTag(tag)}
                             className={cn(
                               "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                               formData.tags?.includes(tag)
                                 ? "bg-stone-800 text-white border-stone-800 shadow-lg"
                                 : "bg-white text-stone-400 border-stone-100 hover:border-primary/20"
                             )}
                           >
                             {tag}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-4 py-6">
                   <input 
                     type="checkbox" 
                     id="bestseller"
                     checked={formData.is_best_seller}
                     onChange={(e) => setFormData({...formData, is_best_seller: e.target.checked})}
                     className="w-5 h-5 rounded-lg text-primary focus:ring-primary border-stone-200"
                   />
                   <label htmlFor="bestseller" className="text-sm font-bold text-stone-600 italic select-none cursor-pointer">
                     Mark as Chef's Signature Recommendation
                   </label>
                </div>
              </div>

              <div className="p-8 border-t border-stone-100 bg-stone-50/50 flex gap-4">
                 <button 
                   onClick={() => { setEditingId(null); setIsAddingNew(false); }}
                   className="flex-grow flex items-center justify-center gap-2 p-5 bg-white border border-stone-100 text-stone-400 rounded-3xl transition-all font-bold text-sm hover:bg-stone-50 active:scale-95"
                 >
                   Discard Draft
                 </button>
                 <button 
                   onClick={handleSave}
                   className="flex-grow-[2] flex items-center justify-center gap-2 p-5 bg-primary text-white rounded-3xl shadow-premium transition-all font-bold text-sm hover:shadow-2xl active:scale-95"
                 >
                   <Save className="w-5 h-5" /> 
                   {editingId ? "Update Creation" : "Launch Masterpiece"}
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
