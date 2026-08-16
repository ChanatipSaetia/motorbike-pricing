import { toPng } from 'html-to-image';

/**
 * Reliable Export Image Function using Dedicated Off-Screen Canvas Ref with Resilient Fallbacks
 */
export const generatePngDataUrl = async (ref) => {
  if (!ref || !ref.current) return null;

  // Primary capture with embedded image placeholders & font skipping
  try {
    return await toPng(ref.current, {
      cacheBust: false,
      quality: 0.95,
      pixelRatio: 2,
      skipFonts: true,
      fontEmbedCSS: '',
      imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    });
  } catch (err1) {
    console.warn('First export attempt failed, trying fallback capture without external background images:', err1);
    try {
      // Fallback capture ignoring external images if CORS/network fails
      return await toPng(ref.current, {
        cacheBust: true,
        skipFonts: true,
        fontEmbedCSS: '',
        filter: (node) => {
          if (node.tagName === 'IMG' && node.src && node.src.startsWith('http') && !node.src.includes(window.location.host)) {
            return false;
          }
          return true;
        }
      });
    } catch (err2) {
      console.error('All image export attempts failed:', err2);
      return null;
    }
  }
};
