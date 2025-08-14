package dev.ai.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatClient chatClient;

    public String getCompletion(String userMessage) {
        if (userMessage == null) {
            userMessage = "";
        }
        return chatClient.prompt()
                .user(userMessage)
                .call()
                .content();
    }
}


