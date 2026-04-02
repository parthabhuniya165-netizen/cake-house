export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  flavor: string;
  longDescription: string;
  category: "signature" | "classic" | "bento";
}

export const products: Product[] = [
  {
    id: "1",
    title: "Belgian Chocolate Truffle",
    price: 850,
    image: "/images/products/belgian_chocolate_truffle.png",
    description: "Seven layers of moist Belgian cocoa sponge with velvet-smooth dark chocolate ganache.",
    flavor: "Chocolate",
    longDescription: "Our signature masterpiece. Indulge in seven layers of moist Belgian cocoa sponge nestled between velvet-smooth dark chocolate ganache, finished with a mirror-glaze finish. Perfect for deep chocolate lovers.",
    category: "signature",
  },
  {
    id: "2",
    title: "Rose & Berry Whimsy",
    price: 1250,
    image: "/images/products/rose_berry_whimsy.png",
    description: "Artisanal raspberry and rose petal sponge cake with light pink buttercream frosting.",
    flavor: "Rose Raspberry",
    longDescription: "A delicate floral and fruity experience. Lightly scented rose petal sponge layers paired with fresh raspberry preserves and silken pink buttercream. Decorated with seasonal berries.",
    category: "signature",
  },
  {
    id: "3",
    title: "Classic Vanilla Bean",
    price: 750,
    image: "/images/products/vanilla_bean_mascarpone.png",
    description: "Madagascar vanilla bean sponge with whipped Mascarpone frosting.",
    flavor: "Vanilla",
    longDescription: "Pure elegance in simplicity. We use premium Madagascar vanilla bean pods to infuse our delicate sponge, layered with light-as-air whipped Mascarpone frosting for a refined sweetness.",
    category: "classic",
  },
  {
    id: "4",
    title: "Red Velvet Royale",
    price: 950,
    image: "/images/products/red_velvet_royale.png",
    description: "The deepest crimson sponge with a hint of cocoa and silky cream cheese.",
    flavor: "Red Velvet",
    longDescription: "A sophisticated classic. Velvety deep crimson layers with an underlying cocoa note, perfectly balanced against a rich and tangy silk cream cheese frosting. A crowd favorite for celebrations.",
    category: "signature",
  }
];
