import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

function toWebpSrc(src: string): string {
  return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  loading,
  decoding,
  fetchPriority,
  ...rest
}: OptimizedImageProps) {
  const webpSrc = toWebpSrc(src);

  return (
    <picture className="contents">
      {webpSrc !== src && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading ?? (priority ? 'eager' : 'lazy')}
        decoding={decoding ?? (priority ? 'sync' : 'async')}
        fetchPriority={fetchPriority ?? (priority ? 'high' : undefined)}
        {...rest}
      />
    </picture>
  );
}
