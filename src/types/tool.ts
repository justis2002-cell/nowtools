export type Category = 
  | 'all'
  | 'ai-tool'
  | 'ai-image'
  | 'ai-video'
  | 'ai-video-edit'
  | 'ai-music'
  | 'ai-coding'
  | 'ai-auto'
  | 'design'
  | 'font'
  | 'image-edit'
  | 'free-source'
  | 'sns'
  | 'productivity'
  | 'hosting'
  | 'conversion'
  | 'education'
  | 'ai-writing'
  | 'ai-presentation'
  | 'ai-language';

export type Badge = 'free' | 'paid' | 'freemium';

export interface Tool {
  id: string;
  name: string;
  category: Category;
  description: string;
  badge: Badge;
  link: string;
  logo: string;
}
