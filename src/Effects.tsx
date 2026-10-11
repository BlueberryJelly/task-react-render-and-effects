import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [lastMessage, setLastMessage] = useState<string | number>('-1');
    const [sourceName, setSourceName] = useState<string>('');

    useEffect(() => {
        setLastMessage('-1');
        
        setSourceName(props.sourceId);

        const callback = (message: any) => {
            setLastMessage(message);
        };

        subscribe(props.sourceId, callback);

        return () => {
            unsubscribe(props.sourceId, callback);
        };
    }, [props.sourceId]);

    return <div>{sourceName}: {lastMessage}</div>;
}