import { Product, CollectionInfo, Testimonial, StoryScene } from '../types';

export const COLLECTIONS_DATA: CollectionInfo[] = [
  {
    id: 'cloud-soft',
    title: 'Cloud-Soft Everyday',
    subtitle: 'Gentle on new skin, made for slow mornings and cuddle naps',
    theme: 'Comfortable everyday clothing',
    visualDirection: 'Cream, pale sky blue, cloud motifs, combed cotton textures',
    paletteColors: ['#FFF8F1', '#E8F1F5', '#F7DDE5', '#5C4033'],
    description: 'Stitched from ultra-breathable organic cotton yarns with pinch-free flat seams so baby can stretch and snooze in absolute bliss.'
  },
  {
    id: 'explorer',
    title: 'Little Explorer',
    subtitle: 'Stretchy, durable & darling for tummy time discoveries',
    theme: 'Playful outfits for curious little adventurers',
    visualDirection: 'Sage green, butter yellow, miniature stars, woodland acorns',
    paletteColors: ['#DCE8D7', '#F5D88B', '#FFF8F1', '#5C4033'],
    description: 'Reinforced knee patches, wooden-look coconut buttons, and expandable hems designed to crawl through garden adventures.'
  },
  {
    id: 'bedtime',
    title: 'Dreamy Bedtime',
    subtitle: 'Moonlit lullabies woven into the coziest bedtime garments',
    theme: 'Cozy sleepwear inspired by moonlight and bedtime stories',
    visualDirection: 'Lavender, dusty rose, tiny crescent moons, soft twilight fleece',
    paletteColors: ['#E8DFF5', '#F7DDE5', '#281B34', '#FFF8F1'],
    description: 'Two-way whisper-quiet safety zippers, enclosed toe caps, and soft thermal ribbed fabric for peaceful sleep through the starry night.'
  }
];

export const PRODUCTS_DATA: Product[] = [
  // Collection 1: Cloud-Soft Everyday
  {
    id: 'cloud-nine-onesie',
    name: 'Cloud Nine Onesie',
    collectionId: 'cloud-soft',
    collectionName: 'Cloud-Soft Everyday',
    price: 699,
    tagline: 'Fluffy as a cumulus cloud with envelope neckline',
    description: 'Spun from feather-light combed organic cotton with nickel-free snaps and an embroidered miniature cloud on the chest pocket.',
    fabric: '100% GOTS-Certified Organic Combed Cotton',
    colorTag: 'Cloud Milk & Sky Tint',
    badge: 'Bestseller ♡',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    illustrationType: 'onesie-cloud',
    realImageUrl: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'little-snuggle-set',
    name: 'Little Snuggle Set',
    collectionId: 'cloud-soft',
    collectionName: 'Cloud-Soft Everyday',
    price: 999,
    tagline: 'Cozy kimono-wrap top with footed pull-on pants',
    description: 'A matching two-piece hug featuring side-tie kimono closures to protect umbilical cords, plus gentle fold-over scratch mitts.',
    fabric: '95% Organic Cotton, 5% Flexible Elastane',
    colorTag: 'Soft Cream & Powder Blush',
    badge: 'Mimi’s Favorite',
    sizes: ['0-3M', '3-6M', '6-12M'],
    illustrationType: 'snuggle-set',
    realImageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tiny-sunshine-romper',
    name: 'Tiny Sunshine Romper',
    collectionId: 'cloud-soft',
    collectionName: 'Cloud-Soft Everyday',
    price: 799,
    tagline: 'Breezy bubble cut with gentle leg gather',
    description: 'Designed for golden afternoon giggles. Features lightweight muslin weave that gets softer with every warm bubble bath wash.',
    fabric: '100% Breathable Triple-Layer Muslin',
    colorTag: 'Buttercream & Sunbeam Yellow',
    sizes: ['3-6M', '6-12M', '12-18M', '18-24M'],
    illustrationType: 'romper-sun',
    realImageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'
  },

  // Collection 2: Little Explorer
  {
    id: 'mini-explorer-overalls',
    name: 'Mini Explorer Overalls',
    collectionId: 'explorer',
    collectionName: 'Little Explorer',
    price: 1199,
    tagline: 'Adjustable cross-back straps with roomy treasure pockets',
    description: 'Sturdy yet wonderfully pliable washed linen-cotton blend. Mimi added two deep pockets just the right size for keeping tiny pebbles and twigs.',
    fabric: '70% European Flax Linen, 30% Cotton',
    colorTag: 'Meadow Sage & Oatmeal',
    badge: 'Adventure Ready',
    sizes: ['6-12M', '12-18M', '18-24M', '2-3T'],
    illustrationType: 'overalls-explorer',
    realImageUrl: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'little-acorn-tee',
    name: 'Little Acorn Tee',
    collectionId: 'explorer',
    collectionName: 'Little Explorer',
    price: 599,
    tagline: 'Charming acorn pocket embroidery with coconut button',
    description: 'A super-soft crewneck tee with shoulder snap placket for tear-free dressing. Detailed with Mimi’s hand-sketched acorn patch.',
    fabric: '100% Slub Yarn Heather Cotton',
    colorTag: 'Warm Butter Yellow',
    sizes: ['3-6M', '6-12M', '12-18M', '18-24M'],
    illustrationType: 'acorn-tee',
    realImageUrl: 'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pocketful-of-sunshine-set',
    name: 'Pocketful of Sunshine Set',
    collectionId: 'explorer',
    collectionName: 'Little Explorer',
    price: 899,
    tagline: 'Adventure bloomers paired with breezy flutter top',
    description: 'Elasticated paperbag waist with gentle gathers that never dig into chubby tummy rolls. Perfect for sunny park blanket crawls.',
    fabric: '100% Gingham Cotton Poplin',
    colorTag: 'Sage Green & Golden Honey',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    illustrationType: 'sunshine-set',
    realImageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80'
  },

  // Collection 3: Dreamy Bedtime
  {
    id: 'moonbeam-pajama-set',
    name: 'Moonbeam Pajama Set',
    collectionId: 'bedtime',
    collectionName: 'Dreamy Bedtime',
    price: 999,
    tagline: 'Silky modal ribbed two-piece with star dust print',
    description: 'Ultra-stretchy thermal knit that naturally regulates temperature through drafty nursery nights. Finished with soft ribbed cuffs.',
    fabric: '93% Lenzing Modal, 7% Spandex',
    colorTag: 'Dusk Lavender & Silver Moon',
    badge: 'Bedtime Star',
    sizes: ['6-12M', '12-18M', '18-24M', '2-3T'],
    illustrationType: 'moonbeam-pj',
    realImageUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sleepy-bunny-onesie',
    name: 'Sleepy Bunny Onesie',
    collectionId: 'bedtime',
    collectionName: 'Dreamy Bedtime',
    price: 749,
    tagline: 'Two-way diagonal zipper with chin protector flap',
    description: 'Zips open from the bottom for midnight diaper changes without exposing baby’s chest to cool night air. Features tiny bunny face footies.',
    fabric: '100% Brushed Interlock Cotton',
    colorTag: 'Pastel Rose & Twilight Mauve',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    illustrationType: 'sleepy-bunny',
    realImageUrl: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'starlight-sleep-set',
    name: 'Starlight Sleep Set',
    collectionId: 'bedtime',
    collectionName: 'Dreamy Bedtime',
    price: 1099,
    tagline: 'Cocoon sleep sack (1.0 TOG) with matching bedtime knot hat',
    description: 'Certified hip-healthy bell bottom sack giving plenty of kick room, plus a soft top knot beanie to keep little ears warm during bedtime stories.',
    fabric: 'Dual-Layer Quilted Bamboo Cotton Muslin',
    colorTag: 'Midnight Lilac & Star Gold',
    badge: 'Cozy Dreamer',
    sizes: ['0-6M', '6-18M', '18-36M'],
    illustrationType: 'starlight-sleep',
    realImageUrl: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=800&q=80'
  }
];

export const ATELIER_STEPS = [
  {
    step: '01',
    title: 'Find the fabric',
    subtitle: 'Cloud-soft textures only',
    description: 'Mimi sifts through natural linen bolts, unbleached organic cotton rolls, and feather-soft bamboo muslins to pick fabrics gentle enough for newborn whispers.',
    tag: 'Carefully Sourced',
    icon: 'scissors'
  },
  {
    step: '02',
    title: 'Add a little magic',
    subtitle: 'Where whimsical dreams take shape',
    description: 'Coconut shell buttons, hand-sketched acorn patches, cloud-shaped pockets, and secret inside seam covers turn everyday clothing into keepsake treasures.',
    tag: 'Hand-Stitched Charm',
    icon: 'sparkles'
  },
  {
    step: '03',
    title: 'Ready for adventure',
    subtitle: 'Tumble-tested for giggles',
    description: 'Each finished piece is lovingly ironed, washed with natural chamomile flower soap, and tied with a cotton ribbon ready for baby’s big little explorations.',
    tag: 'Adventure Approved',
    icon: 'heart'
  }
];

export const STORY_SCENES: StoryScene[] = [
  {
    number: '01',
    title: 'The Tiny Discovery',
    subtitle: 'A dusty attic box with endless possibilities',
    narrative: 'On a quiet Sunday morning, while chasing a runaway spool of golden thread up into the attic, Mimi found an antique wicker hamper overflowing with vintage floral calico, cream linen, and lavender muslin scraps tucked away by her seamstress grandmother.',
    detailQuote: '“Even the smallest fabric scrap holds a grand adventure inside.”',
    sceneTheme: 'Warm attic dust, golden morning sunbeams, vintage sewing baskets',
    illustrationKey: 'discovery'
  },
  {
    number: '02',
    title: 'The First Stitch',
    subtitle: 'A miniature romper for Barnaby the Bear',
    narrative: 'Armed with an oversized brass thimble that slipped down to her bunny wrist and a needle threaded with sky-blue floss, Mimi turned a torn napkin into a tiny smocked romper for her beloved stuffed companion, Barnaby. It had crooked seams, but an unmistakable warmth.',
    detailQuote: '“It wasn’t perfectly straight, but Barnaby gave the happiest button-eyed grin.”',
    sceneTheme: 'First stitches, wooden spools, cheerful tea-party fittings',
    illustrationKey: 'stitch'
  },
  {
    number: '03',
    title: 'The Little Studio',
    subtitle: 'When forest friends came knocking',
    narrative: 'Word traveled quickly on the breeze. Pip the squirrel needed acorn-carrying overalls for his newborn kits, and the field mice needed flannel swaddles. Mimi transformed her cozy hollow-tree nook into a bustling miniature atelier smelling of cedar wood and pressed cotton.',
    detailQuote: '“Measuring tapes looped like festive garlands across the studio beams!”',
    sceneTheme: 'Swatches hanging on clotheslines, chalk marks, thimbles & pattern paper',
    illustrationKey: 'studio'
  },
  {
    number: '04',
    title: 'A World of Little Dreams',
    subtitle: 'TinyThreads is born for all little adventurers',
    narrative: 'Today, TinyThreads brings Mimi’s cozy sketches into the nurseries of little dreamers across the world. Because every crawl, every milestone sneeze, and every bedtime cuddle deserves clothing made with as much wonder as the childhood it holds.',
    detailQuote: '“Little outfits. Big little adventures.”',
    sceneTheme: 'Starry twilight boutique, joyful packages tied with gingham twine',
    illustrationKey: 'world'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'quote-1',
    quote: 'Every tiny detail feels like it belongs in a storybook. The Cloud Nine onesie is so soft against our newborn’s skin, and the cute story of Mimi made unboxing an actual bedtime ritual!',
    author: 'Aria & Little Oliver',
    role: 'Fictional Sample Story',
    babyAge: '3 months',
    favoriteItem: 'Cloud Nine Onesie'
  },
  {
    id: 'quote-2',
    quote: 'The Tiny Tailor outfit builder is such a sweet little idea! We let our toddler pick out the bunny hat and sage romper for her baby brother. She checks on Mimi’s website every night.',
    author: 'Priya & Baby Kabir',
    role: 'Fictional Sample Story',
    babyAge: '6 months',
    favoriteItem: 'Mini Explorer Overalls'
  },
  {
    id: 'quote-3',
    quote: 'Mimi has officially made browsing baby clothes more fun than anything else online. The Moonbeam pajama set survived fifty messy wash cycles and still feels like a cozy cloud.',
    author: 'Elena & Baby Maya',
    role: 'Fictional Sample Story',
    babyAge: '11 months',
    favoriteItem: 'Moonbeam Pajama Set'
  }
];
