const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = Math.floor(Math.random() * (9999 - 3000 + 1)) + 3000;

// Fungsi ambil nama bot dari Telegram
async function getBotName() {
    try {
        const response = await axios.get("https://api.telegram.org/bot7963026786:AAFRWA90NYQIyn6R6uwe30Ogr1VUWhtgByw/getMe");
        if (response.data.ok) {
            return response.data.result.first_name;
        } else {
            throw new Error("Gagal mengambil nama bot.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}


// Middleware cek API key
app.use(async (req, res, next) => {
    const apiKey = req.query.apikey;
    if (!apiKey) {
        return res.status(400).json({ error: 'Parameter "apikey" harus diisi!' });
    }

    const botName = await getBotName();
    if (!botName) {
        return res.status(500).json({ error: "Gagal mengambil nama bot dari API Telegram." });
    }

    if (apiKey !== botName) {
        return res.status(403).json({ error: "Akses ditolak. API Key tidak valid!" });
    }

    next();
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
            format: item.t.replace(/<.*?>|♪/g, '').trim(),
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

// /tikdlv untuk video
app.get('/tikdlv', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Parameter "url" wajib diisi' });
    try {
        const { video, renderSlides } = await loveTikFetch(url);
        const slides = await renderSlides();
        res.json({
            status: 'success',
            code: 200,
            author: "ziddrestMyAPI",
            data: {
                video,
                ...(slides && { slides })
            }
        });
    } catch (err) {
        console.error('Error /tikdlv:', err.message);
        res.status(500).json({ error: 'Gagal mengunduh video TikTok', details: err.message });
    }
});

// /tikdlm untuk musik/audio
app.get('/tikdlm', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Parameter "url" wajib diisi' });
    try {
        const { audio } = await loveTikFetch(url);
        res.json({
            status: 'success',
            code: 200,
            author: "ziddrestMyAPI",
            data: { audio }
        });
    } catch (err) {
        console.error('Error /tikdlm:', err.message);
        res.status(500).json({ error: 'Gagal mengunduh audio TikTok', details: err.message });
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

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
