import { dev } from '../env';

type ConsoleType = 'log' | 'error' | 'warn' | 'assert' | 'trace';

function log(type: ConsoleType, ...content: any[]): void {
    if (!dev && (type === 'log' || type === 'assert')) return;
    console[type](`\n%c<${type}> :: ${new Date().toLocaleTimeString()} :: %c`, 'color: green', '', ...content, `
    `);

}

export const logger = {
    log: (...args: any[]) => log('log', ...args),
    error: (...args: any[]) => log('error', ...args),
    warn: (...args: any[]) => log('warn', ...args),
    assert: (...args: any[]) => log('assert', ...args),
    trace: (...args: any[]) => log('trace', ...args),
};