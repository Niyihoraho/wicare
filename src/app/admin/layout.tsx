import Link from 'next/link';
import { ReactNode } from 'react';
import { Calendar, Video, FileText } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Sub-Navigation */}
      <div className="bg-white border-b border-gray-200 mt-[73px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 py-4 overflow-x-auto">
            <Link 
              href="/admin/booking" 
              className="flex items-center gap-2 text-brand-navy font-semibold hover:text-brand-gold transition-colors whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              Bookings
            </Link>
            <Link 
              href="/admin/blogs" 
              className="flex items-center gap-2 text-brand-navy font-semibold hover:text-brand-gold transition-colors whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              Blogs
            </Link>
            <Link 
              href="/admin/videos" 
              className="flex items-center gap-2 text-brand-navy font-semibold hover:text-brand-gold transition-colors whitespace-nowrap"
            >
              <Video className="w-4 h-4" />
              Videos
            </Link>
          </div>
        </div>
      </div>
      
      {/* Page Content */}
      <div className="flex-grow relative">
        {children}
      </div>
    </div>
  );
}
