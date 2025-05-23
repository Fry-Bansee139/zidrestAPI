const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const fetch = require('node-fetch');
const qs = require('querystring');
const puppeteer = require('puppeteer');
const PORT = Math.floor(Math.random() * (9999 - 3000 + 1)) + 3000;
// Endpoint untuk halaman HTML
app.get('/', (req, res) => {
  res.send(`
    <html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ziydz Rest APIs</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  />
  <link rel="icon" href="https://files.catbox.moe/85k69f.jpg" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;800&display=swap');
    body {
      margin: 0;
      font-family: 'Inter', sans-serif;
      background-color: #12182b;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }

    .container {
      width: 100%;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    header {
      text-align: center;
      margin-bottom: 1rem;
      user-select: none;
    }
    .wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    header h1 {
      font-weight: 800;
      font-size: 2.5rem;
      line-height: 1.2;
      color: #5dffa3;
      margin: 0;
      text-shadow: none;
    }
    header p {
      font-style: italic;
      font-weight: 600;
      font-size: 0.75rem;
      color: rgba(255 255 255 / 0.7);
      margin-top: 0.25rem;
      margin-bottom: 0;
    }
    main {
      background-color: #0f172a;
      border-radius: 0.375rem;
      width: 100%;
      box-shadow: 0 4px 6px rgb(0 0 0 / 0.1);
      overflow: hidden;
    }
    .top-bar {
      background-color: #3cbf85;
      color: #fff;
      font-weight: 700;
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      border-bottom: 2px solid #3cbf85;
      box-shadow: none;
    }
    .top-bar .total {
      font-size: 0.625rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      border-top: 1px solid rgba(93, 255, 163, 0.2);
      max-height: 80vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    ul::-webkit-scrollbar {
      width: 6px;
    }
    ul::-webkit-scrollbar-thumb {
      background-color: rgba(93, 255, 163, 0.4);
      border-radius: 3px;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-top: 1px solid rgba(93, 255, 163, 0.2);
      cursor: default;
      user-select: none;
      transition: background-color 0.2s ease;
    }
    li:first-child {
      border-top: none;
    }
    li:hover {
      background-color: rgba(93, 255, 163, 0.1);
    }
    .left-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
      flex-shrink: 1;
    }
    .get-badge {
      background-color: #3cbf85;
      color: #fff;
      font-weight: 700;
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      flex-shrink: 0;
      user-select: none;
      min-width: 3rem;
      text-align: center;
      line-height: 1;
      text-shadow: none;
      font-style: normal; /* Tambahkan ini untuk mencegah miring */
      font-family: 'Inter', sans-serif; /* Pastikan menggunakan font yang benar */
    }
    .api-name {
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
      min-width: 0;
      text-shadow: none;
    }
    a.arrow-link {
      color: #5dffa3;
      margin-left: 0.5rem;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s ease;
      text-shadow: none;
    }
    a.arrow-link:hover {
      color: #4ad68a;
    }
    @media (max-width: 480px) {
      body {
        padding: 0.5rem;
      }
      .container {
        max-width: 100%;
      }
      header h1 {
        font-size: 2rem;
      }
      header p {
        font-size: 0.6875rem;
      }
      .top-bar {
        font-size: 0.75rem;
      }
      .top-bar .total {
        font-size: 0.5625rem;
      }
      .get-badge {
        font-size: 0.5625rem;
        min-width: 2rem;
        padding: 0.1rem 0.4rem;
      }
      .api-name {
        font-size: 0.875rem;
      }
    }
    .footer {
      background-color: #0e1a2f;
      text-align: center;
      padding: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #fff;
    }
    footer p {
      color: #fff;
      font-size: 0.875rem;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.3rem;
      margin: 0;
      white-space: nowrap;
      overflow-x: auto;
    }
    footer .footer-brand {
      color: #5dffa3;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    footer i {
      font-size: 0.75rem;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container" role="main" aria-label="Zidd Rest APIs">
      <header>
        <h1>Zidd Rest APIs</h1>
        <p>Free, Easy, and Simple APIs</p>
        <p>Maaf baru belajar website API</p>
      </header>

      <main>
        <div class="top-bar" aria-label="API summary">
          <span>List API</span>
          <span class="total">Total: 15</span>
        </div>
        <ul>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Tiktok Stalk</span>
            </div>
            <a href="/tiktok?username=xbrezzefx" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="tiktokstlk">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Tiktok Downloader</span>
            </div>
            <a href="/tikdown?url=https://vt.tiktok.com/ZSr3w9pU9/" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="tiktokdl">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Cek Khodam</span>
            </div>
            <a href="/cekodam?nama=asep" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="cekodam">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Youtube Downloader</span>
            </div>
            <a href="/ytdl?url=https://youtube.com/shorts/QJamiIrw04U?si=mrmJdKJqf7_nlen0" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="YouTubedl">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Wikipedia Search</span>
            </div>
            <a href="/wiki?search=merdeka" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="wikip">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Instagram Downloader</span>
            </div>
            <a href="/igdl?url=https://www.instagram.com/reel/DIdDTn9SihA/?igsh=Zm1sN3BuZnZvYmtu" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="igdl">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Kisah Nabi</span>
            </div>
            <a href="/kisahnabi?nabi=adam" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="kisahnabi">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Github Stalker</span>
            </div>
            <a href="/ghstalk?user=whyuxd" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="githubstlk">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
          <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Github Downloader</span>
            </div>
            <a href="/gitdown?url=https://github.com/REYHAN6610/ZipCracked" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="githubdl">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
          <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Github Check Repository</span>
            </div>
            <a href="/gitcekrepo?url=https://github.com/REYHAN6610/ZipCracked" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="repocek">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Instagram Stalker</span>
            </div>
            <a href="/igstalk?user=mrbeast" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="igstalk">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Brat Text</span>
            </div>
            <a href="/brat?text=Hai" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="brat">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Kuis Islam</span>
            </div>
            <a href="/kuislam" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="kuislam">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Send NGL</span>
            </div>
            <a href="/sendngl?link=https://ngl.link/negama.menfess&pesan=Hai Mincan&jumlah=1" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="sendngl">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">QR Generator</span>
            </div>
            <a href="/qr?contents=lucky" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="qrgen">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </main>
    </div>
    <footer>
      <p>
        <span class="footer-brand">
          <i class="fas fa-code"></i>
          <span>2025 <span>Zidd Rest APIs</span></span>
        </span>
        <span>- All Rights Reserved</span>
      </p>
    </footer>
  </div>
</body>
</html>
`);
});

// Endpoint TikTok
app.get('/tiktok', async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ error: 'Parameter "username" wajib diisi' });
    }

    try {
        const response = await axios.get(`https://www.tiktok.com/@${username}`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        const $ = cheerio.load(response.data);
        const scriptTag = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();

        if (!scriptTag) {
            return res.status(404).json({ error: 'Data pengguna tidak ditemukan' });
        }

        const jsonData = JSON.parse(scriptTag);
        const userData = jsonData['__DEFAULT_SCOPE__']['webapp.user-detail'];
        const userInfo = userData.userInfo.user;
        const stats = userData.userInfo.stats;

        res.json({
            status: "success",
            author: "ziddrestMyAPI", // ganti sesuai nama kamu
            code: 200,
            data: {
                name: userInfo.nickname,
                username: userInfo.uniqueId,
                bio: userInfo.signature,
                avatar: userInfo.avatarLarger,
                id: userInfo.id,
                uniqueId: userInfo.uniqueId,
                language: userInfo.language,
                verified: userInfo.verified || false,
                is_private: userInfo.privateAccount || false,
                followers: stats.followerCount,
                following: stats.followingCount,
                likes: stats.heartCount,
                videos: stats.videoCount
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mengambil data TikTok' });
    }
});
// TikTok downloader
async function loveTikFetch(url) {
    const searchRes = await axios.post(
        'https://lovetik.com/api/ajax/search',
        `query=${encodeURIComponent(url)}`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
    );
    const data = searchRes.data;
    if (!data.images) data.images = [];

    const result = { video: [], audio: [] };
    data.links.forEach(item => {
        if (!item.a) return;
        const formatted = {
            format: item.t.replace(/<.*?>|â™ª/g, '').trim(),
            resolution: item.s || 'Audio Only',
            link: item.a
        };
        if (item.ft == 1) result.video.push(formatted);
        else result.audio.push(formatted);
    });

    async function renderSlides() {
        const slide = data.links.find(m => m.c);
        if (!slide) return null;
        const convertRes = await axios.post(
            'https://lovetik.com/api/ajax/convert',
            `c_data=${encodeURIComponent(slide.c)}`,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        );
        return convertRes.data;
    }

    return { images: data.images, video: result.video, audio: result.audio, renderSlides };
}
app.get('/tikdown', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Parameter "url" wajib diisi' });

    try {
        const { video, audio, images, renderSlides } = await loveTikFetch(url);
        const slides = await renderSlides();
        res.json({
            status: 'success',
            code: 200,
            author: "ziddrestMyAPI",
            data: {
                video,
                audio,
                ...(slides && { slides }),
                ...(images.length > 0 && { images }) // fallback for slide photos
            }
        });
    } catch (err) {
        console.error('Error /tikdown:', err.message);
        res.status(500).json({ error: 'Gagal mengunduh konten TikTok', details: err.message });
    }
});
// Instagram Downloader
app.get('/igdl', async (req, res) => {
    const fullUrl = req.query.url;
    if (!fullUrl) return res.status(400).json({ error: 'Parameter "url" wajib diisi' });

    try {
        const [baseUrl, paramString] = fullUrl.split('?');
        const params = new URLSearchParams(paramString);
        const igsh = params.get('igsh');

        const formData = `url=${encodeURIComponent(baseUrl)}&igsh=${encodeURIComponent(igsh)}&lang=en`;

        const config = {
            method: 'POST',
            url: 'https://api.instasave.website/media',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'origin': 'https://instasave.website',
                'referer': 'https://instasave.website/',
                'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
            },
            data: formData
        };

        const api = await axios.request(config);
        const $ = cheerio.load(api.data);
        const thumbnailUrl = $('img').attr('src').replace(/\\"/g, '');
        const downloadUrl = $('a').attr('href').replace(/\\"/g, '');

        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: {
                thumbnail: thumbnailUrl,
                download: downloadUrl
            }
        });
    } catch (error) {
        console.error('Error /igdl:', error.message);
        res.status(500).json({ error: 'Gagal mengunduh dari Instagram', details: error.message });
    }
});
app.get('/ytdl', async (req, res) => {
    const youtubeUrl = req.query.url;

    if (!youtubeUrl) {
        return res.status(400).json({ error: 'Parameter "url" wajib diisi' });
    }

    const regYoutubeId = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const videoId = youtubeUrl.match(regYoutubeId)?.[1];
    if (!videoId) return res.status(400).json({ error: "Gagal mengekstrak video ID dari URL." });

    const headers = { "Referer": "https://id.ytmp3.mobi/" };

    const fetchJson = async (url, label) => {
        const res = await fetch(url, { headers });
        if (!res.ok) throw Error(`Gagal saat ${label}: ${res.statusText}`);
        return await res.json();
    };

    const getDownloadLink = async (format) => {
        const param = {
            v: videoId,
            f: format,
            _: Math.random()
        };

        const { convertURL } = await fetchJson(
            `https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`,
            `init ${format}`
        );

        const query = `${convertURL}&${new URLSearchParams(param).toString()}`;
        const { progressURL, downloadURL } = await fetchJson(query, `get progressURL for ${format}`);

        let progress = 0, title = "", error = null;

        while (progress !== 3) {
            const status = await fetchJson(progressURL, `progress ${format}`);
            progress = status.progress;
            error = status.error;
            title = status.title;

            if (error) throw Error(`Gagal convert ke ${format}: ${error}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        return { format, title, downloadURL };
    };

    try {
        const [mp3, mp4] = await Promise.all([
            getDownloadLink("mp3"),
            getDownloadLink("mp4")
        ]);

        res.json({
            status: "success",
            code: 200,
            author: "ziddrestMyAPI",
            note: "Don't make the video longer than 5 minutes, it will take a long time",
            data: {
                title: mp3.title || mp4.title,
                video: {
                    format: "mp4",
                    url: mp4.downloadURL
                },
                audio: {
                    format: "mp3",
                    url: mp3.downloadURL
                }
            }
        });

    } catch (err) {
        res.status(500).json({
            error: 'Gagal mendapatkan link unduhan',
            details: err.message
        });
    }
});
app.get('/wiki', async (req, res) => {
    const text = req.query.search;
    if (!text) {
        return res.status(400).json({ error: 'Parameter "search" wajib diisi' });
    }

    try {
        const link = await axios.get(`https://id.wikipedia.org/wiki/${encodeURIComponent(text)}`);
        const $ = cheerio.load(link.data);
        const title = $('#firstHeading').text().trim();
        let desc = '';

        $('#mw-content-text > .mw-parser-output > p').each((i, el) => {
            const paragraph = $(el).text().trim();
            if (paragraph) {
                desc = paragraph;
                return false; // stop after first non-empty paragraph
            }
        });

        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: {
                title,
                description: desc
            }
        });
    } catch (err) {
        console.error('Error /wiki:', err.message);
        res.status(500).json({ error: 'Gagal mengambil data Wikipedia', details: err.message });
    }
});
app.get('/kisahnabi', async (req, res) => {
    const nabi = req.query.nabi;
    if (!nabi) {
        return res.status(400).json({ error: 'Parameter "nabi" wajib diisi' });
    }

    try {
        const response = await axios.get(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${nabi.toLowerCase()}.json`);
        const kisah = response.data;

        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: {
                nama: kisah.name,
                tahun_lahir: kisah.thn_kelahiran,
                tempat_lahir: kisah.tmp,
		        foto_url: kisah.image_url,
		        deskripsi: kisah.description,
		        ikon_url: kisah.icon_url,
                usia: kisah.usia,
                kisah: kisah.kisah
            }
        });
    } catch (error) {
        res.status(404).json({
            error: 'Kisah nabi tidak ditemukan. Tips: coba gunakan huruf kecil semua pada parameter "nabi".'
        });
    }
});
app.get('/gitcekrepo', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'Parameter "url" wajib diisi, contoh: /gitcekrepo?url=https://github.com/user/repo' });
    }

    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
        return res.status(400).json({ error: 'URL GitHub tidak valid. Format harus seperti: https://github.com/username/repo' });
    }

    const [, username, repoName] = match;

    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        const repo = response.data;

        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: {
                nama_repo: repo.name,
                deskripsi: repo.description,
                pemilik: repo.owner.login,
                avatar_url: repo.owner.avatar_url,
                bintang: repo.stargazers_count,
                fork: repo.forks_count,
                open_issues: repo.open_issues_count,
                url: repo.html_url,
                dibuat_pada: repo.created_at,
                diupdate_pada: repo.updated_at,
                bahasa: repo.language,
                privat: repo.private
            }
        });
    } catch (error) {
        res.status(404).json({ error: 'Repository tidak ditemukan atau tidak tersedia' });
    }
});
app.get('/kuislam', async (req, res) => {
        const response = await axios.get(`https://kuis-islami-api.vercel.app/api/random`);
        const kuis = response.data;

        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: {
                soal: kuis.question,
                jawaban: kuis.correct,
                pilihan: kuis.choices,
            }
        });
});
async function githubstalk(user) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.github.com/users/' + user)
        .then(({ data }) => {
            let hasil = {
                username: data.login,
                nickname: data.name,
                bio: data.bio,
                id: data.id,
                nodeId: data.node_id,
                profile_pic: data.avatar_url,
                url: data.html_url,
                type: data.type,
                admin: data.site_admin,
                company: data.company,
                blog: data.blog,
                location: data.location,
                email: data.email,
                public_repo: data.public_repos,
                public_gists: data.public_gists,
                followers: data.followers,
                following: data.following,
                created_at: data.created_at,
                updated_at: data.updated_at
            }
            resolve(hasil)
        })
        .catch((err) => {
            reject(err);
        });
    });
}
app.get('/ghstalk', async (req, res) => {
    const username = req.query.user;
    if (!username) {
        return res.status(400).json({ error: 'Parameter "user" wajib diisi' });
    }

    try {
        const userData = await githubstalk(username);
        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: userData
        });
    } catch (err) {
        console.error('Error /ghstalk:', err.message);
        res.status(500).json({ error: 'Gagal mengambil data GitHub', details: err.message });
    }
});
app.get('/igstalk', async (req, res) => {
    const username = req.query.user;
    if (!username) {
        return res.status(400).json({ error: 'Parameter "user" wajib diisi' });
    }
    try {
        const url = `https://insta-stories-viewer.com/${username}/`;
        const { data: html } = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            },
        });
        const $ = cheerio.load(html);

        const avatar = $(".profile__avatar-pic").attr("src");
        const name = $(".profile__nickname").contents().first().text().trim();
        const posts = $(".profile__stats-posts").text().trim();
        const followers = $(".profile__stats-followers").text().trim();
        const following = $(".profile__stats-follows").text().trim();
        const bio = $(".profile__description").text().trim();
        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            name,
            avatar,
            posts,
            followers,
            following,
            bio
        });
    } catch (err) {
        console.error('Error /igstalk:', err.message);
        res.status(500).json({ error: 'Gagal mengambil data Instagram', details: err.message });
    }
});
async function cekKhodam(name) {
    try {
        const response = await axios.get(`https://khodam.vercel.app/v2?nama=${name}`);
        const $ = cheerio.load(response.data);

        const nama = name;
        const nama_khodam = $('span.__className_cad559.text-3xl.font-bold.text-rose-600').text().trim();
        const kata2_galau = $('div.mb-5.sm\\:mb-10.px-8.text-center.text-white\\/90').text().trim().replace(/"/g, '');

        return { nama, nama_khodam, kata2_galau };
    } catch (error) {
        throw error;
    }
}
app.get('/cekodam', async (req, res) => {
    const name = req.query.nama;
    if (!name) {
        return res.status(400).json({ error: 'Parameter "nama" wajib diisi' });
    }
    try {
        const result = await cekKhodam(name);
        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: result
        });
    } catch (err) {
        console.error('Error /cekodam:', err.message);
        res.status(500).json({ error: 'Gagal mengambil data khodam', details: err.message });
    }
});
app.get('/qr', async (req, res) => {
    const { contents } = req.query;
    if (!contents) {
        return res.status(400).json({ error: 'Parameter "contents" wajib diisi' });
    }
    try {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(contents)}`;
        const response = await axios.get(qrApiUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (err) {
        console.error('Error /qr:', err.message);
        res.status(500).json({ error: 'Gagal membuat QR code', details: err.message });
    }
});
app.get('/brat', async (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'Parameter "text" wajib diisi' });
    }
    try {
        const textbrat = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=false&delay=500`;
        const response = await axios.get(textbrat, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (err) {
        console.error('Error /brat:', err.message);
        res.status(500).json({ error: 'Gagal membuat brat text', details: err.message });
    }
});
app.get('/sendngl', async (req, res) => {
    let { link, pesan, jumlah } = req.query;
    
    if (!link || !pesan || !jumlah) {
        return res.status(400).json({ error: 'Parameter "link", "pesan", dan "jumlah" wajib diisi' });
    }

    if (!link.startsWith('https://ngl.link/')) {
        return res.status(400).json({ error: 'Link NGL tidak valid!' });
    }

    jumlah = parseInt(jumlah);
    if (isNaN(jumlah) || jumlah < 1) {
        return res.status(400).json({ error: 'Jumlah harus angka lebih dari 0!' });
    }

    const username = link.split('https://ngl.link/')[1];
    if (!username) {
        return res.status(400).json({ error: 'Username NGL tidak ditemukan di link!' });
    }

    let success = 0;
    for (let i = 0; i < jumlah; i++) {
        try {
            await axios.post('https://ngl.link/api/submit',
                qs.stringify({
                    username,
                    question: pesan,
                    deviceId: '1'
                }), {
                    headers: {
                        'accept': '*/*',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }
            );
            success++;
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
            console.error(`Gagal mengirim pesan ke ${username} ke-${i + 1}:`, err.message);
        }
    }

    res.json({
        status: 'success',
        code: 200,
        author: 'ziddrestMyAPI',
        target: username,
        pesan,
        jumlah: success,
        keterangan: `Berhasil mengirim ${success} dari ${jumlah} pesan`
    });
});

app.get('/gitdown', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'Parameter "url" wajib diisi' });
    }

    // Validasi URL GitHub
    const isValidGitHubUrl = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    const match = url.match(isValidGitHubUrl);
    if (!match) {
        return res.status(400).json({ error: 'URL GitHub tidak valid' });
    }

    let [, user, repo] = match;
    repo = repo.replace(/\.git$/, '');
    const zipUrl = `https://api.github.com/repos/${user}/${repo}/zipball`;

    try {
        // Ambil nama file dari header
        const headResp = await axios.head(zipUrl);
        const contentDisposition = headResp.headers['content-disposition'];
        const filename = contentDisposition.match(/attachment; filename=(.*)/)[1];

        // Redirect user untuk download
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.zip"`);
        res.setHeader('Content-Type', 'application/zip');

        const zipFile = await axios.get(zipUrl, { responseType: 'stream' });
        zipFile.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengunduh repository GitHub' });
    }
});
// Handler semua endpoint yang tidak ditemukan (fitur salah)
app.use((req, res) => {
    res.status(400).json({
        status: false,
        error: 'Feature not found',
        code: 400
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
