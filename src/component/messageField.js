import { useState, useCallback, useEffect, useRef } from "react";
import { ARR, BOT_NAME, BOT_TEXT } from '../const';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import MessageItem from './messageItem';
import usePrev from '../hook';

export default function MessageField() {
    const [messageArr, setMessageArr] = useState(ARR);
    const [inValue, setInValue] = useState('');
    const messFieldEl = useRef();
    const messInputEl = useRef();
    const prevMessageArr = usePrev(messageArr);

    const addMessage = useCallback((event) => {
        event.preventDefault();
        if (inValue) {
            setMessageArr([...messageArr, { text: inValue, author: 'Аноним' }]);
            messInputEl.current.className = 'norm';
            setInValue('');
        } else {
            messInputEl.current.className = 'error';
        }
        messInputEl.current.focus();
    }, [inValue]);

    useEffect(() => {
        messInputEl?.current.focus();
    }, []);

    useEffect(() => {
        //bot answer
        let timerID = null;
        const lastAuthor = messageArr[messageArr.length - 1].author;
        if (prevMessageArr?.length < messageArr.length && lastAuthor && lastAuthor !== BOT_NAME) {
            timerID = setTimeout(() => {
                setMessageArr([...messageArr, { text: lastAuthor + BOT_TEXT, author: BOT_NAME }]);
            }, 1000)
        }

        //scroll
        if (messFieldEl) {
            messFieldEl.current.scrollTop = messFieldEl.current.scrollHeight;
        }

        //willUnmount
        return () => {
            clearTimeout(timerID);
        }
    }, [messageArr, prevMessageArr, addMessage]);


    const renderMessage = useCallback((message) => {
        return (<MessageItem text={message.text} author={message.author} />);
    }, []);

    const handleChange = useCallback((event) => {
        setInValue(event.target.value);
    }, []);

    return (
        <div className="app__field">
            <div ref={messFieldEl} className="message__field">
                {messageArr.map(renderMessage)}
            </div>
            <form className="sendMess__form" onSubmit={addMessage}>
                <input ref={messInputEl} type="text" name="message__input" placeholder="print message"
                    value={inValue} onChange={handleChange}>
                </input>
                <button type="submit"><SendRoundedIcon /></button>
            </form>
        </div >
    );
}