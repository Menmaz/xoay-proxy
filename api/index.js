const fs = require('fs');
const FILE_PATH = './api_list.txt';

const readApiList = () => {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, '');
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return data.split('\n').filter(line => line.trim() !== '');
};

export default (req, res) => {
    const apiList = readApiList();
    
    let html = `
        <html>
        <head>
            <title>Proxy List</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { padding: 5px 0; }
                .api-item { font-weight: bold; color: #007bff; }
            </style>
        </head>
        <body>
            <h1>List of APIs (Proxies)</h1>
            <ul>
    `;

    if (apiList.length === 0) {
        html += `<li>No APIs found.</li>`;
    } else {
        apiList.forEach(api => {
            html += `<li class="api-item">${api}</li>`;
        });
    }

    html += `
            </ul>
        </body>
        </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
};
