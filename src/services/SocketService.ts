import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
    constructor() {
        super()
        this
            .on('error', this.onError)
    }
    onError(e: any) {
        Pop.toast(e.message, 'error')
    }
}

export const socketService = new SocketService()