export type Category = {
  slug: string;
  name: string;
  emoji: string;
  tint: string;
  description?: string;
  image?: string;
};

export const categories: Category[] = [
  { slug: "animals", name: "Animals", emoji: "🐘", tint: "from-blue/40 to-blue/10" },
  { slug: "dinosaurs", name: "Dinosaurs", emoji: "🦕", tint: "from-green/40 to-green/10" },
  { slug: "cartoon-characters", name: "Cartoon Characters", emoji: "🦸", tint: "from-pink/40 to-pink/10" },
  { slug: "religious-idols", name: "Religious Idols", emoji: "🕉️", tint: "from-yellow/50 to-yellow/10" },
  { slug: "fridge-magnets", name: "Fridge Magnets", emoji: "🧲", tint: "from-pink/40 to-yellow/10" },
  { slug: "home-decor", name: "Home Decor", emoji: "🏡", tint: "from-blue/40 to-pink/10" },
  { slug: "mini-toys", name: "Mini Toys", emoji: "🧸", tint: "from-yellow/40 to-pink/10" },
  { slug: "keychains", name: "Keychains", emoji: "🔑", tint: "from-green/40 to-blue/10" },
  { slug: "festival-collection", name: "Festival Collection", emoji: "🎉", tint: "from-pink/50 to-yellow/20" },
  { slug: "diy-kits", name: "DIY Kits", emoji: "🎨", tint: "from-brand/40 to-blue/10" },
];

export type Product = {
  slug: string;
  img: string;
  imgAlt?: string;
  gallery?: string[];
  name: string;
  desc: string;
  /** Lexical rich text from Payload (optional). */
  description?: unknown;
  price: string;
  colors: string[];
  sizes: string[];
  rating: number;
  featured?: boolean;
  whatsappMessage?: string;
  category: { slug: string; name: string };
  seo?: { title?: string; description?: string };
};

export const products: Product[] = [
  { slug: "magical-unicorn", img: "/images/p-unicorn.jpg", name: "Magical Unicorn", desc: "Hand-cast POP unicorn with golden horn detail.", price: "₹349", colors: ["#FF8FB8", "#FFD166", "#7C5CFC"], sizes: ["S", "M", "L"], rating: 4.9, featured: true, category: { slug: "animals", name: "Animals" } },
  { slug: "mighty-dino", img: "/images/p-dino.jpg", name: "Mighty Dino", desc: "Roar-worthy dinosaur figurine ready for paint.", price: "₹299", colors: ["#7ED957", "#FFD166", "#5ED3F3"], sizes: ["M", "L"], rating: 4.8, featured: true, category: { slug: "dinosaurs", name: "Dinosaurs" } },
  { slug: "fridge-magnet-set", img: "/images/p-magnets.jpg", name: "Fridge Magnet Set", desc: "Set of 8 cute magnets — fruits, animals & more.", price: "₹499", colors: ["#FF8FB8", "#7ED957", "#FFD166"], sizes: ["8 pcs"], rating: 4.9, featured: true, category: { slug: "fridge-magnets", name: "Fridge Magnets" } },
  { slug: "mini-ganesha-idol", img: "/images/p-idol.jpg", name: "Mini Ganesha Idol", desc: "Eco-friendly POP idol for home & gifting.", price: "₹599", colors: ["#FF6B35", "#FFD166", "#7C5CFC"], sizes: ["S", "M"], rating: 5.0, featured: true, category: { slug: "religious-idols", name: "Religious Idols" } },
  { slug: "cartoon-pals-pack", img: "/images/p-cartoon.jpg", name: "Cartoon Pals Pack", desc: "A bundle of adorable cartoon figurines.", price: "₹449", colors: ["#FF8FB8", "#5ED3F3", "#FFD166"], sizes: ["6 pcs"], rating: 4.7, featured: true, category: { slug: "cartoon-characters", name: "Cartoon Characters" } },
  { slug: "keychain-charms", img: "/images/p-keychain.jpg", name: "Keychain Charms", desc: "Tiny painted charms for bags & keys.", price: "₹199", colors: ["#FF8FB8", "#5ED3F3", "#FFD166"], sizes: ["4 pcs"], rating: 4.8, featured: true, category: { slug: "keychains", name: "Keychains" } },
];

export const whyUs = [
  { icon: "🛡️", title: "Safe Materials", desc: "Non-toxic, child-friendly POP & paints." },
  { icon: "✋", title: "Handmade", desc: "Crafted with care, batch by batch." },
  { icon: "🎨", title: "Creative Learning", desc: "Boost focus, fine motor & creativity." },
  { icon: "📵", title: "Screen-Free Fun", desc: "An unplugged hobby kids actually love." },
  { icon: "🧘", title: "Stress Relief", desc: "Therapeutic painting for adults too." },
  { icon: "👨‍👩‍👧", title: "Family Activity", desc: "Bond, paint, and create together." },
  { icon: "🎁", title: "Perfect Gift", desc: "Beautifully boxed, ready to gift." },
  { icon: "🇮🇳", title: "Made in India", desc: "Proudly handcrafted across India." },
];

export const steps = [
  { n: "01", title: "Choose Your Favorite Toy", desc: "Browse our collection and pick what you love." },
  { n: "02", title: "Message Us on WhatsApp", desc: "Tap the green button — we'll do the rest." },
  { n: "03", title: "We Confirm Your Order", desc: "Quick chat to confirm size, colours & address." },
  { n: "04", title: "Fast Delivery to Your Home", desc: "Lovingly packed and shipped pan-India." },
];

export const testimonials = [
  { name: "Aarti Sharma", role: "Mom of two, Pune", text: "My kids spent the entire weekend painting their unicorns. Zero screens, lots of giggles!", avatar: "AS" },
  { name: "Rahul Mehta", role: "Designer, Mumbai", text: "I gifted the Ganesha kit to my parents — they loved the quality and the box presentation.", avatar: "RM" },
  { name: "Priya Iyer", role: "Teacher, Bengaluru", text: "Used these as classroom activity. Calm, focused, happy kids. Highly recommend!", avatar: "PI" },
];

export const faqs = [
  { q: "How long does shipping take?", a: "We ship pan-India in 3–6 business days. Express options are available — just ask on WhatsApp." },
  { q: "Can I customize a kit?", a: "Absolutely. Tell us the occasion, colours or theme on WhatsApp and we'll craft a kit for you." },
  { q: "Do you take bulk / school orders?", a: "Yes — we love workshops, birthdays and school activity orders. Special pricing for 20+ kits." },
  { q: "Are painting instructions included?", a: "Every kit ships with an illustrated instruction card and paint guide." },
  { q: "What materials do you use?", a: "Premium plaster of Paris, non-toxic acrylic paints and soft-bristle brushes." },
  { q: "What is your return policy?", a: "Damaged in transit? Send us a photo on WhatsApp within 48 hours and we'll replace it free." },
];

export type Post = {
  slug: string;
  /** Lexical rich text from Payload (optional). */
  richBody?: unknown;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  cover: string;
  author: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "why-diy-painting-helps-kids",
    title: "Why DIY Painting Helps Kids More Than You Think",
    excerpt: "From fine motor development to stress relief — here's how painting POP toys gives children a screen-free creative boost.",
    body: "Painting handcrafted POP toys is more than a weekend activity — it builds focus, creativity and confidence. Children develop fine motor control by holding small brushes, learn colour theory by mixing shades, and improve patience by working on a single piece over hours.\n\nUnlike screen-based games, DIY painting is open-ended. There is no level, no leaderboard — only the satisfaction of seeing your idea come to life. Parents report calmer evenings, deeper conversations, and proud little artists displaying creations on their shelves.",
    date: "2026-05-12",
    cover: "/images/g1.jpg",
    author: "Team Chitrakala",
    tags: ["Parenting", "DIY", "Kids"],
  },
  {
    slug: "festival-gifting-with-handcrafted-idols",
    title: "Festival Gifting With Handcrafted POP Idols",
    excerpt: "Looking for a thoughtful festival gift? Eco-friendly POP idols are personal, beautiful, and made to last.",
    body: "Festivals are about presence, not presents — but a thoughtful gift makes the moment unforgettable. Our handcrafted POP idols are eco-friendly, beautifully boxed, and ready to paint together as a family activity.\n\nWe craft each idol in small batches across India. Pair an idol with a paint kit for a memorable Diwali, Ganesh Chaturthi or housewarming gift.",
    date: "2026-04-02",
    cover: "/images/p-idol.jpg",
    author: "Team Chitrakala",
    tags: ["Festival", "Gifting", "Idols"],
  },
  {
    slug: "host-a-paint-party-at-home",
    title: "How to Host a DIY Paint Party at Home",
    excerpt: "A simple checklist to throw a memorable paint party for birthdays, sleepovers or weekend hangouts.",
    body: "All you need is a covered table, our DIY paint kits, water cups and good music. Set up a paint station per guest, lay out one kit each, and let everyone pick their character.\n\nWe'll customize kits for the group size and theme — just message us on WhatsApp 7 days in advance and we'll handle the rest.",
    date: "2026-03-18",
    cover: "/images/kit.jpg",
    author: "Team Chitrakala",
    tags: ["Events", "Birthday", "DIY"],
  },
];
