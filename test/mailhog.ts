import fetch from 'node-fetch'

interface Message {
    Content: {
        Body: string
        Headers: {
            Subject: string[],
            To: string[]
        }
    }
}

export const messagesSent = async (): Promise<Message[]> => new Promise(resolve => {
    return setTimeout(async () => resolve((await fetch('http://127.0.0.1:8025/api/v1/messages')).json()), 500)
})

export const deleteAllMessages = async () => {
    await fetch('http://localhost:8025/api/v1/messages', {
        method: 'DELETE'
    })
}
