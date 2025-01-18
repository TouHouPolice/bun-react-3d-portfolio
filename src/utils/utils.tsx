export function PreprocessGLSLForThree(str: string): string {
    return str.replace(/^#version.*$/gm, '');
}