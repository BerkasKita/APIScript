class APIScript {
  constructor() {}
  xhr(e, t) {
    fetch(e).then(e => {
      if (e.ok) return e.json();
      throw new Error("Network response was not ok");
    }).then(e => {
      t(e);
    }).catch(e => {
      console.error("Fetch error:", e);
    });
  }

  fetchAnilist(id, mediaType, callback) {
    const variables = { id: parseInt(id), type: mediaType.toUpperCase() };
    const query = `
      query ($id: Int, $type: MediaType) {
        Media(id: $id, type: $type) {
          id
          idMal
          title {
            romaji
            english
            native
            userPreferred
          }
          description(asHtml: false)
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          season
          seasonYear
          episodes
          duration
          status
          chapters
          volumes
          genres
          isAdult
          averageScore
          meanScore
          popularity
          favourites
          synonyms
          studios {
            edges {
              node {
                id
                name
              }
            }
          }
          source
          trailer {
            id
            site
            thumbnail
          }
          updatedAt
          coverImage {
            extraLarge
            large
            medium
            color
          }
          bannerImage
          format
          rankings {
            id
            rank
            type
            format
            year
            season
            allTime
            context
          }
          tags {
            id
            name
            description
            rank
            isMediaSpoiler
            isGeneralSpoiler
            userId
          }
          characters(sort: [ROLE, RELEVANCE, ID]) {
            edges {
              node {
                id
                name {
                  full
                  native
                }
                image {
                  large
                }
              }
              role
              voiceActors(language: JAPANESE) {
                id
                name {
                  full
                }
                image {
                  large
                }
              }
            }
          }
          staff {
            edges {
              node {
                id
                name {
                  full
                }
                image {
                  large
                }
              }
              role
            }
          }
          reviews {
            edges {
              node {
                id
                summary
                rating
                score
                user {
                  id
                  name
                }
              }
            }
          }
          recommendations {
            edges {
              node {
                mediaRecommendation {
                  id
                  title {
                    romaji
                    english
                    native
                  }
                  coverImage {
                    large
                  }
                }
              }
            }
          }
          externalLinks {
            id
            url
            site
          }
          streamingEpisodes {
            title
            thumbnail
            url
            site
          }
        }
      }
    `;

    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        console.error("Anilist API error:", data.errors);
      } else {
        callback(data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data from Anilist:", error);
    });
  }

  fetchJikan(e, t, r) {
    this.xhr(`https://api.jikan.moe/v4/${t}/${e}/full`, r);
  }

  fetchTMDBMovie(e, t, r) {
    this.xhr(`https://api.themoviedb.org/3/movie/${e}?api_key=${t}`, r);
  }

  fetchTMDBMovieVideo(e, t, r) {
    this.xhr(`https://api.themoviedb.org/3/movie/${e}/videos?api_key=${t}`, r);
  }

  fetchTMDBTVSeries(e, t, r) {
    this.xhr(`https://api.themoviedb.org/3/tv/${e}?api_key=${t}`, r);
  }

  fetchTMDBTVSeriesVideo(e, s, t, r) {
    this.xhr(`https://api.themoviedb.org/3/tv/${e}/season/${s}/videos?api_key=${t}`, r);
  }
}
