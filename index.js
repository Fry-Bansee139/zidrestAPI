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
        return res.status(400).json({
        warning_id: "dilarang ddos/spam rest api web, woy yang ddos/spam, emangnya gw ngerugiin elu kah?, iri? atau kalah saing, padahal gw cuman ngebantu elu dek, bukanya bilang terimakasih malah spam/ddos",
        warning_eng: "gak bisa bahasa inggris :v",
        list_feature: "https://files.catbox.moe/t8rf39.png",});
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
            warning: "this sometimes has bug",
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

// --- YouTube Signature Generation & Convert Function ---
async function generateSignature(url) {
    const V = 'be9c65c4bd077acc3856df5e1e91e0e5180f5b9e61ef64da23396bc9a22996d2';
    const fixedTimestamp = 1744817880861;

    async function sha256(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function getServerTime() {
        const res = await fetch("https://ssyoutube.com/msec");
        return await res.json();
    }

    async function getCorrectedTime() {
        try {
            const data = await getServerTime();
            return Date.now() - Math.floor(1000 * data.msec);
        } catch (e) {
            return 0;
        }
    }

    const timeCorrection = await getCorrectedTime();
    const correctedTime = Date.now() - timeCorrection;
    const stringToHash = `${url}${correctedTime}${V}`;
    const signature = await sha256(stringToHash);

    return {
        url,
        ts: correctedTime,
        _ts: fixedTimestamp,
        _tsc: timeCorrection,
        _s: signature
    };
}

async function convertVideo(url) {
    const payload = await generateSignature(url);
    const response = await fetch("https://api.ssyoutube.com/api/convert", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "origin": "https://ssyoutube.com",
            "referer": "https://ssyoutube.com/",
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
}

// Endpoint ytmp4
app.get('/ytdl', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Parameter "url" wajib diisi' });

    try {
        const result = await convertVideo(url);
        if (!result || !result.url || result.error) {
            return res.status(500).json({ error: 'Gagal mendapatkan data video', details: result?.error || 'Tidak diketahui' });
        }

        const videos = result.url.filter(item => item.type === 'mp4');

        res.json({
            status: 'success',
            code: 200,
            author: "ziddrestMyAPI",
            paham: "awas aja elu download videonya lebih dari 5menit gw ganti tuh apikey",
            data: {
                title: result.meta?.title,
                thumbnail: result.meta?.thumb,
                duration: result.meta?.duration,
                videos: videos.map(v => ({
                    quality: v.quality,
                    link: v.url,
                    size: v.size
                }))
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengunduh video YouTube', details: err.message });
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

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
