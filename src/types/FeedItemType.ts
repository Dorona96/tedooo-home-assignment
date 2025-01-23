export interface FeedItemType {
    id: string;
    username: string;
    shopName: string;
    date: string; 
    avatar: string; 
    text: string;
    images: string[];
    likes: number;
    didLike: boolean;
    comments: number;
}
