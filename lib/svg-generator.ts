// SVG Generation Utilities for Floor Plans

import { Room, StructuralElement } from './types';

const SCALE = 20; // pixels per meter

// Premium dark theme colors for rooms
const ROOM_COLORS: Record<string, string> = {
  bedroom: '#1a3a4f',
  kitchen: '#2a3a3f',
  bathroom: '#1a4040',
  toilet: '#1a3a3a',
  living: '#2a3a5f',
  dining: '#3a2a4f',
  hallway: '#1a2a3f',
  parking: '#2a2a3a',
  storage: '#1a3a4a',
  balcony: '#2a4a4f',
  staircase: '#1a2a2f',
};

// Bright cyan/neon accent colors for borders
const ROOM_BORDERS: Record<string, string> = {
  bedroom: '#00d9ff',
  kitchen: '#0099ff',
  bathroom: '#00ff88',
  toilet: '#00ff88',
  living: '#ff6b9d',
  dining: '#ffd700',
  hallway: '#00d9ff',
  parking: '#4a5568',
  storage: '#0099ff',
  balcony: '#00ff88',
  staircase: '#00d9ff',
};

export function generateFloorPlanSVG(
  rooms: Room[],
  plotLength: number,
  plotBreadth: number,
  floorNumber: number = 1
): string {
  const width = plotLength * SCALE;
  const height = plotBreadth * SCALE;
  const padding = 40;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width + padding * 3} ${height + padding * 3}" width="${width + padding * 3}" height="${height + padding * 3}">`;
  
  // Background - dark theme
  svg += `<rect width="${width + padding * 3}" height="${height + padding * 3}" fill="#0a0e27"/>`;
  
  // Grid pattern
  svg += `<defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00d9ff" stroke-width="0.5" opacity="0.05"/></pattern></defs>`;
  
  // Plot background with grid
  svg += `<rect x="${padding}" y="${padding}" width="${width}" height="${height}" fill="url(#grid)"/>`;
  
  // Title with floor number
  svg += `<text x="${(width + padding * 3) / 2}" y="28" font-size="20" font-weight="bold" text-anchor="middle" fill="#00d9ff">Floor ${floorNumber} Plan</text>`;
  
  // Plot border with cyan glow (main boundary)
  svg += `<rect x="${padding}" y="${padding}" width="${width}" height="${height}" fill="none" stroke="#00d9ff" stroke-width="3" opacity="0.9"/>`;
  svg += `<rect x="${padding - 2}" y="${padding - 2}" width="${width + 4}" height="${height + 4}" fill="none" stroke="#00d9ff" stroke-width="0.5" opacity="0.2"/>`;
  
  // Compass rose (orientation indicator)
  const compassX = padding + width + 25;
  const compassY = padding + 30;
  const compassSize = 20;
  svg += `<circle cx="${compassX}" cy="${compassY}" r="${compassSize}" fill="none" stroke="#00d9ff" stroke-width="1" opacity="0.5"/>`;
  svg += `<text x="${compassX}" y="${compassY - compassSize - 8}" font-size="12" font-weight="bold" text-anchor="middle" fill="#ff6b9d">N</text>`;
  svg += `<text x="${compassX + compassSize + 8}" y="${compassY + 5}" font-size="10" text-anchor="start" fill="#a0aec0">E</text>`;
  
  // Top dimension ruler (Length)
  svg += `<line x1="${padding}" y1="${padding - 20}" x2="${padding + width}" y2="${padding - 20}" stroke="#00d9ff" stroke-width="1.5" opacity="0.6"/>`;
  svg += `<line x1="${padding}" y1="${padding - 24}" x2="${padding}" y2="${padding - 16}" stroke="#00d9ff" stroke-width="1.5"/>`;
  svg += `<line x1="${padding + width}" y1="${padding - 24}" x2="${padding + width}" y2="${padding - 16}" stroke="#00d9ff" stroke-width="1.5"/>`;
  svg += `<text x="${padding + width / 2}" y="${padding - 28}" font-size="13" font-weight="bold" text-anchor="middle" fill="#00d9ff">${plotLength}m (Length/North-South)</text>`;
  
  // Left dimension ruler (Breadth)
  svg += `<line x1="${padding - 20}" y1="${padding}" x2="${padding - 20}" y2="${padding + height}" stroke="#0099ff" stroke-width="1.5" opacity="0.6"/>`;
  svg += `<line x1="${padding - 24}" y1="${padding}" x2="${padding - 16}" y2="${padding}" stroke="#0099ff" stroke-width="1.5"/>`;
  svg += `<line x1="${padding - 24}" y1="${padding + height}" x2="${padding - 16}" y2="${padding + height}" stroke="#0099ff" stroke-width="1.5"/>`;
  svg += `<text x="${padding - 38}" y="${padding + height / 2}" font-size="13" font-weight="bold" text-anchor="middle" fill="#0099ff" transform="rotate(-90 ${padding - 38} ${padding + height / 2})">${plotBreadth}m (Breadth/East-West)</text>`;
  
  // Render rooms
  for (const room of rooms) {
    const x = padding + room.x * SCALE;
    const y = padding + room.y * SCALE;
    const w = room.width * SCALE;
    const h = room.height * SCALE;
    
    const bgColor = ROOM_COLORS[room.type] || '#1a2235';
    const borderColor = ROOM_BORDERS[room.type] || '#00d9ff';
    
    // Room shadow/glow effect
    svg += `<filter id="glow-${room.id}"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
    
    // Room rectangle with gradient fill
    svg += `<defs><linearGradient id="grad-${room.id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${bgColor};stop-opacity:0.6" /><stop offset="100%" style="stop-color:${bgColor};stop-opacity:0.9" /></linearGradient></defs>`;
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#grad-${room.id})" stroke="${borderColor}" stroke-width="2" rx="6" opacity="0.95" filter="url(#glow-${room.id})"/>`;
    
    // Inner border highlight
    svg += `<rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" fill="none" stroke="${borderColor}" stroke-width="0.5" rx="5" opacity="0.3"/>`;
    
    // Room name label
    svg += `<text x="${x + w / 2}" y="${y + h / 2 - 12}" font-size="11" text-anchor="middle" font-weight="bold" fill="#f0f4f8">${room.name}</text>`;
    
    // Dimensions
    svg += `<text x="${x + w / 2}" y="${y + h / 2 + 3}" font-size="9" text-anchor="middle" fill="#00d9ff" opacity="0.9">${room.width.toFixed(1)}m × ${room.height.toFixed(1)}m</text>`;
    
    // Area in square meters
    svg += `<text x="${x + w / 2}" y="${y + h / 2 + 14}" font-size="8" text-anchor="middle" fill="#a0aec0" opacity="0.7">${(room.width * room.height).toFixed(1)} m²</text>`;
  }
  
  // Legend
  const legendY = padding + height + 20;
  svg += `<line x1="${padding}" y1="${legendY - 5}" x2="${width + padding}" y2="${legendY - 5}" stroke="#00d9ff" stroke-width="1" opacity="0.3"/>`;
  svg += `<text x="${padding}" y="${legendY + 10}" font-size="12" font-weight="bold" fill="#00d9ff">Legend:</text>`;
  
  Object.entries(ROOM_COLORS).forEach(([type, color], index) => {
    const xPos = padding + (index % 5) * 110;
    const yPos = legendY + 30 + Math.floor(index / 5) * 22;
    
    // Legend color box with border
    svg += `<rect x="${xPos}" y="${yPos - 10}" width="14" height="14" fill="${color}" stroke="${ROOM_BORDERS[type]}" stroke-width="1.5" rx="2" opacity="0.8"/>`;
    
    // Legend label
    svg += `<text x="${xPos + 20}" y="${yPos - 2}" font-size="10" fill="#f0f4f8">${type.charAt(0).toUpperCase() + type.slice(1)}</text>`;
  });
  
  svg += `</svg>`;
  
  return svg;
}

export function generateStructuralSVG(
  elements: StructuralElement[],
  plotLength: number,
  plotBreadth: number
): string {
  const width = plotLength * SCALE;
  const height = plotBreadth * SCALE;
  const padding = 40;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width + padding * 2} ${height + padding * 2}" width="${width + padding * 2}" height="${height + padding * 2}">`;
  
  // Background
  svg += `<rect width="${width + padding * 2}" height="${height + padding * 2}" fill="#fafafa"/>`;
  
  // Title
  svg += `<text x="${(width + padding * 2) / 2}" y="25" font-size="18" font-weight="bold" text-anchor="middle" fill="#1a3a52">Structural Layout</text>`;
  
  // Plot border
  svg += `<rect x="${padding}" y="${padding}" width="${width}" height="${height}" fill="none" stroke="#1a3a52" stroke-width="2"/>`;
  
  // Render elements
  elements.forEach((elem) => {
    const x = padding + elem.x * SCALE;
    const y = padding + elem.y * SCALE;
    const w = elem.width * SCALE;
    const h = elem.height * SCALE;
    
    let color = '#ccc';
    let label = '';
    
    switch (elem.type) {
      case 'column':
        color = '#dc2626';
        label = 'Col';
        svg += `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${Math.min(w, h) / 2}" fill="${color}" opacity="0.7" stroke="#991b1b" stroke-width="1"/>`;
        break;
      case 'beam':
        color = '#2563eb';
        label = 'Beam';
        svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}" opacity="0.6" stroke="#1e40af" stroke-width="1"/>`;
        break;
      case 'wall':
        color = '#666';
        label = 'Wall';
        svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}" opacity="0.8" stroke="#333" stroke-width="1"/>`;
        break;
      case 'foundation':
        color = '#92400e';
        label = 'Found';
        svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="4,4"/>`;
        break;
    }
    
    // Label
    svg += `<text x="${x + w / 2}" y="${y + h / 2 + 4}" font-size="8" text-anchor="middle" font-weight="bold" fill="white">${label}</text>`;
  });
  
  // Legend
  const legendY = padding + height + 20;
  svg += `<text x="${padding}" y="${legendY}" font-size="12" font-weight="bold" fill="#1a3a52">Legend:</text>`;
  
  const legends = [
    { type: 'column', color: '#dc2626', label: 'Columns' },
    { type: 'beam', color: '#2563eb', label: 'Beams' },
    { type: 'wall', color: '#666', label: 'Walls' },
    { type: 'foundation', color: '#92400e', label: 'Foundation' },
  ];
  
  legends.forEach((leg, index) => {
    const xPos = padding + (index % 2) * 150;
    const yPos = legendY + 20 + Math.floor(index / 2) * 20;
    
    if (leg.type === 'foundation') {
      svg += `<line x1="${xPos}" y1="${yPos - 6}" x2="${xPos + 12}" y2="${yPos - 6}" stroke="${leg.color}" stroke-width="2" stroke-dasharray="4,4"/>`;
    } else {
      svg += `<rect x="${xPos}" y="${yPos - 10}" width="12" height="12" fill="${leg.color}" opacity="0.6"/>`;
    }
    
    svg += `<text x="${xPos + 18}" y="${yPos - 2}" font-size="10" fill="#333">${leg.label}</text>`;
  });
  
  svg += `</svg>`;
  
  return svg;
}

export function svgToImage(svg: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    img.src = url;
  });
}

export function downloadSVG(svg: string, filename: string) {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
