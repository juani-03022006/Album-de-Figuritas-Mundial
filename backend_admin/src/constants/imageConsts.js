const DEFAULT_PROVIDER = String(process.env.LAZY_DIRECT_SEARCH_PROVIDER ?? 'bing').toLowerCase();
const ENABLE_DIRECT_SEARCH_IMAGES = process.env.LAZY_DIRECT_SEARCH_IMAGES !== 'false';

export const THUMBNAIL_SIZES = {
    portrait: {
        width: Number(process.env.LAZY_IMAGE_PORTRAIT_WIDTH ?? 360),
        height: Number(process.env.LAZY_IMAGE_PORTRAIT_HEIGHT ?? 500),
    },
    landscape: {
        width: Number(process.env.LAZY_IMAGE_LANDSCAPE_WIDTH ?? 720),
        height: Number(process.env.LAZY_IMAGE_LANDSCAPE_HEIGHT ?? 500),
    },
    flag: {
        width: Number(process.env.LAZY_IMAGE_FLAG_WIDTH ?? 180),
        height: Number(process.env.LAZY_IMAGE_FLAG_HEIGHT ?? 120),
    },
};


