export function darkenHexColor(hex: string, percent: number): string {
    // Ensure the hex string is valid
    if (!/^#[0-9a-f]{6}$/i.test(hex)) {
        throw new Error('Invalid hex color format. Please use a format like #RRGGBB.');
    }

    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Calculate the new RGB values
    const newR = Math.max(0, Math.min(255, Math.floor(r * (1 - percent / 100))));
    const newG = Math.max(0, Math.min(255, Math.floor(g * (1 - percent / 100))));
    const newB = Math.max(0, Math.min(255, Math.floor(b * (1 - percent / 100))));

    // Convert back to hex
    const darkenedHex = `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1).toUpperCase()}`;

    return darkenedHex;
}


export function lightenHexColor(hex: string, percent: number): string {
    // Ensure the hex string is valid
    if (!/^#[0-9a-f]{6}$/i.test(hex)) {
        throw new Error('Invalid hex color format. Please use a format like #RRGGBB.');
    }

    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Calculate the new RGB values
    const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    // Convert back to hex
    const lightenedHex = `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1).toUpperCase()}`;

    return lightenedHex;
}
