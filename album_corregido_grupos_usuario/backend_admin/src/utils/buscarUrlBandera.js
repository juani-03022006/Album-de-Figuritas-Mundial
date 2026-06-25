const COMMONS_FILE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/';

export function buscarUrlBandera(fileName, width = 640) {
    const nombreConGuionesBajos = fileName.replaceAll(' ', '_');
    return `${COMMONS_FILE}${encodeURIComponent(nombreConGuionesBajos)}?width=${width}`;
};
