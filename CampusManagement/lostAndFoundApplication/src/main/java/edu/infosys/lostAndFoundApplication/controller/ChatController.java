package edu.infosys.lostAndFoundApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;
import edu.infosys.lostAndFoundApplication.bean.ChatMessage;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3939") // ✅ allow Vite frontend
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final Set<String> onlineUsers = Collections.synchronizedSet(new HashSet<>());
    private final Map<String, String> sessionIdToUser = Collections.synchronizedMap(new HashMap<>());

    @MessageMapping("/register")
    public void register(ChatMessage message, StompHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        String username = message.getSender();
        if (username != null && !username.trim().isEmpty()) {
            onlineUsers.add(username);
            sessionIdToUser.put(sessionId, username);
            broadcastUserList();
        }
    }

    @MessageMapping("/sendMessage")
    public void sendMessage(ChatMessage message) {
        messagingTemplate.convertAndSend("/topic/messages", message);
    }

    public void removeUser(String sessionId) {
        String username = sessionIdToUser.remove(sessionId);
        if (username != null) {
            onlineUsers.remove(username);
            broadcastUserList();
        }
    }

    private void broadcastUserList() {
        messagingTemplate.convertAndSend("/topic/users", onlineUsers);
    }
}
