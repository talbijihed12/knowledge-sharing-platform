import { SignalType } from "./enums/signal-type";


export class SignalPayload {
    signalType: SignalType;
    postId: number;
    idComment: number;
}