class APIScript {
  constructor() {}
  xhr(e, t) {
    fetch(e).then(e => {
      if (e.ok) return e.json();
      throw new Error("Network response was not ok")
    }).then(e => {
      t(e)
    }).catch(e => {
      console.error("Fetch error:", e)
    })
  }
  fetchAnilist(e, t) {
    e = {
      id: parseInt(e)
    };
    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: `
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            idMal
            title {
              romaji
              english
              native
            }
            description
            format
            status
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
            episodes
            duration
            averageScore
            popularity
            genres
            coverImage {
              large
              medium
            }
            bannerImage
            characters {
              edges {
                node {
                  name {
                    full
                  }
                }
              }
            }
            studios {
              edges {
                node {
                  name
                }
              }
            }
            externalLinks {
              site
              url
            }
          }
        }
      `,
        variables: e
      })
    }).then(e => e.json()).then(e => {
      t(e)
    }).catch(e => {
      console.error("Error fetching data from Anilist:", e)
    })
  }
  fetchTMDBMovie(e, t, r) {
    this.xhr(`https://api.themoviedb.org/3/movie/${e}?api_key=` + t, e => {
      r(e)
    })
  }
  fetchTMDBTVSeries(e, t, r) {
    this.xhr(`https://api.themoviedb.org/3/tv/${e}?api_key=` + t, e => {
      r(e)
    })
  }
  fetchJikan(e, t, r) {
    ["anime", "manga", "characters", "people", "search"].includes(t) ? this.xhr(`https://api.jikan.moe/v4/${t}/` + e, e => {
      r(e)
    }) : console.error("Type tidak valid:", t)
  }
}
