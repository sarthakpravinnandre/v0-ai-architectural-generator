// SVG Generation Utilities for Floor Plans

import { Room, StructuralElement } from './types';

const SCALE = 20; // pixels per meter
const ROOM_COLORS: Record<string, string> = {
  bedroom: '#e0e7ff',
  kitchen: '#fef3c7',
  bathroom: '#d1fae5',
  living: '#f3e8ff',
  dining: '#fecaca',
  hallway: '#f0fdf4',
  parking: '#e5e7eb',
  storage: '#dbeafe',
  balcony: '#fef08a',
};

const ROOM_BORDERS: Record<string, string> = {
  bedroom: '#818cf8',
  kitchen: '#f59e0b',
  bathroom: '#10b981',
  living: '#a78bfa',
  dining: '#ef4444',
  hallway: '#22c55e',
  parking: '#6b7280',
  storage: '#0ea5e9',
  balcony: '#eab308',
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

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width + padding * 2} ${height + padding * 2}" width="${width + padding * 2}" height="${height + padding * 2}">`;
  
  // Background
  svg += `<rect width="${width + padding * 2}" height="${height + padding * 2}" fill="#ffffff"/>`;
  
  // Title
  svg += `<text x="${(width + padding * 2) / 2}" y="25" font-size="18" font-weight="bold" text-anchor="middle" fill="#1a3a52">Floor ${floorNumber} - Floor Plan</text>`;
  
  // Plot border
  svg += `<rect x="${padding}" y="${padding}" width="${width}" height="${height}" fill="none" stroke="#1a3a52" stroke-width="2"/>`;
  
  // Dimensions
  svg += `<text x="${padding + width / 2}" y="${padding - 10}" font-size="12" text-anchor="middle" fill="#666">${plotLength}m</text>`;
  svg += `<text x="${padding - 20}" y="${padding + height / 2}" font-size="12" text-anchor="middle" fill="#666" transform="rotate(-90 ${padding - 20} ${padding + height / 2})">${plotBreadth}m</text>`;
  
  // Render rooms
  for (const room of rooms) {
    const x = padding + room.x * SCALE;
    const y = padding + room.y * SCALE;
    const w = room.width * SCALE;
    const h = room.height * SCALE;
    
    const bgColor = ROOM_COLORS[room.type] || '#f0f0f0';
    const borderColor = ROOM_BORDERS[room.type] || '#999';
    
    // Room rectangle
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${bgColor}" stroke="${borderColor}" stroke-width="2" rx="4"/>`;
    
    // Room label
    const label = `${room.name}\n${room.width.toFixed(1)}m × ${room.height.toFixed(1)}m`;
    svg += `<text x="${x + w / 2}" y="${y + h / 2 - 8}" font-size="10" text-anchor="middle" font-weight="bold" fill="#333">${room.name}</text>`;
    svg += `<text x="${x + w / 2}" y="${y + h / 2 + 8}" font-size="8" text-anchor="middle" fill="#666">${room.width.toFixed(1)}m × ${room.height.toFixed(1)}m</text>`;
    svg += `<text x="${x + w / 2}" y="${y + h / 2 + 18}" font-size="7" text-anchor="middle" fill="#999">${(room.width * room.height).toFixed(1)}m²</text>`;
  }
  
  // Legend
  const legendY = padding + height + 20;
  svg += `<text x="${padding}" y="${legendY}" font-size="12" font-weight="bold" fill="#1a3a52">Legend:</text>`;
  
  let legendX = padding;
  Object.entries(ROOM_COLORS).forEach(([type, color], index) => {
    const xPos = padding + (index % 4) * 120;
    const yPos = legendY + 20 + Math.floor(index / 4) * 20;
    
    svg += `<rect x="${xPos}" y="${yPos - 10}" width="12" height="12" fill="${color}" stroke="${ROOM_BORDERS[type]}" stroke-width="1"/>`;
    svg += `<text x="${xPos + 18}" y="${yPos - 2}" font-size="10" fill="#333">${type.charAt(0).toUpperCase() + type.slice(1)}</text>`;
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
