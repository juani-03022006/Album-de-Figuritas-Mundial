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
