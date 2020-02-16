import redisClient, {client} from '../redis-client';
import tables from '../config/tables';
import MessageDto from "../models/message.dto";

export async function addMessage(roomId: string, messaege: MessageDto): Promise<MessageDto> {
    return await client.rpush(`${tables.message}_${roomId}`, JSON.stringify(messaege));
}

export async function getMessages(roomId: string,): Promise<MessageDto[]> {
    const messages = await redisClient.lrangeAsync(`${tables.message}_${roomId}`,-10 , -1);

    return messages.map((message: string) => JSON.parse(message));
}
