import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Save, LogOut, ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';

const API = 'http://localhost:5001/api';

const Admin = () => {
  const { user, isAdmin, token, logout, loading } = useAdmin();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [content, setContent] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', region: 'گیلان', category: 'سیاه', description: '', image: '', stock: 10, rating: 4.5
  });

  const [editingContent, setEditingContent] = useState({});

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchAll = async () => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [prods, cont, ords] = await Promise.all([
        axios.get(`${API}/products`),
        axios.get(`${API}/content`),
        axios.get(`${API}/orders`, { headers })
      ]);
      setProducts(prods.data);
      setContent(cont.data);
      setEditingContent(cont.data);
      setOrders(ords.data);
    } catch (err) {
      // fallback demo data
      setProducts([
        { id: 1, name: "چای سیاه ممتاز گیلان", price: 185000, region: "گیلان", category: "سیاه", image: "https://picsum.photos/id/1015/600/600", description: "...", stock: 45, rating: 4.8 },
        { id: 2, name: "چای سبز ارگانیک بوشهر", price: 165000, region: "بوشهر", category: "سبز", image: "https://picsum.photos/id/106/600/600", description: "...", stock: 32, rating: 4.6 }
      ]);
      setContent({ heroTitle: "چای جاویدان", heroSubtitle: "طعم اصیل ایرانی در هر فنجان", aboutText: "...", heroImage: "https://picsum.photos/id/1018/2000/1200" });
      setEditingContent({ heroTitle: "چای جاویدان", heroSubtitle: "طعم اصیل ایرانی در هر فنجان", aboutText: "...", heroImage: "https://picsum.photos/id/1018/2000/1200" });
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [token]);

  // PRODUCT MANAGEMENT
  const saveProduct = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      if (editingProduct) {
        await axios.put(`${API}/products/${editingProduct.id}`, editingProduct, { headers });
        toast.success('محصول ویرایش شد');
      } else {
        const prod = { ...newProduct, price: parseInt(newProduct.price) || 0 };
        await axios.post(`${API}/products`, prod, { headers });
        toast.success('محصول جدید اضافه شد');
        setNewProduct({ name: '', price: '', region: 'گیلان', category: 'سیاه', description: '', image: '', stock: 10, rating: 4.5 });
      }
      await fetchAll();
      setEditingProduct(null);
    } catch (e) {
      toast.error('خطا در ذخیره');
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('آیا مطمئنید؟')) return;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(`${API}/products/${id}`, { headers });
      await fetchAll();
      toast.success('محصول حذف شد');
    } catch {
      toast.error('حذف ممکن نبود');
    }
  };

  const startEdit = (product) => {
    setEditingProduct({ ...product });
  };

  // FILE UPLOAD
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' };
    const res = await axios.post(`${API}/upload`, formData, { headers });
    return res.data.url;
  };

  const deleteImage = async (filename) => {
    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(`${API}/upload/${filename}`, { headers });
  };

  const handleImageUpload = async (e, isEdit) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      toast.loading('در حال آپلود تصویر...');
      const url = await uploadImage(file);
      toast.dismiss();
      toast.success('تصویر آپلود شد');
      if (isEdit && editingProduct) {
        setEditingProduct({ ...editingProduct, image: url });
      } else {
        setNewProduct({ ...newProduct, image: url });
      }
    } catch (err) {
      toast.dismiss();
      toast.error('خطا در آپلود تصویر');
    }
  };

  const handleRemoveImage = async (isEdit) => {
    const current = isEdit ? editingProduct : newProduct;
    if (!current.image) return;
    const filename = current.image.split('/').pop();
    try {
      await deleteImage(filename);
      if (isEdit) {
        setEditingProduct({ ...editingProduct, image: '' });
      } else {
        setNewProduct({ ...newProduct, image: '' });
      }
      toast.success('تصویر حذف شد');
    } catch (err) {
      // If delete fails (e.g. external URL), just clear the field
      if (isEdit) {
        setEditingProduct({ ...editingProduct, image: '' });
      } else {
        setNewProduct({ ...newProduct, image: '' });
      }
    }
  };

  // CONTENT MANAGEMENT
  const saveContent = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.put(`${API}/content`, editingContent, { headers });
      setContent(editingContent);
      toast.success('محتوای سایت بروزرسانی شد');
    } catch (e) {
      toast.error('خطا در بروزرسانی');
    }
  };

  if (loading || !user) {
    return <div className="pt-28 p-12 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link to="/" className="flex items-center gap-2 text-sm text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 mb-1">
            <ArrowLeft className="w-4 h-4" /> بازگشت به سایت
          </Link>
          <h1 className="text-4xl tracking-tighter font-semibold text-gold-900 dark:text-gold-300">پنل مدیریت</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-right">
            <div className="font-medium">{user?.name || user?.email}</div>
            <div className="text-xs text-gold-600 dark:text-gold-400">مدیر</div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm border border-gold-200 dark:border-[#3D3630] hover:bg-red-50 hover:border-red-200 text-red-600 rounded-2xl">
            <LogOut className="w-4 h-4" /> خروج
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gold-200 mb-8">
        {[
          { id: 'products', label: 'محصولات' },
          { id: 'content', label: 'محتوای سایت' },
          { id: 'orders', label: 'سفارش‌ها' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`px-8 py-3 text-sm font-medium border-b-2 transition ${activeTab === tab.id ? 'border-gold-700 text-gold-800 dark:text-gold-300' : 'border-transparent text-gold-600 dark:text-gold-400'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between mb-6">
            <div className="font-semibold text-xl">مدیریت محصولات ({products.length})</div>
            <button 
              onClick={() => setEditingProduct(null)} 
              className="flex items-center gap-2 px-5 py-2 text-sm bg-gold-700 text-white rounded-2xl"
            >
              <Plus className="w-4 h-4" /> محصول جدید
            </button>
          </div>

          {/* New/Edit Form */}
          {(editingProduct || true) && (
            <div className="admin-card mb-8">
              <div className="font-medium mb-5">{editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="نام محصول" value={editingProduct ? editingProduct.name : newProduct.name} onChange={e => editingProduct ? setEditingProduct({...editingProduct, name: e.target.value}) : setNewProduct({...newProduct, name: e.target.value})} className="col-span-2 md:col-span-1" />
                
                <input placeholder="قیمت" type="number" value={editingProduct ? editingProduct.price : newProduct.price} onChange={e => editingProduct ? setEditingProduct({...editingProduct, price: parseInt(e.target.value)}) : setNewProduct({...newProduct, price: e.target.value})} />

                <select value={editingProduct ? editingProduct.region : newProduct.region} onChange={e => editingProduct ? setEditingProduct({...editingProduct, region: e.target.value}) : setNewProduct({...newProduct, region: e.target.value})}>
                  <option>گیلان</option>
                  <option>بوشهر</option>
                </select>

                <select value={editingProduct ? editingProduct.category : newProduct.category} onChange={e => editingProduct ? setEditingProduct({...editingProduct, category: e.target.value}) : setNewProduct({...newProduct, category: e.target.value})}>
                  <option>سیاه</option>
                  <option>سبز</option>
                  <option>سفید</option>
                  <option>طعم‌دار</option>
                </select>

                <input placeholder="URL تصویر" value={editingProduct ? editingProduct.image : newProduct.image} onChange={e => editingProduct ? setEditingProduct({...editingProduct, image: e.target.value}) : setNewProduct({...newProduct, image: e.target.value})} className="col-span-2" />

                {/* Image Upload */}
                <div className="col-span-2">
                  <label className="text-xs text-gold-600 dark:text-gold-400 block mb-2">یا آپلود تصویر</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 text-sm border border-gold-200 dark:border-[#3D3630] rounded-xl hover:bg-gold-50 dark:hover:bg-gold-950 cursor-pointer transition">
                      <Upload className="w-4 h-4" />
                      انتخاب فایل
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, !!editingProduct)} className="hidden" />
                    </label>
                    {(editingProduct?.image || newProduct.image) && (
                      <div className="flex items-center gap-2">
                        <img src={editingProduct?.image || newProduct.image} alt="پیش‌نمایش" className="w-16 h-16 object-cover rounded-xl border border-gold-200 dark:border-[#3D3630]" />
                        <button onClick={() => handleRemoveImage(!!editingProduct)} className="text-red-400 hover:text-red-500 p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <textarea placeholder="توضیحات" value={editingProduct ? editingProduct.description : newProduct.description} onChange={e => editingProduct ? setEditingProduct({...editingProduct, description: e.target.value}) : setNewProduct({...newProduct, description: e.target.value})} className="col-span-2" rows="2"></textarea>
              </div>
              <div className="mt-5">
                <button onClick={saveProduct} className="btn-gold px-9">{editingProduct ? 'ذخیره تغییرات' : 'افزودن محصول'}</button>
                {editingProduct && <button onClick={() => setEditingProduct(null)} className="ml-3 text-sm px-4 py-3">انصراف</button>}
              </div>
            </div>
          )}

          {/* Products List */}
          <div className="admin-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gold-500 dark:text-gold-400">
                    <th className="pb-3 text-right">نام</th>
                    <th className="pb-3">قیمت</th>
                    <th className="pb-3">استان</th>
                    <th className="pb-3">نوع</th>
                    <th className="pb-3">موجودی</th>
                    <th className="pb-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod.id} className="border-b border-gold-100 dark:border-[#3D3630] last:border-0">
                      <td className="py-4 pr-3 font-medium">{prod.name}</td>
                      <td>{prod.price?.toLocaleString('fa-IR')}</td>
                      <td><span className="px-3 py-0.5 bg-gold-100 dark:bg-gold-950 text-gold-700 dark:text-gold-400 rounded text-xs">{prod.region}</span></td>
                      <td>{prod.category}</td>
                      <td>{prod.stock}</td>
                      <td>
                        <div className="flex gap-3">
                          <button onClick={() => startEdit(prod)} className="text-gold-600 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-300"><Edit2 size={16} /></button>
                          <button onClick={() => deleteProduct(prod.id)} className="text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT TAB */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="admin-card">
            <div className="font-medium mb-5 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> بخش هیرو (صفحه اصلی)
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">عنوان هیرو</label>
                <input value={editingContent.heroTitle || ''} onChange={e => setEditingContent({...editingContent, heroTitle: e.target.value})} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">زیرعنوان هیرو</label>
                <input value={editingContent.heroSubtitle || ''} onChange={e => setEditingContent({...editingContent, heroSubtitle: e.target.value})} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">تصویر هیرو</label>
                <div className="flex items-center gap-3">
                  <input value={editingContent.heroImage || ''} onChange={e => setEditingContent({...editingContent, heroImage: e.target.value})} className="w-full" placeholder="URL تصویر" />
                  <label className="flex items-center gap-2 px-4 py-2 text-sm border border-gold-200 dark:border-[#3D3630] rounded-xl hover:bg-gold-50 dark:hover:bg-gold-950 cursor-pointer transition shrink-0">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      try {
                        toast.loading('در حال آپلود...');
                        const formData = new FormData();
                        formData.append('image', file);
                        const res = await axios.post(`${API}/upload`, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
                        setEditingContent({...editingContent, heroImage: res.data.url});
                        toast.dismiss();
                        toast.success('آپلود شد');
                      } catch { toast.dismiss(); toast.error('خطا'); }
                    }} className="hidden" />
                  </label>
                </div>
                {editingContent.heroImage && (
                  <img src={editingContent.heroImage} alt="پیش‌نمایش" className="mt-3 w-full h-40 object-cover rounded-xl border border-gold-200 dark:border-[#3D3630]" />
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="admin-card">
            <div className="font-medium mb-5">بخش درباره ما</div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">عنوان</label>
                <input value={editingContent.aboutTitle || ''} onChange={e => setEditingContent({...editingContent, aboutTitle: e.target.value})} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">متن درباره ما</label>
                <textarea value={editingContent.aboutText || ''} onChange={e => setEditingContent({...editingContent, aboutText: e.target.value})} className="w-full" rows={4} />
              </div>
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">تصویر درباره ما</label>
                <div className="flex items-center gap-3">
                  <input value={editingContent.aboutImage || ''} onChange={e => setEditingContent({...editingContent, aboutImage: e.target.value})} className="w-full" placeholder="URL تصویر" />
                  <label className="flex items-center gap-2 px-4 py-2 text-sm border border-gold-200 dark:border-[#3D3630] rounded-xl hover:bg-gold-50 dark:hover:bg-gold-950 cursor-pointer transition shrink-0">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      try {
                        toast.loading('در حال آپلود...');
                        const formData = new FormData();
                        formData.append('image', file);
                        const res = await axios.post(`${API}/upload`, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
                        setEditingContent({...editingContent, aboutImage: res.data.url});
                        toast.dismiss();
                        toast.success('آپلود شد');
                      } catch { toast.dismiss(); toast.error('خطا'); }
                    }} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Why Us Section */}
          <div className="admin-card">
            <div className="font-medium mb-5">بخش چرا ما</div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">عنوان</label>
                <input value={editingContent.whyUsTitle || ''} onChange={e => setEditingContent({...editingContent, whyUsTitle: e.target.value})} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">متن توضیحی</label>
                <textarea value={editingContent.whyUsText || ''} onChange={e => setEditingContent({...editingContent, whyUsText: e.target.value})} className="w-full" rows={3} />
              </div>
            </div>
          </div>

          {/* Contact & Footer */}
          <div className="admin-card">
            <div className="font-medium mb-5">اطلاعات تماس و فوتر</div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">شماره تلفن</label>
                  <input value={editingContent.contactPhone || ''} onChange={e => setEditingContent({...editingContent, contactPhone: e.target.value})} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">ایمیل</label>
                  <input value={editingContent.contactEmail || ''} onChange={e => setEditingContent({...editingContent, contactEmail: e.target.value})} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">آدرس</label>
                  <input value={editingContent.contactAddress || ''} onChange={e => setEditingContent({...editingContent, contactAddress: e.target.value})} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">اینستاگرام</label>
                  <input value={editingContent.instagram || ''} onChange={e => setEditingContent({...editingContent, instagram: e.target.value})} className="w-full" placeholder="@chaijavidan" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">متن فوتر</label>
                <input value={editingContent.footerText || ''} onChange={e => setEditingContent({...editingContent, footerText: e.target.value})} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gold-600 dark:text-gold-400 block mb-1">متن خبرنامه</label>
                <input value={editingContent.newsletterText || ''} onChange={e => setEditingContent({...editingContent, newsletterText: e.target.value})} className="w-full" />
              </div>
            </div>
          </div>

          <button onClick={saveContent} className="btn-gold flex items-center gap-2 px-8">
            <Save size={16} /> ذخیره تمام تغییرات
          </button>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div>
          <div className="font-medium mb-6">سفارش‌های دریافتی</div>
          {orders.length === 0 ? (
            <div className="text-gold-500 text-sm">هنوز سفارشی ثبت نشده است.</div>
          ) : (
            <div className="admin-card">
              {orders.map(order => (
                <div key={order.id} className="border-b border-gold-100 dark:border-[#3D3630] py-4 last:border-none flex justify-between items-center">
                  <div>
                    <div className="font-medium">{order.name || 'مشتری'}</div>
                    <div className="text-xs text-gold-500 dark:text-gold-400">{new Date(order.date).toLocaleDateString('fa-IR')}</div>
                  </div>
                  <div className="text-right">
                    <div>{order.total?.toLocaleString('fa-IR') || '—'} تومان</div>
                    <div className="text-xs text-emerald-600">{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
