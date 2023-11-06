package com.ssafy.chatroom.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomEntityPK implements Serializable {
    Integer sharePostId;
    Long senderMemberId;
    Long receiverMemberId;
}
