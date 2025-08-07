import Image from 'next/image';

export const ExportedImage = ({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    quality = 75,
    ...props
}) => {
    return (
        <Image
            src={src}
            alt={alt || "Image"}
            width={width || 500}
            height={height || 500}
            className={className || ""}
            priority={priority}
            quality={quality}
            {...props}
        />
    );
};

export default ExportedImage; 