const categories = [
    {
      id: 'plants',
      name: 'Plants',
      tags: ['Restaurants', 'Cinema', 'Boutiques', 'Spa', 'Stores'],
      count: 147,
      image: require('../assets/images/icons/plants.png')
    },
    {
      id: 'seeds',
      name: 'Seeds',
      tags: ['Restaurants', 'Cinema', 'Boutiques', 'Spa', 'Stores'],
      count: 16,
      image: require('../assets/images/icons/seeds.png')
    },
    {
      id: 'flowers',
      name: 'Flowers',
      tags: ['Restaurants', 'Cinema', 'Boutiques', 'Spa', 'Stores'],
      count: 68,
      image: require('../assets/images/icons/flowers.png')
    },
    {
      id: 'sprayers',
      name: 'Sprayers',
      tags: ['Restaurants', 'Cinema', 'Boutiques', 'Spa', 'Stores'],
      count: 17,
      image: require('../assets/images/icons/sprayers.png')
    },
    {
      id: 'pots',
      name: 'Pots',
      tags: ['Restaurants', 'Cinema', 'Boutiques', 'Spa', 'Stores'],
      count: 47,
      image: require('../assets/images/icons/pots.png')
    },
    {
      id: 'fertilizers',
      name: 'fertilizers',
      tags: ['Restaurants', 'Cinema', 'Boutiques', 'Spa', 'Stores'],
      count: 47,
      image: require('../assets/images/icons/fertilizers.png')
    },
  ];
  
  const products = [
    {
      id: 1, 
      name: '16 Best Plants That Thrive In Your Bedroom',
      description: 'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
      tags: ['Interior', '27 m²', 'Ideas'],
      images: [
        require('../assets/images/plants_1.png'),
        require('../assets/images/plants_2.png'),
        require('../assets/images/plants_3.png'),
        // showing only 3 images, show +6 for the rest
        require('../assets/images/plants_1.png'),
        require('../assets/images/plants_2.png'),
        require('../assets/images/plants_3.png'),
        require('../assets/images/plants_1.png'),
        require('../assets/images/plants_2.png'),
        require('../assets/images/plants_3.png'),
      ]
    }
  ];
  
  const explore = [
    // images
    require('../assets/images/explore_1.png'),
    require('../assets/images/explore_2.png'),
    require('../assets/images/explore_3.png'),
    require('../assets/images/explore_4.png'),
    require('../assets/images/explore_5.png'),
    require('../assets/images/explore_6.png'),
  ];
  
  const profile = {
    username: 'react-ui-kit',
    location: 'Europe',
    email: 'contact@react-ui-kit.com',
    avatar: require('../assets/images/avatar.png'),
    budget: 1000,
    monthly_cap: 5000,
    notifications: true,
    newsletter: false,
  };

  const articlesInfo = [
    {
      _id: 1,
      user: {
        name: 'Lelia Chavez',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      saved: true,
      location: 'Santorini, Greece',
      temperature: 34,
      title: 'Santorini',
      description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.',
      rating: 4.3,
      reviews: 3212,
      preview: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      ]
    },
    {
      _id: 2,
      user: {
        name: 'Lelia Chavez',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      saved: false,
      location: 'Loutraki, Greece',
      temperature: 34,
      title: 'Loutraki',
      description: 'This attractive small town, 80 kilometers from Athens',
      rating: 4.6,
      reviews: 3212,
      preview: 'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
      ]
    },
    {
      _id: 3,
      user: {
        name: 'Lelia Chavez',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      saved: true,
      location: 'Santorini, Greece',
      temperature: 34,
      title: 'Santorini',
      description: 'Santorini - Description',
      rating: 3.2,
      reviews: 3212,
      preview: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      ]
    },
    {
      _id: 4,
      user: {
        name: 'Lelia Chavez',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      location: 'Loutraki, Greece',
      temperature: 34,
      title: 'Loutraki',
      description: 'This attractive small town, 80 kilometers from Athens',
      rating: 5,
      reviews: 3212,
      preview: 'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
      ]
    },
  ]
  
  export {
    categories,
    explore,
    products,
    profile,
    articlesInfo
  }