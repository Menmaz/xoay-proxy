const fs = require('fs');
const FILE_PATH = './api_list.txt';

const readApiList = () => {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, '');
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return data.split('\n').filter(line => line.trim() !== '');
};

const writeApiList = (apiList) => {
    fs.writeFileSync(FILE_PATH, apiList.join('\n'));
};

export default (req, res) => {
    const { api } = req.query;
    if (!api) {
        return res.status(400).json({ message: 'API parameter is missing' });
    }

    const apiList = readApiList();
    const newApiList = apiList.filter(item => item !== api);

    if (apiList.length === newApiList.length) {
        return res.status(404).json({ message: 'API not found' });
    }

    writeApiList(newApiList);
    res.status(200).json({ message: `Deleted API: ${api}` });
};
