const COMMONS_FILE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/';

export function buscarUrlBandera(fileName, width = 640) {
    return `${COMMONS_FILE}${encodeURIComponent(fileName)}?width=${width}`;
};
