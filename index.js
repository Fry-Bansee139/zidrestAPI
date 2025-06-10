const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const fetch = require('node-fetch');
const qs = require('querystring');
const yts = require('yt-search');
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
    .web-badge {
      background-color: #34a8eb;
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
      .web-badge {
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
          <span class="total">Total: 20</span>
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
              <span class="api-name">Free Fire Stalk</span>
            </div>
            <a href="/ffstalk?id=12345678" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="ffstalk">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Youtube Search</span>
            </div>
            <a href="/ytsearch?search=fisika" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="fisika">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Github Search</span>
            </div>
            <a href="/githsc?query=api" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="githubstlk">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Telegram Stalker</span>
            </div>
            <a href="/telestalk?user=raditx7" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="telestalk">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Blackbox Ai</span>
            </div>
            <a href="/blackbox?query=hai" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="blackbox">
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
          <li>
            <div class="left-group">
              <span class="get-badge">GET</span>
              <span class="api-name">Muslim AI</span>
            </div>
            <a href="/muslim-ai?ask=apa itu Alquran" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="muslimai">
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <div class="left-group">
              <span class="web-badge">WEB</span>
              <span class="api-name">Cek Operator Nomer</span>
            </div>
            <a href="/cekoperator" target="_blank" rel="noopener noreferrer" class="arrow-link" aria-label="cekoperator">
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

app.get('/cekoperator', (req, res) => {
  res.send(`
<html>
    <head>
        <title>Cek Operator</title>

        <meta name="viewport" content="width=device-width,initial-scale=1">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"/>
        <script src="https://cdn.jsdelivr.net/npm/no-telp@1.0.2/dist/noTelp.min.js"></script>
        <style>
    @import url("https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@400;700&display=swap");

    html,
    body {
      height: 100%;
      margin: 0;
    }

    body {
      font-family: "Roboto", sans-serif;
      background: #fafbf6;
      display: flex;
      flex-direction: column;
      color: #333;
    }

    #panel {
      width: 50%;
      margin: 0 auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    h1.title {
      font-family: "Lobster", cursive;
      margin: 20px;
      text-align: center;
      font-size: 4rem;
      color: #4f516d;
    }

    @media only screen and (max-width: 720px) {
      #panel {
        width: 90%;
      }

      h1.title {
        font-size: 3em;
      }
    }

    #tel {
      padding-right: 35px;
    }

    .fa-search {
      position: relative;
      top: -32px;
      right: 10px;
      float: right;
    }

    #logo-operator {
      height: 100px;
      margin-left: auto;
      margin-right: auto;
      display: block;
      padding: 20px;
    }

    .footer {
      text-align: center;
      padding: 15px;
      font-size: 0.9rem;
      color: #888;
      background-color: transparent;
    }

    .footer a {
      color: #888;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    label {
      font-weight: 700;
    }
  </style>
    </head>

    <body>
        <div id="panel">
            <div>
                <h1 class="title">Cek Operator</h1>
                <div class="form-group">
                    <input class="form-control form-control-lg" type="tel" id="tel" placeholder="Masukan no. telpon disini"/>
                    <i id="submit-button" class="fa fa-search"></i>
                </div>
            </div>
            <div class="alert alert-danger" role="alert" id="error" style="display: none;">
                Nomor tidak valid
            </div>
            <div class="card" id="result-card" style="display: none;">
                <div class="card-body">
                    <img src="https://raw.githubusercontent.com/rfnajid/cek-operator/master/assets/images/operator/telkomsel.jpg" id="logo-operator"/>
                    <div class="form-group row">
                        <label for="operator" class="col-sm-2 col-form-label">Operator</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="operator" value="Telkomsel">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="card" class="col-sm-2 col-form-label">Kartu</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="card" value="kartu AS">
                        </div>
                    </div>
                </div>
              </div>
        </div>
        <div class="footer">
  <p>
    Dibuat oleh
    <a href="https://instagram.com/zdybladeits" target="_blank">
      <i class="fab fa-instagram"></i> zdybladeits
    </a>
  </p>
  <p>“Ingat didunia, ada selamat datang, dan selamat tinggal, dan dunia adalah tempat meninggal bukan tempat tinggal”</p>
  <p>10 Juni ©2025</p>
</div>
    </body>
    <script>
    const { getOperator } = window.NoTelp;

const tel = document.getElementById("tel");
const submitButton = document.getElementById("submit-button");
const error = document.getElementById("error");
const resultCard = document.getElementById("result-card");
const logoOperator = document.getElementById("logo-operator");
const operator = document.getElementById("operator");
const card = document.getElementById("card");

const init = () => {
    tel.addEventListener('change', checkOperator);
    submitButton.addEventListener('click', checkOperator);
}

const setError = (message) => {
    document.getElementById("error").innerHTML = message ;
}

const show = (element) => {
    element.style.display = "block";
}

const hide = (element) => {
    element.style.display = "none";
}

const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

const setMessage = (message) => {
    switch (message) {
        case "INVALID":
            message = "Nomor Invalid";
            break;
        case "BELOW MINIMUM LENGTH":
            message = "Nomor kurang panjang";
            break;
        case "ABOVE MAXIMUM LENGTH":
            message = "Nomor terlalu panjang";
            break;
        case "NOT FOUND":
            message = "Nomor tidak diketahui";
            break;
    }
    error.innerHTML = message;
}

const setOperatorLogo = (operator) => {
    operator = toKebabCase(operator);
    logoOperator.src = "https://raw.githubusercontent.com/rfnajid/cek-operator/master/assets/images/operator/" + operator + ".jpg";
}

const setResult = (result) => {

    operator.value = result.operator;
    card.value = result.card;
    setMessage(result.message);
    setOperatorLogo(result.operator);

    if(result.valid){
        hide(error)
        show(resultCard);
    }else{
        hide(resultCard);
        show(error);
    }
}

const checkOperator = () => {
    // result object => { operator : string, card: string, message: string, valid: boolean}
    const result = getOperator(tel.value, true);
    setResult(result);
}


init();
</script>
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
        const textbrat = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=false&delay=100`;
        const response = await axios.get(textbrat, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (err) {
        console.error('Error /brat:', err.message);
        res.status(500).json({ error: 'Gagal membuat brat text', details: err.message });
    }
});

app.get('/gitdown', async (req, res) => {
    const url = req.query.url;
    
    // Validasi parameter
    if (!url) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Parameter "url" wajib diisi',
            example: '/gitdown?url=https://github.com/user/repo'
        });
    }

    // Regex untuk ekstraksi info GitHub
    const githubRegex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    const match = url.match(githubRegex);
    
    if (!match) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'URL GitHub tidak valid',
            tips: 'Gunakan format: https://github.com/username/repository'
        });
    }

    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, '');
    const apiUrl = `https://api.github.com/repos/${owner}/${cleanRepo}`;
    const zipUrl = `https://api.github.com/repos/${owner}/${cleanRepo}/zipball`;

    try {
        // Dapatkan info repo dari GitHub API
        const repoInfo = await axios.get(apiUrl);
        const { name, description, html_url, stargazers_count, forks_count } = repoInfo.data;

        // Dapatkan nama file dari header
        const headResponse = await axios.head(zipUrl);
        const contentDisposition = headResponse.headers['content-disposition'];
        const filename = contentDisposition 
            ? contentDisposition.match(/filename=(.*)/)[1] 
            : `${cleanRepo}-${Date.now()}.zip`;

        // Response JSON dengan info download
        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: {
                repository: {
                    owner,
                    name: cleanRepo,
                    full_name: `${owner}/${cleanRepo}`,
                    description,
                    url: html_url,
                    stars: stargazers_count,
                    forks: forks_count
                },
                download: {
                    url: zipUrl,
                    filename,
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.github+json'
                    }
                },
                instructions: {
                    curl: `curl -L -o "${filename}" "${zipUrl}"`,
                    wget: `wget -O "${filename}" "${zipUrl}"`,
                    browser: `Buka link di browser: ${zipUrl}`
                }
            }
        });

    } catch (error) {
        console.error('GitHub API Error:', error);
        
        let errorMessage = 'Gagal mendapatkan informasi repository';
        let statusCode = 500;
        
        if (error.response?.status === 404) {
            errorMessage = 'Repository tidak ditemukan';
            statusCode = 404;
        } else if (error.response?.status === 403) {
            errorMessage = 'Terlalu banyak permintaan, coba lagi nanti';
            statusCode = 429;
        }

        res.status(statusCode).json({
            status: 'error',
            code: statusCode,
            message: errorMessage,
            debug: error.response?.data?.message || error.message
        });
    }
});

async function ffstalk(id) {
let data = JSON.stringify({
  "app_id": 100067,
  "login_id": id
});

let config = {
  method: 'POST',
  url: 'https://kiosgamer.co.id/api/auth/player_id_login',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'sec-ch-ua-platform': '"Android"',
    'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
    'sec-ch-ua-mobile': '?1',
    'Origin': 'https://kiosgamer.co.id',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://kiosgamer.co.id/',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cookie': 'source=mb; region=CO.ID; mspid2=d175049875f78d90e7618f10b5930826; _ga=GA1.1.1096715143.1744003536; language=id; datadome=Oh~Qd6USZYfQps_cIi6V06MyaYyU4M8goxVzxq6lyoLUu6ml9hRkiA6eiMdmFuBr6hwB52PiydIWCRZxWtdE1FQLBGu7nqW5mfbBfXbSLbhg7XlKtPfOVTOzJ4OhLFgm; session_key=4txikks54uzrbj9hz174ic2g8ma0zd2p; _ga_Q7ESEPHPSF=GS1.1.1744003535.1.1.1744004048.0.0.0'
  },
  data: data
};

const api = await axios.request(config);
return api.data;
}
app.get('/ffstalk', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: 'Parameter "id" wajib diisi' });
    }

    try {
        const userData = await ffstalk(id);
        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: userData,
            uid: id
        });
    } catch (err) {
        console.error('Error /ffstalk:', err.message);
        res.status(500).json({ error: 'Gagal mengambil data free fire stalk', details: err.message });
    }
});
async function ytsSearch(search) {
  try {
    const { videos, channels, playlists, live } = await yts(search);

    return {
      videos: videos.map(video => ({
        id: video.videoId,
        title: video.title,
        url: video.url,
        thumbnail: video.thumbnail,
        duration: video.duration.timestamp,
        views: video.views,
        uploaded: video.uploadedAt,
        author: {
          name: video.author.name,
          url: video.author.url
        }
      })),
      channels: channels.map(channel => ({
        id: channel.channelId,
        name: channel.name,
        url: channel.url,
        thumbnail: channel.image
      })),
      playlists: playlists.map(playlist => ({
        id: playlist.listId,
        title: playlist.title,
        url: playlist.url,
        thumbnail: playlist.thumbnail,
        videoCount: playlist.videoCount,
        author: playlist.author.name
      })),
      liveStreams: live.map(stream => ({
        id: stream.videoId,
        title: stream.title,
        url: stream.url,
        thumbnail: stream.thumbnail,
        watching: stream.views,
        author: {
          name: stream.author.name,
          url: stream.author.url
        }
      }))
    };
  } catch (error) {
    throw new Error(`YouTube search failed: ${error.message}`);
  }
}
app.get('/ytsearch', async (req, res) => {
    const search = req.query.search;
    if (!search) {
        return res.status(400).json({ error: 'Parameter "search" wajib diisi' });
    }

    try {
        const userData = await ytsSearch(search);
        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: userData
        });
    } catch (err) {
        console.error('Error /ytsearch:', err.message);
        res.status(500).json({ error: 'Gagal mengambil data ytsearch', details: err.message });
    }
});
async function telegramStalk(user) {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get('https://t.me/' + user, {
				headers: {
					'x-return-format': 'html'
				}
			});
			const $ = cheerio.load(data);
			resolve({
				url: 'https://t.me/' + user,
				title: $('meta[property="og:title"]').attr('content'),
				description: $('meta[property="og:description"]').attr('content'),
				image_url: $('meta[property="og:image"]').attr('content')
			})
		} catch (e) {
			reject(e)
		}
	})
}
app.get('/telestalk', async (req, res) => {
    const user = req.query.user;
    if (!user) {
        return res.status(400).json({ error: 'Parameter "user" wajib diisi' });
    }

    try {
        const userData = await telegramStalk(user);
        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: userData
        });
    } catch (err) {
        console.error('Error /telestalk:', err.message);
        res.status(500).json({ error: 'Gagal mengambil data telestalk', details: err.message });
    }
});
app.get('/githsc', async (req, res) => {
    const query = req.query.query;
    
    if (!query) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Parameter "query" wajib diisi',
            example: '/githsc?query=stalker'
        });
    }

    try {
        // Pencarian repository di GitHub tanpa token
        const searchResponse = await axios.get(
            'https://api.github.com/search/repositories', {
                params: { q: query },
                headers: {
                    'User-Agent': 'ZiddRestAPI',
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        // Ambil 10 repository pertama
        const topRepos = searchResponse.data.items.slice(0, 10);
        
        // Proses setiap repository untuk mendapatkan file
        const repoDetails = await Promise.all(topRepos.map(async repo => {
            try {
                // Dapatkan konten repository tanpa token
                const contentsResponse = await axios.get(
                    `https://api.github.com/repos/${repo.full_name}/contents`,
                    {
                        headers: {
                            'User-Agent': 'ZiddRestAPI',
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    }
                );
                
                // Hitung total file dan folder
                const totalItems = contentsResponse.data.length;
                const totalFiles = contentsResponse.data.filter(item => item.type === 'file').length;
                const totalFolders = contentsResponse.data.filter(item => item.type === 'dir').length;
                
                // Ambil 10 file pertama
                const files = contentsResponse.data
                    .filter(item => item.type === 'file')
                    .slice(0, 10)
                    .map(file => ({
                        name: file.name,
                        size: formatBytes(file.size),
                        download_url: file.download_url,
                        type: file.type
                    }));
                
                return {
                    repository: repo.name,
                    owner: repo.owner.login,
                    description: repo.description || 'No description available',
                    html_url: repo.html_url,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language || 'Unknown',
                    created: formatDate(repo.created_at),
                    updated: formatDate(repo.updated_at),
                    total_items: totalItems,
                    total_files: totalFiles,
                    total_folders: totalFolders,
                    files: files
                };
                
            } catch (error) {
                // Jika gagal ambil konten, tetap kembalikan info dasar
                return {
                    repository: repo.name,
                    owner: repo.owner.login,
                    description: repo.description || 'No description available',
                    html_url: repo.html_url,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language || 'Unknown',
                    created: formatDate(repo.created_at),
                    updated: formatDate(repo.updated_at),
                    error: 'Gagal mengambil daftar file'
                };
            }
        }));

        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            query: query,
            total_results: searchResponse.data.total_count,
            results: repoDetails
        });

    } catch (error) {
        console.error('GitHub API Error:', error);
        
        let statusCode = 500;
        let errorMessage = 'Gagal mencari repository GitHub';
        
        if (error.response?.status === 403) {
            statusCode = 429;
            errorMessage = 'Terlalu banyak permintaan, coba lagi nanti (GitHub rate limit)';
        } else if (error.response?.status === 422) {
            statusCode = 400;
            errorMessage = 'Query tidak valid';
        }

        res.status(statusCode).json({
            status: 'error',
            code: statusCode,
            message: errorMessage,
            details: error.response?.data?.message || error.message
        });
    }
});

// Fungsi pembantu untuk format tanggal
function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Fungsi pembantu untuk format ukuran file
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
async function blackboxAi(query) {
try {
const headers = {
'Accept': '/',
'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'id-ID,id;q=0.9',
'Content-Type': 'application/json',
'Origin': 'https://www.blackbox.ai',
'Referer': 'https://www.blackbox.ai/',
'Sec-Ch-Ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
'Sec-Ch-Ua-Mobile': '?1',
'Sec-Ch-Ua-Platform': '"Android"',
'Sec-Fetch-Dest': 'empty',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Site': 'same-origin',
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
};

const payload = {  
  messages: [{ role: 'user', content: query, id: '0quFtyH' }],  
  id: 'KB5EUHk',  
  previewToken: null,  
  userId: null,  
  codeModelMode: true,  
  trendingAgentMode: {},  
  isMicMode: false,  
  userSystemPrompt: null,  
  maxTokens: 1024,  
  playgroundTopP: null,  
  playgroundTemperature: null,  
  isChromeExt: false,  
  githubToken: '',  
  clickedAnswer2: false,  
  clickedAnswer3: false,  
  clickedForceWebSearch: false,  
  visitFromDelta: false,  
  isMemoryEnabled: false,  
  mobileClient: false,  
  userSelectedModel: null,  
  validated: '00f37b34-a166-4efb-bce5-1312d87f2f94',  
  imageGenerationMode: false,  
  webSearchModePrompt: false,  
  deepSearchMode: false,  
  domains: null,  
  vscodeClient: false,  
  codeInterpreterMode: false,  
  customProfile: {  
    name: '',  
    occupation: '',  
    traits: [],  
    additionalInfo: '',  
    enableNewChats: false  
  },  
  webSearchModeOption: {  
    autoMode: true,  
    webMode: false,  
    offlineMode: false  
  },  
  session: null,  
  isPremium: false,  
  subscriptionCache: null,  
  beastMode: false,  
  reasoningMode: false,  
  designerMode: false,  
  workspaceId: '',  
  asyncMode: false,  
  isTaskPersistent: false  
};  

const postRes = await axios.post('https://www.blackbox.ai/api/chat', payload, {  
  headers  
});  

const raw = postRes.data;  
const parsed = raw.split('$~~~$');  
if (parsed.length === 1) {  
  return {  
    creator: global.creator,  
    status: true,  
    data: {  
      response: parsed[0].trim(),  
      source: []  
    }  
  };  
} else if (parsed.length >= 3) {  
  const resultText = parsed[2].trim();  
  const resultSources = JSON.parse(parsed[1]);  
  return {  
    creator: global.creator,  
    status: true,  
    data: {  
      response: resultText,  
      source: resultSources.map(s => ({  
        link: s.link,  
        title: s.title,  
        snippet: s.snippet,  
        position: s.position  
      }))  
    }  
  };  
} else {  
  throw new Error("Format response tidak dikenali.");  
}

} catch (err) {
console.error("Terjadi kesalahan:", err.message);
return {
creator: global.creator,
status: false,
error: err.message
};
}
}
app.get('/blackbox', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({
      status: false,
      error: 'Parameter "query" wajib diisi'
    });
  }

  try {
    const result = await blackboxAi(query);
    res.json(result);
  } catch (err) {
    console.error("Error /blackbox:", err.message);
    res.status(500).json({
      status: false,
      error: 'Gagal mengambil data dari blackbox',
      details: err.message
    });
  }
});
// Muslim AI function
async function muslimai(query) {
    const searchUrl = 'https://www.muslimai.io/api/search';
    const searchData = {
        query: query
    };
    const headers = {
        'Content-Type': 'application/json'
    };
    try {
        const searchResponse = await axios.post(searchUrl, searchData, { headers: headers });

        const passages = searchResponse.data.map(item => item.content).join('\n\n');

        const answerUrl = 'https://www.muslimai.io/api/answer';
        const answerData = {
            prompt: `Use the following passages to answer the query to the best of your ability as a world class expert in the Quran. Do not mention that you were provided any passages in your answer: ${query}\n\n${passages}`
        };

        const answerResponse = await axios.post(answerUrl, answerData, { headers: headers });

        const result = {
            answer: answerResponse.data,
            source: searchResponse.data
        };

        return result;
    } catch (error) {
        console.error('Error occurred:', error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to handle it in the route
    }
}

// Route handler
app.get('/muslim-ai', async (req, res) => {
    const query = req.query.ask;
    if (!query) {
        return res.status(400).json({ error: 'Parameter "ask" wajib diisi' });
    }

    try {
        const aiResponse = await muslimai(query);
        res.json({
            status: 'success',
            code: 200,
            author: 'ziddrestMyAPI',
            data: aiResponse,
            query: query
        });
    } catch (err) {
        console.error('Error /muslim-ai:', err.message);
        res.status(500).json({ 
            error: 'Gagal mendapatkan jawaban dari Muslim AI', 
            details: err.message 
        });
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
