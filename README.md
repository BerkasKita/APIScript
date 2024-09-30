# APIScript
Mengambil API dari (Anilist, MyAnimeList, TMDB)

## Installation

Pasang kode RasganeJS di atas `</head>`.

Dapatkan file `APIScript.js`
Tambahkan kode dari file tersebut ke dalam tag `<script>`.

```html
<script type='text/javascript'>/*<![CDATA[*/
  /*Add Code Here*/
/*]]>*/</script>
```

## Contoh Penerapan
```javascript
// Contoh Penggunaan APIScript
const apiFeed = new APIScript();

// Contoh pemanggilan data dari API Anilist
apiFeed.fetchAnilist(1234, function (data) {
  console.log('Data dari Anilist:', data);
});

// Contoh pemanggilan data dari API TMDB untuk Movie
const tmdbApiKey = 'API_KEY_TMDB'; // Ganti dengan API Key TMDB Anda
apiFeed.fetchTMDBMovie(550, tmdbApiKey, function (data) {
  console.log('Data dari TMDB (Movie):', data);
});

// Contoh pemanggilan data dari API TMDB untuk TV Series
apiFeed.fetchTMDBTVSeries(1399, tmdbApiKey, function (data) {
  console.log('Data dari TMDB (TV Series):', data);
});

// Contoh pemanggilan data dari API Jikan dengan type 'anime'
apiFeed.fetchJikan(1, 'anime', function (data) {
  console.log('Data dari Jikan (anime):', data);
});

// Contoh pemanggilan data dari API Jikan dengan type 'manga'
apiFeed.fetchJikan(2, 'manga', function (data) {
  console.log('Data dari Jikan (manga):', data);
});

// Contoh pemanggilan data dari API Jikan dengan type 'characters'
apiFeed.fetchJikan(3, 'characters', function (data) {
  console.log('Data dari Jikan (characters):', data);
});
```
