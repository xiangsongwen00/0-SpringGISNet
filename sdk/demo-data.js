// Generated from the TS playground by npm run sdk:sync-js. No TS runtime required.
import * as THREE from 'three';
// Illustrative data, NOT real land cover or a benchmark. No external service/token.
const latitude = (y, n) => Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
export function createDemoRaster() {
    return {
        id: 'generated-raster', minLevel: 0, maxLevel: 14, attribution: 'SDK procedural demo — not geographic data',
        url: id => `demo://${id.level}/${id.x}/${id.y}`,
        async loadTexture(id, signal) {
            signal?.throwIfAborted();
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 256;
            const context = canvas.getContext('2d');
            const n = 2 ** id.level;
            context.fillStyle = `hsl(${185 + ((id.x + id.y) % 4) * 5} 43% 24%)`;
            context.fillRect(0, 0, 256, 256);
            context.strokeStyle = '#72d8c1';
            context.lineWidth = 2;
            context.strokeRect(1, 1, 254, 254);
            context.strokeStyle = '#358d9f';
            context.lineWidth = 1;
            for (let i = 1; i < 4; i++) {
                context.beginPath();
                context.moveTo(i * 64, 0);
                context.lineTo(i * 64, 256);
                context.moveTo(0, i * 64);
                context.lineTo(256, i * 64);
                context.stroke();
            }
            context.fillStyle = '#d2fbff';
            context.font = 'bold 19px monospace';
            context.fillText(`XYZ z${id.level}`, 14, 32);
            context.font = '16px monospace';
            context.fillText(`x${id.x} / y${id.y}`, 14, 57);
            context.fillText(`${((id.x + .5) / n * 360 - 180).toFixed(2)} E`, 14, 85);
            context.fillText(`${latitude(id.y + .5, n).toFixed(2)} N`, 14, 108);
            context.fillStyle = '#73eac1';
            context.beginPath();
            context.moveTo(216, 14);
            context.lineTo(205, 38);
            context.lineTo(227, 38);
            context.closePath();
            context.fill();
            context.fillText('N', 211, 58);
            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.SRGBColorSpace;
            return texture;
        }
    };
}
export function createDemoTerrain() {
    return {
        id: 'generated-dem', minLevel: 0, maxLevel: 14, attribution: 'Synthetic continuous hills — not real DEM',
        async loadTile(id, signal) {
            signal?.throwIfAborted();
            const width = 33, n = 2 ** id.level, heights = new Float32Array(width * width);
            let minimumHeight = Infinity, maximumHeight = -Infinity;
            for (let y = 0; y < width; y++)
                for (let x = 0; x < width; x++) {
                    const lon = ((id.x + x / (width - 1)) / n * 360 - 180) * Math.PI / 180;
                    const lat = latitude(id.y + y / (width - 1), n) * Math.PI / 180;
                    const height = 500 + 350 * Math.sin(lon * 60) * Math.cos(lat * 50);
                    heights[y * width + x] = height;
                    minimumHeight = Math.min(minimumHeight, height);
                    maximumHeight = Math.max(maximumHeight, height);
                }
            const texture = new THREE.DataTexture(heights, width, width, THREE.RedFormat, THREE.FloatType);
            texture.needsUpdate = true;
            return { id, width, height: width, heights, minimumHeight, maximumHeight, texture };
        }
    };
}
const varint = (n) => {
    const bytes = [];
    while (n > 127) {
        bytes.push((n & 127) | 128);
        n >>>= 7;
    }
    bytes.push(n);
    return bytes;
};
const field = (tag, bytes) => [tag, ...varint(bytes.length), ...bytes];
const string = (text) => [...new TextEncoder().encode(text)];
const zigzag = (n) => (n << 1) ^ (n >> 31);
function geometry(points, closed) {
    const commands = [9, ...varint(zigzag(points[0][0])), ...varint(zigzag(points[0][1]))];
    if (points.length > 1) {
        commands.push(((points.length - 1) << 3) | 2);
        for (let i = 1; i < points.length; i++)
            commands.push(...varint(zigzag(points[i][0] - points[i - 1][0])), ...varint(zigzag(points[i][1] - points[i - 1][1])));
    }
    if (closed)
        commands.push(15);
    return commands;
}
function layer(name, type, points, label) {
    const feature = [24, type, ...(label ? field(18, [0, 0]) : []), ...field(34, geometry(points, type === 3))];
    return field(26, [...field(10, string(name)), ...field(18, feature),
        ...(label ? [...field(26, string('name')), ...field(34, field(10, string(label)))] : []), 40, ...varint(4096), 120, 2]);
}
export function demoMvt(id) {
    return new Uint8Array([
        ...layer('park', 3, [[700, 700], [3000, 700], [3000, 3000], [700, 3000]]),
        ...layer('road', 2, [[0, 2100], [1500, 1800], [2700, 2300], [4096, 2100]]),
        ...layer('place', 1, [[2048, 1500]], `DEMO ${id.level}/${id.x}/${id.y}`)
    ]).buffer;
}
export const demoVectorFetch = async (input, init) => {
    init?.signal?.throwIfAborted();
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const match = url.match(/\/(\d+)\/(\d+)\/(\d+)\.pbf/);
    if (!match)
        throw new Error('Expected generated demo MVT URL');
    return new Response(demoMvt({ level: Number(match[1]), x: Number(match[2]), y: Number(match[3]) }), { headers: { 'Content-Type': 'application/vnd.mapbox-vector-tile' } });
};
export function demoStyle(dark) {
    return { version: 8, sources: { generated: { type: 'vector', tiles: ['/demo-mvt/{z}/{x}/{y}.pbf'], maxzoom: 14 } }, layers: [
            { id: 'background', type: 'background', paint: { 'background-color': dark ? '#163448' : '#edf0e3' } },
            { id: 'park', type: 'fill', source: 'generated', 'source-layer': 'park', paint: { 'fill-color': dark ? '#247469' : '#a2ddae' } },
            { id: 'road', type: 'line', source: 'generated', 'source-layer': 'road', paint: { 'line-color': dark ? '#ffe291' : '#cf8145', 'line-width': 3 } },
            { id: 'place', type: 'circle', source: 'generated', 'source-layer': 'place', paint: { 'circle-color': '#e67665', 'circle-radius': 4 } },
            { id: 'label', type: 'symbol', source: 'generated', 'source-layer': 'place', layout: { 'text-field': '{name}', 'text-size': 12 }, paint: { 'text-color': dark ? '#ffffff' : '#163448', 'text-halo-color': dark ? '#163448' : '#ffffff', 'text-halo-width': 1 } }
        ] };
}
