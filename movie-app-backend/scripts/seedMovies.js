const Movie = require("../models/Movie");

const sampleMovies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    duration: 142,
    releaseDate: new Date("1994-09-23"),
    poster: "https://picsum.photos/seed/shawshank/300/450"
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    duration: 175,
    releaseDate: new Date("1972-03-24"),
    poster: "https://picsum.photos/seed/godfather/300/450"
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    duration: 152,
    releaseDate: new Date("2008-07-18"),
    poster: "https://picsum.photos/seed/darkknight/300/450"
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    rating: 8.9,
    duration: 154,
    releaseDate: new Date("1994-10-14"),
    poster: "https://picsum.photos/seed/pulpfiction/300/450"
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    rating: 8.8,
    duration: 142,
    releaseDate: new Date("1994-07-06"),
    poster: "https://picsum.photos/seed/forrestgump/300/450"
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8,
    duration: 148,
    releaseDate: new Date("2010-07-16"),
    poster: "https://picsum.photos/seed/inception/300/450"
  },
  {
    title: "The Matrix",
    description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    rating: 8.7,
    duration: 136,
    releaseDate: new Date("1999-03-31"),
    poster: "https://picsum.photos/seed/matrix/300/450"
  },
  {
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    rating: 8.7,
    duration: 146,
    releaseDate: new Date("1990-09-19"),
    poster: "https://picsum.photos/seed/goodfellas/300/450"
  },
  {
    title: "The Silence of the Lambs",
    description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    rating: 8.6,
    duration: 118,
    releaseDate: new Date("1991-02-14"),
    poster: "https://picsum.photos/seed/silencelambs/300/450"
  },
  {
    title: "Se7en",
    description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    rating: 8.6,
    duration: 127,
    releaseDate: new Date("1995-09-22"),
    poster: "https://picsum.photos/seed/seven/300/450"
  },
  {
    title: "The Avengers",
    description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    rating: 8.0,
    duration: 143,
    releaseDate: new Date("2012-05-04"),
    poster: "https://picsum.photos/seed/avengers/300/450"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    duration: 169,
    releaseDate: new Date("2014-11-07"),
    poster: "https://picsum.photos/seed/interstellar/300/450"
  }
];

const seedMovies = async () => {
  try {
    // Clear existing movies
    await Movie.deleteMany({});
    console.log("Cleared existing movies");

    // Insert sample movies
    const insertedMovies = await Movie.insertMany(sampleMovies);
    console.log(`Successfully inserted ${insertedMovies.length} movies`);
    
    return insertedMovies;
  } catch (error) {
    console.error("Error seeding movies:", error);
    throw error;
  }
};

module.exports = seedMovies;
