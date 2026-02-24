export interface BlogPost {
  id: string;
  image: string;
  width: number;
  height: number;
  tags: string[];
  title: string;
  description?: string;
  authorImages: string[];
  date: string;
}

export const featuredPosts: BlogPost[] = [
  {
    id: "1",
    image: "/images/featured-1.jpg",
    width: 500,
    height: 600,
    tags: ["Design", "Idea", "Review"],
    title: "New technology is not good or evil in and of itself",
    description:
      "Vestibulum vehicula dui venenatis neque tempor, accumsan iaculis sapien ornare. Sed at ante porta, ullamcorper massa eu, ullamcorper sapien. Donec pretium tortor augue. Integer egestas ut tellus sed pretium. Nullam tristique augue ut mattis vulputate. Duis et lorem in odio ultricies porttitor.",
    authorImages: ["/images/author-1.jpg", "/images/author-2.jpg"],
    date: "2022-01-01",
  },
  {
    id: "2",
    image: "/images/featured-2.jpg",
    width: 500,
    height: 600,
    tags: ["Creative", "Product"],
    title: "It’s a new era in design, there are no rules",
    description:
      "Quibus autem in rebus tanta obscuratio non fit, fieri tamen potest, ut id ipsum, quod interest, non sit magnum. Ita fit ut, quanta differentia est in principiis naturalibus, tanta sit in finibus bonorum malorumque dissimilitudo.",
    authorImages: ["/images/author-3.jpg"],
    date: "2022-01-02",
  },
  {
    id: "3",
    image: "/images/featured-3.jpg",
    width: 500,
    height: 600,
    tags: ["Design", "Creative", "Idea"],
    title: "Perfection has to do with the end product",
    description:
      "Aenean eget urna aliquet, viverra orci quis, aliquam erat. Ut rutrum quam quam, eu eleifend est blandit et. Vivamus suscipit ultrices venenatis. Aliquam massa ipsum, porta quis hendrerit at, varius sed leo. Curabitur convallis urna sit amet mi tempus posuere.",
    authorImages: ["/images/author-4.jpg"],
    date: "2022-01-03",
  },
  {
    id: "4",
    image: "/images/featured-4.jpg",
    width: 500,
    height: 600,
    tags: ["People", "Story"],
    title: "Everyone has a different life story",
    description:
      "Non est igitur summum malum dolor. Tu autem inter haec tantam multitudinem hominum interiectam non vides nec laetantium nec dolentium. Nunc vero a primo quidem mirabiliter occulta natura est nec perspici nec cognosci potest.",
    authorImages: ["/images/author-5.jpg", "/images/author-2.jpg"],
    date: "2022-01-04",
  },
  {
    id: "5",
    image: "/images/featured-5.jpg",
    width: 500,
    height: 600,
    tags: ["Design", "Lifestyle", "Idea"],
    title: "The difference is quality",
    description:
      "Vide, ne etiam menses! nisi forte eum dicis, qui, simul atque arripuit, interficit. Atque his de rebus et splendida est eorum et illustris oratio.",
    authorImages: ["/images/author-6.jpg"],
    date: "2022-01-05",
  },
  {
    id: "6",
    image: "/images/featured-6.jpg",
    width: 500,
    height: 600,
    tags: ["Idea", "Creating"],
    title: "Problems are not stop signs, they are guidelines",
    description:
      "Quid ad utilitatem tantae pecuniae. Duo enim genera quae erant, fecit tria. Et quod est munus, quod opus sapientiae.",
    authorImages: ["/images/author-3.jpg"],
    date: "2022-01-06",
  },
];

export const recentPosts: BlogPost[] = [
  {
    id: "7",
    image: "/images/recent-1.jpg",
    width: 550,
    height: 660,
    tags: ["Lifestyle", "People", "Review"],
    title: "Creating is a privilege but it’s also a gift",
    description:
      "Nullam vel lectus vel velit pellentesque dignissim nec id magna. Cras molestie ornare quam at semper. Proin a ipsum ex. Curabitur eu venenatis justo. Nullam felis augue, imperdiet at sodales a, sollicitudin nec risus.",
    authorImages: ["/images/author-3.jpg", "/images/author-5.jpg"],
    date: "2022-02-01",
  },
  {
    id: "8",
    image: "/images/recent-2.jpg",
    width: 550,
    height: 660,
    tags: ["Design", "Product", "Idea"],
    title: "Being unique is better than being perfect",
    description:
      "Nam in pretium dui. Phasellus dapibus, mi at molestie cursus, neque eros aliquet nisi, non efficitur nisi est nec mi. Nullam semper, ligula a luctus ornare, leo turpis fermentum lectus, quis volutpat urna orci a lectus. Duis et odio lobortis, auctor justo ut, egestas magna.",
    authorImages: ["/images/author-5.jpg"],
    date: "2022-02-02",
  },
  {
    id: "9",
    image: "/images/recent-3.jpg",
    width: 550,
    height: 660,
    tags: ["Idea", "Product", "Review"],
    title: "Now we’re getting somewhere",
    description:
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec volutpat rhoncus quam, a feugiat elit gravida eget. Curabitur id pharetra ligula. Integer porttitor suscipit ante ac faucibus. Sed a enim non enim viverra pulvinar vel diam ut lorem congue feugiat.",
    authorImages: [
      "/images/author-2.jpg",
      "/images/author-5.jpg",
      "/images/author-1.jpg",
    ],
    date: "2022-02-03",
  },
  {
    id: "10",
    image: "/images/recent-4.jpg",
    width: 550,
    height: 660,
    tags: ["Lifestyle", "Design"],
    title: "The trick to getting more done is to have the freedom to roam around",
    description:
      "Integer nec mi cursus, blandit est et, auctor mauris. Aenean ex metus, faucibus in mattis at, tincidunt eu dolor. Cras hendrerit massa nec augue placerat rutrum. Sed facilisis massa enim, ac tempus diam elementum sit amet.",
    authorImages: ["/images/author-3.jpg"],
    date: "2022-02-04",
  },
  {
    id: "11",
    image: "/images/recent-5.jpg",
    width: 550,
    height: 660,
    tags: ["People", "Story", "Lifestyle"],
    title: "Every day, in every city and town across the country",
    description:
      "Morbi a facilisis lectus. Ut eu dapibus risus, a interdum justo. Vestibulum volutpat velit ac tellus mollis, sit amet sodales metus elementum. Aliquam eu mi massa. Proin suscipit enim a pulvinar viverra.",
    authorImages: ["/images/author-1.jpg", "/images/author-6.jpg"],
    date: "2022-02-05",
  },
  {
    id: "12",
    image: "/images/recent-6.jpg",
    width: 550,
    height: 660,
    tags: ["People", "Review", "Story"],
    title: "Your voice, your mind, your story, your vision",
    description:
      "Nullam auctor nisi non tortor porta, id dapibus lectus rhoncus. Vivamus lobortis posuere enim finibus sodales. Phasellus quis tellus scelerisque, sagittis tortor et, maximus metus.",
    authorImages: ["/images/author-6.jpg"],
    date: "2022-02-06",
  },
];

export const recommendedPosts: BlogPost[] = [
  {
    id: "13",
    image: "/images/recommended-1.jpg",
    width: 300,
    height: 360,
    tags: [],
    title: "The trick to getting more done is to have the freedom to roam around",
    authorImages: ["/images/author-5.jpg", "/images/author-2.jpg"],
    date: "2022-03-01",
  },
  {
    id: "14",
    image: "/images/recommended-2.jpg",
    width: 300,
    height: 360,
    tags: [],
    title: "Every day, in every city and town across the country",
    authorImages: ["/images/author-3.jpg"],
    date: "2022-03-02",
  },
  {
    id: "15",
    image: "/images/recommended-3.jpg",
    width: 300,
    height: 360,
    tags: [],
    title: "I work best when my space is filled with inspiration",
    authorImages: ["/images/author-1.jpg"],
    date: "2022-03-03",
  },
  {
    id: "16",
    image: "/images/recommended-4.jpg",
    width: 300,
    height: 360,
    tags: [],
    title: "I have my own definition of minimalism",
    authorImages: ["/images/author-4.jpg", "/images/author-3.jpg"],
    date: "2022-03-04",
  },
  {
    id: "17",
    image: "/images/recommended-5.jpg",
    width: 300,
    height: 360,
    tags: [],
    title: "Change your look and your attitude",
    authorImages: ["/images/author-6.jpg"],
    date: "2022-03-05",
  },
  {
    id: "18",
    image: "/images/recommended-6.jpg",
    width: 300,
    height: 360,
    tags: [],
    title: "The difference is quality",
    authorImages: ["/images/author-3.jpg"],
    date: "2022-03-06",
  },
];
