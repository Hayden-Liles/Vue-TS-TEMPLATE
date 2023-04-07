import { io, Socket } from 'socket.io-client';
import { baseURL, useSockets } from '../env';
import { logger } from './Logger';

type Payload = any;

const SOCKET_EVENTS = {
    connection: 'connection',
    connected: 'connected',
    disconnect: 'disconnect',
    authenticate: 'authenticate',
    authenticated: 'authenticated',
    userConnected: 'userConnected',
    userDisconnected: 'userDisconnected',
    error: 'error',
};

export class SocketHandler {
    private socket: Socket | null = null;
    private requiresAuth: boolean = false;
    private queue: { action: string; payload: Payload }[] = [];
    private authenticated: boolean = false;
    private connected: boolean = false;

    constructor(requiresAuth = false, url = baseURL) {
        if (!useSockets) return;
        this.socket = io(url || baseURL);
        this.requiresAuth = requiresAuth;

        this.on(SOCKET_EVENTS.connected, this.onConnected)
            .on(SOCKET_EVENTS.authenticated, this.onAuthenticated)
            .on(SOCKET_EVENTS.error, this.onError);
    }

    on(event: string, fn: (...args: any[]) => void): this {
        this.socket?.on(event, fn.bind(this));
        return this;
    }

    onConnected(connection: any): void {
        logger.log('[SOCKET_CONNECTION]', connection);
        this.connected = true;
        this.playback();
    }

    onAuthenticated(auth: any): void {
        logger.log('[SOCKET_AUTHENTICATED]', auth);
        this.authenticated = true;
        this.playback();
    }

    authenticate(bearerToken: string): void {
        this.socket?.emit(SOCKET_EVENTS.authenticate, bearerToken);
    }

    onError(error: any): void {
        logger.error('[SOCKET_ERROR]', error);
    }

    enqueue(action: string, payload: Payload): void {
        logger.log('[ENQUEING_ACTION]', { action, payload });
        this.queue.push({ action, payload });
    }

    playback(): void {
        logger.log('[SOCKET_PLAYBACK]');
        const playback = [...this.queue];
        this.queue = [];
        playback.forEach(e => {
            this.emit(e.action, e.payload);
        });
    }

    emit(action: string, payload: Payload = undefined): void {
        if (this.requiresAuth && !this.authenticated) {
            return this.enqueue(action, payload);
        }
        if (!this.connected) {
            return this.enqueue(action, payload);
        }
        this.socket?.emit(action, payload);
    }
}
