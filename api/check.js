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
    const { api } = req.query;
    if (!api) {
        return res.status(400).json({ message: 'API parameter is missing' });
    }

    const apiList = readApiList();
    if (apiList.includes(api)) {
        res.status(200).json({ exists: true });
    } else {
        res.status(200).json({ exists: false });
    }
};
