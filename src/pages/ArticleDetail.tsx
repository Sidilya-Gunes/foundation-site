
import React, { useEffect, useState } from 'react';
import { getArticleBySlug } from '../services/api';

interface ArticleDetailProps {
  slug: string;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ slug }) => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const data = await getArticleBySlug(slug);
      setArticle(data);
      setLoading(false);
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-purple-900"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">
        Yazı bulunamadı.
      </div>
    );
  }

  const imageUrl = article.coverImage?.url 
    ? `http://localhost:1337${article.coverImage.url}` 
    : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop';

  return (
    <article className="min-h-screen bg-white pt-24 pb-20 animate-in fade-in duration-700">
      {/* Hero Image */}
      <div className="h-[40vh] md:h-[50vh] w-full relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 bg-brand-yellow-400 text-brand-purple-900 text-xs font-bold uppercase tracking-widest rounded mb-4">
             {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm font-medium text-white/80">
            <span>{article.publishedDate || 'Tarih yok'}</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span>{article.author || 'TJA'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-purple mx-auto text-gray-600 leading-relaxed font-light">
           {/* Simple rendering for now. If blocks, need a renderer. Assuming text for simplicity or Blocks renderer if complex. 
               For now, displaying description/content directly if string. 
               If Strapi sends Blocks, we generally need a blocks renderer. 
               Let's assume content is rich text or blocks JSON. 
               I'll do a simple check. */}
           {Array.isArray(article.content) ? (
             article.content.map((block: any, idx: number) => {
               if (block.type === 'paragraph') {
                 return <p key={idx}>{block.children.map((c: any) => c.text).join('')}</p>;
               }
                if (block.type === 'heading') {
                  const Tag = ('h' + block.level) as any;
                  return <Tag key={idx} className="font-serif font-bold text-brand-purple-900">{block.children.map((c: any) => c.text).join('')}</Tag>;
                }
               return null;
             })
           ) : (
             <div dangerouslySetInnerHTML={{ __html: article.content }} />
           )}
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;
