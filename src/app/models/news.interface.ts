export interface NewsArticle {
    id: number;
    title: string;
    url: string;
    image_url: string | null;
    news_site: string;
    summary: string | null;
    published_at: Date;
    updated_at: Date;
    featured: boolean;
}