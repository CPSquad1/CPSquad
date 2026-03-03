"use client";
import React, { useState, useEffect } from "react";

/**
 * EventStoryVisualization - A visual storytelling component for event details
 * 
 * Displays event information with a visual flow of circular image nodes
 * arranged in an intentional, editorial layout
 */
export default function EventStoryVisualization({
  title,
  subtitle,
  description,
  metadata,
  images = []
}) {
  // Debug: Log received images
  // useEffect(() => {
  //   console.log('📸 EventStoryVisualization Debug:');
  //   console.log('- Event:', title);
  //   console.log('- Images received:', images.length);
  //   console.log('- Images data:', images);
  //   if (images.length > 0) {
  //     console.log('- First image structure:', images[0]);
  //   }
  // }, [title, images]);

  // Use all available images instead of limiting to 8
  const storyImages = images.length > 0 
    ? images
    : [];
  
  const hasImages = storyImages.length > 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Desktop & Tablet Layout (≥768px) */}
      <div className="hidden md:grid md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] min-h-screen">
        {/* LEFT PANEL - Event Information */}
        <div className="bg-[#1e1e1e] border-r border-gray-800 flex relative">
          {/* Vertical "EVENT NAME" Tab */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#0a0a0a] border-r border-[#00FF41]/30 flex items-center justify-center">
            <span 
              className="text-xs font-black tracking-[0.3em] uppercase text-[#00FF41]"
              style={{ 
                writingMode: 'vertical-rl',
                textOrientation: 'mixed'
              }}
            >
              {title}
            </span>
          </div>

          {/* Event Content */}
          <div className="flex-1 overflow-y-auto p-8 ml-12">
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-3 leading-tight uppercase tracking-tight">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-base text-gray-400 mb-6 font-medium">
                {subtitle}
              </p>
            )}

            {/* Metadata */}
            {metadata && (
              <div className="mb-8 space-y-3">
                {metadata.date && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-bold text-[#00FF41] uppercase tracking-wide">Date:</span>
                    <span className="text-gray-300">{metadata.date}</span>
                  </div>
                )}
                {metadata.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-bold text-[#00FF41] uppercase tracking-wide">Location:</span>
                    <span className="text-gray-300">{metadata.location}</span>
                  </div>
                )}
                {metadata.tags && metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {metadata.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] text-xs font-bold rounded-full uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>{description}</p>
            </div>
          </div>

          {/* Glow effect on left panel */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-64 bg-[#00FF41]/5 blur-[100px]"></div>
          </div>
        </div>

        {/* RIGHT PANEL - Image Flow Layout */}
        <div className="relative bg-[#0a0a0a] p-12 lg:p-16 flex items-center justify-center">
          {/* Ambient glow effects */}
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00FF41]/10 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00FF41]/5 blur-[150px] rounded-full"></div>
          
          {hasImages ? (
            <ImageFlowDesktop images={storyImages} />
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-lg font-bold uppercase tracking-wider">No story images available</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout (<768px) */}
      <div className="md:hidden pt-20">
        {/* Event Info Header */}
        <div className="bg-[#1e1e1e] p-6 pb-8 border-b border-gray-800">
          <h1 className="text-3xl font-black text-white mb-2 leading-tight uppercase tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm text-gray-400 mb-4 font-medium">
              {subtitle}
            </p>
          )}

          {metadata && (
            <div className="space-y-2 text-sm">
              {metadata.date && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#00FF41]">Date:</span>
                  <span className="text-gray-300">{metadata.date}</span>
                </div>
              )}
              {metadata.location && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#00FF41]">Location:</span>
                  <span className="text-gray-300">{metadata.location}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Image Stack */}
        {hasImages && (
          <div className="bg-[#0a0a0a] px-6 py-8 relative">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00FF41]/5 blur-[100px]"></div>
            <ImageStackMobile images={storyImages} />
          </div>
        )}

        {/* Description */}
        <div className="bg-[#1e1e1e] p-6 text-gray-300 leading-relaxed border-t border-gray-800">
          <p>{description}</p>
        </div>

        {/* Tags */}
        {metadata?.tags && metadata.tags.length > 0 && (
          <div className="bg-[#1e1e1e] px-6 pb-6">
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] text-xs font-bold rounded-full uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Desktop Image Flow Layout
 * Dynamic grid layout that adapts to number of images
 * Creates a flowing zigzag pattern
 */
function ImageFlowDesktop({ images }) {
  // Generate dynamic node positions based on number of images
  const generateNodes = (count) => {
    const nodes = [];
    const rows = Math.ceil(count / 3); // 3 images per row
    
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      
      // Zigzag pattern: even rows go left-to-right, odd rows go right-to-left
      const isEvenRow = row % 2 === 0;
      const actualCol = isEvenRow ? col : (2 - col);
      
      const x = 15 + (actualCol * 35); // 15%, 50%, 85%
      const y = 10 + (row * (80 / Math.max(rows - 1, 1)));
      
      nodes.push({ id: i, x: `${x}%`, y: `${Math.min(y, 90)}%` });
    }
    
    return nodes;
  };

  const nodes = generateNodes(images.length);

  // Generate arrow connections for flow
  const arrows = [];
  for (let i = 0; i < images.length - 1; i++) {
    arrows.push({ from: i, to: i + 1 });
  }

  // Calculate dynamic height based on number of images
  const rows = Math.ceil(images.length / 3);
  const height = Math.max(600, rows * 250); // Minimum 600px, scale with rows

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      {/* SVG for arrows */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {arrows.map((arrow, index) => {
          const fromNode = nodes[arrow.from];
          const toNode = nodes[arrow.to];
          
          const x1 = fromNode.x;
          const y1 = fromNode.y;
          const x2 = toNode.x;
          const y2 = toNode.y;

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#00FF41"
              strokeWidth="2"
              strokeOpacity="0.3"
              markerEnd="url(#arrowhead)"
              className="transition-all duration-300"
            />
          );
        })}
        
        {/* Arrowhead marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#00FF41" fillOpacity="0.5" />
          </marker>
        </defs>
      </svg>

      {/* Image nodes */}
      {nodes.map((node, index) => {
        const image = images[index];
        if (!image) return null;

        return (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 group"
            style={{
              left: node.x,
              top: node.y,
              zIndex: 10
            }}
          >
            <div className="w-40 h-32 lg:w-52 lg:h-40 rounded-lg overflow-hidden shadow-2xl bg-[#1e1e1e] border-2 border-[#00FF41]/30 group-hover:border-[#00FF41] group-hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all duration-300">
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loadDelay={index * 300}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Mobile Image Stack Layout
 * Vertical timeline with downward flow
 */
function ImageStackMobile({ images }) {
  return (
    <div className="flex flex-col items-center gap-4 relative z-10">
      {images.map((image, index) => (
        <React.Fragment key={image.id}>
          {/* Image node */}
          <div className="w-full max-w-sm h-64 rounded-lg overflow-hidden shadow-2xl bg-[#1e1e1e] border-2 border-[#00FF41]/30 hover:border-[#00FF41] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all duration-300">
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loadDelay={index * 300}
            />
          </div>

          {/* Downward chevron (except for last image) */}
          {index < images.length - 1 && (
            <svg
              className="w-6 h-6 text-[#00FF41]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Image component with fallback and error handling
 * Includes lazy loading with delay to prevent rate limiting
 */
function ImageWithFallback({ src, alt, className, loadDelay = 0 }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(loadDelay === 0);

  useEffect(() => {
    setImgSrc(src);
    setError(false);
    setLoading(true);
    
    // Stagger image loading to avoid rate limiting
    if (loadDelay > 0) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, loadDelay);
      return () => clearTimeout(timer);
    }
  }, [src, loadDelay]);

  const handleError = (e) => {
    console.warn(`❌ Failed to load image: ${src}`);
    console.warn(`Error details:`, e);
    setError(true);
    setLoading(false);
    // Don't try to load another image, just show fallback UI
  };

  const handleLoad = () => {
    // console.log(`✅ Loaded image: ${src}`);
    setLoading(false);
    setError(false);
  };

  return (
    <>
      {loading && (
        <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
          <div className="animate-pulse text-[#00FF41] font-bold uppercase text-xs tracking-wider">Loading...</div>
        </div>
      )}
      {shouldLoad && (
        <img
          src={imgSrc}
          alt={alt}
          className={`${className} ${loading ? 'hidden' : 'block'}`}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
      {error && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e1e1e] to-[#0a0a0a]">
          <div className="text-center p-4">
            <svg className="w-12 h-12 mx-auto text-[#00FF41]/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Image</p>
          </div>
        </div>
      )}
    </>
  );
}
