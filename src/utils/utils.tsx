export function GlslRemoveVersionLine(str: string): string {
    return str.replace(/^#version.*$/gm, '');
}