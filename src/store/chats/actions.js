import { addMessagesArr, delMessagesArr } from "../messages/actions";

export const ADD_CHAT = 'CHATS::ADD_CHAT';
export const DEL_CHAT = 'CHATS::DEL_CHAT';
export const SET_HIGHLIGHT = 'CHATS::SET_HIGHLIGHT';

const addChatDirect = (newChat) => ({
    type: ADD_CHAT,
    payload: newChat
});

export const addChat = (newChat) => (dispatch, getState) => {
    const chatArr = getState().chats.chatArr;
    let nextChatId = 1;
    if (chatArr.length) {
        nextChatId = +chatArr[chatArr.length - 1]?.id.replace(/\D+/g, "") + 1;  // last chat id to number and +1
    }
    dispatch(addChatDirect({ ...newChat, id: `id${nextChatId}`, highlighted: false }));
    dispatch(addMessagesArr({ [`id${nextChatId}`]: [] }));
};

const delChatDirect = (chatId) => ({
    type: DEL_CHAT,
    payload: chatId
});

export const delChat = (chatId) => (dispatch, getState) => {
    dispatch(delMessagesArr(chatId));
    dispatch(delChatDirect(chatId));
};

export const setHighlight = (chatId, highlight) => ({
    type: SET_HIGHLIGHT,
    payload: { chatId: chatId, highlighted: highlight }
});