export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  tags: string[];
  isTrending: boolean;
  isFeatured: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}
