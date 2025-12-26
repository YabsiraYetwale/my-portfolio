import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';

const QRCode = () => {
  const qrRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const portfolioUrl = 'https://yabsira-yetwale-portfolio.vercel.app';

  const convertImageToDataURL = (imagePath) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      // Try with CORS first, fallback without if needed
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        // Try without CORS as fallback
        const img2 = new Image();
        img2.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img2.width;
            canvas.height = img2.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img2, 0, 0);
            resolve(canvas.toDataURL('image/png'));
          } catch (error) {
            reject(error);
          }
        };
        img2.onerror = () => reject(new Error('Failed to load image'));
        img2.src = imagePath;
      };
      
      // Resolve path - handle both relative and absolute paths
      let resolvedPath;
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        resolvedPath = imagePath;
      } else if (imagePath.startsWith('/')) {
        // Absolute path from root
        resolvedPath = window.location.origin + imagePath;
      } else {
        // Relative path
        resolvedPath = window.location.origin + '/' + imagePath;
      }
      
      img.src = resolvedPath;
    });
  };

  const applyCircularClipToSVG = (svg) => {
    // svg is already cloned, so we can modify it directly
    const imageElement = svg.querySelector('image');
    
    if (imageElement) {
      // Check if image has a valid source
      const imageSrc = imageElement.getAttribute('href') || imageElement.getAttribute('xlink:href');
      if (!imageSrc) {
        // No image source, skip clip path
        return svg;
      }
      
      const svgNS = 'http://www.w3.org/2000/svg';
      let defs = svg.querySelector('defs');
      
      if (!defs) {
        defs = document.createElementNS(svgNS, 'defs');
        svg.insertBefore(defs, svg.firstChild);
      }
      
      const clipPathId = 'logo-clip-circle';
      let clipPath = defs.querySelector(`#${clipPathId}`);
      
      if (!clipPath) {
        clipPath = document.createElementNS(svgNS, 'clipPath');
        clipPath.setAttribute('id', clipPathId);
        const circle = document.createElementNS(svgNS, 'circle');
        const x = parseFloat(imageElement.getAttribute('x') || 0);
        const y = parseFloat(imageElement.getAttribute('y') || 0);
        const width = parseFloat(imageElement.getAttribute('width') || 40);
        const height = parseFloat(imageElement.getAttribute('height') || 40);
        const cx = x + width / 2;
        const cy = y + height / 2;
        const r = Math.min(width, height) / 2;
        
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        clipPath.appendChild(circle);
        defs.appendChild(clipPath);
      }
      
      imageElement.setAttribute('clip-path', `url(#${clipPathId})`);
    }
    
    return svg;
  };

  const downloadQRCode = async () => {
    setIsDownloading(true);
    try {
      const wrapper = qrRef.current;
      if (!wrapper) return;

      const svg = wrapper.querySelector('svg');
      if (!svg) return;

      // Clone SVG first to avoid modifying the original
      const svgClone = svg.cloneNode(true);

      // Convert image to data URL if it's not already
      const imageElement = svgClone.querySelector('image');
      if (imageElement) {
        const imageSrc = imageElement.getAttribute('href') || imageElement.getAttribute('xlink:href');
        if (imageSrc && !imageSrc.startsWith('data:')) {
          try {
            const dataURL = await convertImageToDataURL(imageSrc);
            imageElement.setAttribute('href', dataURL);
            imageElement.setAttribute('xlink:href', dataURL);
          } catch (error) {
            console.warn('Could not convert image to data URL, removing image element:', error);
            // Remove the image element if conversion fails to avoid broken SVG
            imageElement.remove();
          }
        }
      }

      // Apply circular clip path to SVG
      const svgWithClip = applyCircularClipToSVG(svgClone);
      
      // Ensure SVG has proper namespaces for proper serialization
      if (!svgWithClip.getAttribute('xmlns')) {
        svgWithClip.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }
      if (!svgWithClip.getAttribute('xmlns:xlink')) {
        svgWithClip.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      }
      
      const svgData = new XMLSerializer().serializeToString(svgWithClip);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      // Add timeout to prevent hanging
      let timeoutId;
      const timeout = setTimeout(() => {
        toast.error('QR code processing timed out. Please try again.');
        setIsDownloading(false);
      }, 10000);
      timeoutId = timeout;

      img.onerror = (error) => {
        if (timeoutId) clearTimeout(timeoutId);
        console.error('Error loading SVG as image:', error);
        console.error('SVG snippet:', svgData.substring(0, 300));
        toast.error('Failed to process QR code image. Please try again.');
        setIsDownloading(false);
      };

      img.onload = () => {
        if (timeoutId) clearTimeout(timeoutId);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            toast.error('Failed to create image file');
            setIsDownloading(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'portfolio-qrcode.png';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          toast.success('QR code downloaded successfully!');
          setIsDownloading(false);
        }, 'image/png');
      };

      // Use base64 encoding which is more reliable for SVG with embedded images
      const base64Svg = btoa(unescape(encodeURIComponent(svgData)));
      img.src = 'data:image/svg+xml;base64,' + base64Svg;
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error('Failed to download QR code');
      setIsDownloading(false);
    }
  };

  const copyQRCode = async () => {
    try {
      const wrapper = qrRef.current;
      if (!wrapper) return;

      const svg = wrapper.querySelector('svg');
      if (!svg) return;

      // Clone SVG first to avoid modifying the original
      const svgClone = svg.cloneNode(true);

      // Convert image to data URL if it's not already
      const imageElement = svgClone.querySelector('image');
      if (imageElement) {
        const imageSrc = imageElement.getAttribute('href') || imageElement.getAttribute('xlink:href');
        if (imageSrc && !imageSrc.startsWith('data:')) {
          try {
            const dataURL = await convertImageToDataURL(imageSrc);
            imageElement.setAttribute('href', dataURL);
            imageElement.setAttribute('xlink:href', dataURL);
          } catch (error) {
            console.warn('Could not convert image to data URL, removing image element:', error);
            // Remove the image element if conversion fails to avoid broken SVG
            imageElement.remove();
          }
        }
      }

      // Apply circular clip path to SVG
      const svgWithClip = applyCircularClipToSVG(svgClone);
      
      // Ensure SVG has proper namespaces for proper serialization
      if (!svgWithClip.getAttribute('xmlns')) {
        svgWithClip.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }
      if (!svgWithClip.getAttribute('xmlns:xlink')) {
        svgWithClip.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      }
      
      const svgData = new XMLSerializer().serializeToString(svgWithClip);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onerror = (error) => {
        console.error('Error loading SVG as image:', error);
        console.error('SVG snippet:', svgData.substring(0, 300));
        toast.error('Failed to process QR code image. Please try again.');
      };

      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(async (blob) => {
          if (!blob) {
            toast.error('Failed to create image file');
            return;
          }
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ]);
            toast.success('QR code copied to clipboard!');
          } catch (error) {
            // Fallback for browsers that don't support ClipboardItem
            console.error('Error copying to clipboard:', error);
            toast.error('Failed to copy QR code. Please use download instead.');
          }
        }, 'image/png');
      };

      // Use base64 encoding which is more reliable for SVG with embedded images
      const base64Svg = btoa(unescape(encodeURIComponent(svgData)));
      img.src = 'data:image/svg+xml;base64,' + base64Svg;
    } catch (error) {
      console.error('Error copying QR code:', error);
      toast.error('Failed to copy QR code');
    }
  };

  return (
    <div className="qr-code-section">
      <h3 className="h3 qr-title">Scan to View Portfolio</h3>
      <p className="qr-description">Share this QR code to let others easily access my portfolio</p>
      
      <div className="qr-code-container">
        <div className="qr-code-wrapper" ref={qrRef}>
          <QRCodeSVG
            value={portfolioUrl}
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#000000"
            bgColor="#ffffff"
            imageSettings={{
              src: "/images/yabu.JPG",
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
        
        <div className="qr-actions">
          <button 
            className="qr-btn download-btn" 
            onClick={downloadQRCode}
            disabled={isDownloading}
          >
            <ion-icon name="download-outline"></ion-icon>
            <span>{isDownloading ? 'Downloading...' : 'Download QR Code'}</span>
          </button>
          
          <button 
            className="qr-btn copy-btn" 
            onClick={copyQRCode}
          >
            <ion-icon name="copy-outline"></ion-icon>
            <span>Copy QR Code</span>
          </button>
        </div>
        
        <div className="qr-url">
          <p className="qr-url-text">{portfolioUrl}</p>
        </div>
      </div>
    </div>
  );
};

export default QRCode;

