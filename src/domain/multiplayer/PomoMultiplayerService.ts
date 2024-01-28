import { PomoMuiltiplayerMessage } from '@/domain/multiplayer/PomoMultiplayerMessage';

export interface PomoMultiplayerService {
    /**
     * Creates a new session and joins it as the session admin.
     */
    createSession(roomId: string): Promise<void>;

    /**
     * Joins an existing session.
     * @param roomId The ID of the room to join.
     */
    joinSession(roomId: string): Promise<void>;

    /**
     * Leaves the current session.
     */
    leaveSession(): void;

    /**
     * Sends a message to all clients in session.
     */
    emit(message: PomoMuiltiplayerMessage): void;

    /**
     * Listens to messages from other clients.
     */
    onMessage(callback: (message: PomoMuiltiplayerMessage) => void): void;
}
