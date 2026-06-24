"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const modelMap: Record<string, string[]> = {
  Men: [
    "Polo T-Shirts",
    "Round Neck T-Shirts",
    "Casual Shirts",
    "Formal Shirts",
    "Casual Trousers",
    "Formal Trousers",
    "Jeans",
    "Cargos",
  ],
  Women: [
    "Dresses",
    "Tops",
    "Jeans",
    "Formal Shirts",
    "Formal Trousers",
  ]
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subcategory: "Polo T-Shirts",
    brand: "",
    material: "",
    sizes: "",
    colors: "",
    images: "",
  });

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        toast.error("Please login first");
        router.push("/");
        return;
      }
      try {
        const user = JSON.parse(userStr);
        if (!user.isAdmin) {
          toast.error("Access denied. Admin only.");
          router.push("/");
        }
      } catch (e) {
        router.push("/");
      }
    };
    checkAdmin();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset subcategory when category changes to pick the first valid option
      ...(name === "category" ? { subcategory: modelMap[value][0] } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      const payload = {
        ...formData,
        sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
        colors: formData.colors.split(",").map(c => c.trim()).filter(Boolean),
        images: formData.images.split(",").map(i => i.trim()).filter(Boolean),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Product added successfully!");
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "Men",
          subcategory: "Polo T-Shirts",
          brand: "",
          material: "",
          sizes: "",
          colors: "",
          images: "",
        });
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8 pt-24 text-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => router.push("/admin/orders")}
              className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-black transition font-medium flex-1 md:flex-none text-center"
            >
              Manage Orders
            </button>
            <button 
              onClick={() => router.push("/")}
              className="text-sm border border-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-100 transition font-medium flex-1 md:flex-none text-center whitespace-nowrap"
            >
              Back to Store
            </button>
          </div>
        </div>

        {/* Top Level Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Revenue", value: "₹45,231" },
            { label: "Total Orders", value: "342" },
            { label: "Total Products", value: "128" },
            { label: "Total Customers", value: "892" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 flex flex-col items-start">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-serif text-zinc-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200">
          <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  required
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subcategory</label>
                <select 
                  name="subcategory" 
                  value={formData.subcategory} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  required
                >
                  {modelMap[formData.category].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  required
                  placeholder="e.g. Classic Black T-Shirt"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Image URLs (comma separated)</label>
                <input 
                  type="text" 
                  name="images" 
                  value={formData.images} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  required
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Brand (Optional)</label>
                <input 
                  type="text" 
                  name="brand" 
                  value={formData.brand} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Dress UP!"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Material (Optional)</label>
                <input 
                  type="text" 
                  name="material" 
                  value={formData.material} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="100% Cotton"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sizes (comma separated)</label>
                <input 
                  type="text" 
                  name="sizes" 
                  value={formData.sizes} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="S, M, L, XL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Colors (comma separated)</label>
                <input 
                  type="text" 
                  name="colors" 
                  value={formData.colors} 
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Black, White, Navy"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Premium quality product..."
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-black text-white font-bold py-4 rounded-md tracking-widest hover:bg-zinc-800 transition disabled:opacity-50"
              >
                {loading ? "ADDING PRODUCT..." : "ADD PRODUCT TO STORE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
