// Random car image generator - using multiple reliable sources
export const getRandomCarImage = (make?: string, model?: string): string => {
  // Generate unique seed based on make/model or random
  const seed = make && model 
    ? `${make}-${model}`.toLowerCase().replace(/\s+/g, '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : Math.floor(Math.random() * 10000);
  
  // Use Picsum Photos with seed for consistent random images
  // This ensures same car always gets same image
  return `https://picsum.photos/seed/car${seed}/600/400`;
};

// Alternative car image URLs from reliable CDN sources
const carImageUrls = [
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop',
];

// Get random car image from predefined list
export const getRandomCarImageFromList = (make?: string, model?: string): string => {
  const index = make && model
    ? `${make}${model}`.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % carImageUrls.length
    : Math.floor(Math.random() * carImageUrls.length);
  return carImageUrls[index];
};
