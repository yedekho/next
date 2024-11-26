import React, { useState, useRef } from 'react';
import { Pin } from 'lucide-react';
import toast from 'react-hot-toast';

interface PublishFormProps {
  onPublish: (data: { url: string; content: string; images: File[] }) => void;
}

export default function PublishForm({ onPublish }: PublishFormProps) {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (files.length !== imageFiles.length) {
      toast.error('Only image files are allowed');
      return;
    }
    
    setImages(prev => [...prev, ...imageFiles]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPublish({ url, content, images });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Hii</h1>
      
      <div className="mb-6">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/yourURL"
          className="w-full px-4 py-2 rounded-full bg-black text-white placeholder-gray-400"
        />
      </div>

      <div className="relative mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing what's in your brain 🧠 😊"
          className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Pin className="w-5 h-5" />
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Upload ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
              <button
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors"
      >
        Publish
      </button>
    </div>
  );
}