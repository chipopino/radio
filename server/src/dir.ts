import path from 'path';

export function root(...args: string[]): string {
    return path.resolve(__dirname, '../', ...args);
}
export function dist(...args: string[]): string {
    return root('dist', ...args);
}
export function src(...args: string[]): string {
    return root('src', ...args);
}
