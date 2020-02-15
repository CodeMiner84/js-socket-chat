import redisClient, {client} from '../redis-client';
import config from '../config';
import MessageDto from "../models/message.dto";

export async function addMessage(roomId: string, messaege: MessageDto): Promise<MessageDto> {
    await client.rpush(`${config.message}_${roomId}`, JSON.stringify(messaege));

    return messaege;
}

export async function getMessages(roomId: string,): Promise<MessageDto[]> {
    const messages = await redisClient.lrangeAsync(`${config.message}_${roomId}`,-10 , -1);

    return messages.map((message: string) => JSON.parse(message));
}
