'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Save, X, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default function NewCampaignPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    target_amount: '',
    end_date: '',
    summary: '',
    cover_image_url: '',
    is_urgent: false,
    status: 'DRAFT'
  })

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Tulis detail lengkap kampanye di sini...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] border border-gray-200 rounded-xl p-4 bg-white',
      },
    },
  })

  // Simple auto-slug generator
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const description = editor?.getHTML() || ''
      const slug = generateSlug(formData.title)

      const { error } = await supabase.from('campaigns').insert({
        title: formData.title,
        slug: slug,
        target_amount: Number(formData.target_amount),
        end_date: formData.end_date,
        summary: formData.summary,
        description: description,
        cover_image_url: formData.cover_image_url,
        is_urgent: formData.is_urgent,
        status: formData.status
      })

      if (error) throw error

      router.push('/admin/campaigns')
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan saat menyimpan kampanye.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buat Kampanye Baru</h1>
          <p className="text-gray-500 mt-1">Lengkapi detail kampanye untuk mulai menggalang dana.</p>
        </div>
        <Link href="/admin/campaigns" className="text-gray-500 hover:text-gray-700 p-2">
          <X className="w-6 h-6" />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h2 className="font-semibold text-lg border-b pb-2">Informasi Dasar</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kampanye</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Contoh: Bantuan Air Bersih Pelosok"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Dana (Rp)</label>
              <input 
                required
                type="number" 
                value={formData.target_amount}
                onChange={(e) => setFormData({...formData, target_amount: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="100000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batas Waktu (End Date)</label>
              <input 
                required
                type="date" 
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan Pendek (Summary)</label>
            <textarea 
              required
              maxLength={250}
              value={formData.summary}
              onChange={(e) => setFormData({...formData, summary: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              rows={2}
              placeholder="Penjelasan singkat untuk tampil di kartu..."
            />
          </div>
        </div>

        {/* Media & Content */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h2 className="font-semibold text-lg border-b pb-2">Media & Deskripsi (Tiptap)</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Cover Image</label>
            <div className="flex gap-2">
              <input 
                required
                type="url" 
                value={formData.cover_image_url}
                onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="https://images.unsplash.com/... (Gunakan Unsplash untuk mock)"
              />
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cerita Lengkap Kampanye</label>
            {/* Tiptap Toolbar */}
            <div className="flex gap-2 mb-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-1.5 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}><b>B</b></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-1.5 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}><i>I</i></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded ${editor?.isActive('heading') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}>H2</button>
            </div>
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
          <h2 className="font-semibold text-lg border-b pb-2">Pengaturan Publikasi</h2>
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              id="is_urgent"
              checked={formData.is_urgent}
              onChange={(e) => setFormData({...formData, is_urgent: e.target.checked})}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            <label htmlFor="is_urgent" className="text-sm font-medium text-gray-700 cursor-pointer">
              Tandai sebagai Kampanye Mendesak (Urgent)
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status Publikasi</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Menyimpan...' : (
              <><Save className="w-5 h-5" /> Simpan Kampanye</>
            )}
          </button>
        </div>

      </form>
    </div>
  )
}
