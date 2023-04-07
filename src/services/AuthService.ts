import { initialize } from '@bcwdev/auth0provider-client';
import { AppState } from '../AppState';
import { audience, clientId, domain } from '../env';
import { router } from '../router';
import { accountService } from './AccountService';
import { api } from './AxiosService';
import { socketService } from './SocketService';
import { AxiosRequestConfig } from 'axios';

export const AuthService = initialize({
    domain,
    clientId,
    audience,
    useRefreshTokens: true,
    onRedirectCallback: (appState: { targetUrl?: string }) => {
        router.push(appState?.targetUrl ?? window.location.pathname);
    },
});

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async () => {
    api.defaults.headers.authorization = AuthService.bearer;
    api.interceptors.request.use(refreshAuthToken as any);
    AppState.user = AuthService.user;
    await accountService.getAccount();
    socketService.authenticate(AuthService.bearer);
});

async function refreshAuthToken(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    if (!AuthService.isAuthenticated) { return config; }
    const expires = AuthService.identity.exp * 1000;
    const expired = expires < Date.now();
    const needsRefresh = expires < Date.now() + (1000 * 60 * 60 * 12);
    if (expired) {
        await AuthService.loginWithPopup();
    } else if (needsRefresh) {
        await AuthService.getTokenSilently();
        api.defaults.headers.authorization = AuthService.bearer;
        socketService.authenticate(AuthService.bearer);
    }
    return config;
}
