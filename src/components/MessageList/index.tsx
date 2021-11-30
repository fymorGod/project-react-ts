import styles from './styles.module.scss';
import io from 'socket.io-client';
import { api } from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { useEffect, useState } from 'react';

type Message = {
    id: string;
    text: string;
    user: {
        nome: string,
        avatar_url: string
    }
}

const messagesQueue:Message[] = [];

const sokect = io('http://localhost:4000');

sokect.on('new_message',( newMessage : Message)=> {
    messagesQueue.push( newMessage)
})

export function MessageList(){
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect( () => {
        const timer = setInterval( () => {
            if(messagesQueue.length > 0 ){
                setMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1]
                ].filter(Boolean))

                messagesQueue.shift()
            }
        }, 3000)
    }, [])

    useEffect(() => {
        api.get<Message[]>('messages/last3').then(response => {
            console.log(response.data);
            setMessages(response.data);
        })
    }, [])

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile" />
            <ul className={styles.messageList}>
                {messages.map( (message) => {
                    return (
                        <li key={message.id} className={styles.message}>
                        <p className={styles.messageContent}>{message.text}</p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.nome} />
                            </div>
                            <span>{message.user.nome}</span>
                        </div>
                    </li>
                    );
                })}
              
            </ul>
        </div>
    )
}