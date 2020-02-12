import redisClient, {client} from '../redis-client';
import config from '../config';
import MessageDto from "../models/message.dto";

export async function addMessage(roomId: string, messaege: MessageDto): Promise<MessageDto> {
    await client.rpush(`${config.message}_${roomId}`, JSON.stringify(messaege));

    return messaege;
}

export async function getMessages(roomId: string,): Promise<MessageDto> {
    return new Promise((resolve, reject) => {
        return client.lrange(`${config.message}_${roomId}`,-4 , -1, (err: any, result: any) => {
            resolve(result.map((message: string) => JSON.parse(message)));
        });
    });
}
