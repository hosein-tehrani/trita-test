<template>
  <div class="messages">
    <!-- dialog for adding new chat  -->
    <v-dialog max-width="400" v-model="addChatDialog">
      <v-card>
        <v-container>
          <v-card-text>
            <v-text-field
              v-model="newUser"
              outlined
              dense
              @keyup.enter="newUser && startChat()"
              label="Enter contanct username"
            ></v-text-field>
            <v-btn :disabled="!newUser" @click="startChat">start chat</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- dialog for checking if user want to delete chat  -->
    <v-dialog max-width="400" v-model="deleteDialog">
      <v-card>
        <v-container>
          <v-card-text>
            {{`you are deleting ${selectedContant.name}'s chat, are you sure?`}}
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" @click="doDeleteContact">yes</v-btn>
            <v-btn color="blue" @click="deleteDialog = false">no</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
    <v-card elevation="1" class="main list-header">
      <v-container>
        <v-row>
          <v-col class="pt-4">
            <span class="inbox-text fs-large">Inbox</span>
          </v-col>
          <v-col class="text-right">
            <v-btn class="bordered-btn" @click="openAddChat()">
              New <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card elevation="1" class="main mt-6">
      <v-container>
        <div class="messages-search">
          <v-text-field
            class="search-input mt-2"
            placeholder="Search..."
            outlined
            rounded
            dense
            prepend-inner-icon="mdi-magnify"
            v-model="filter"
          >
          </v-text-field>
        </div>
        <!-- if there is any chat -->
        <div v-if="chatList.length" class="messages-list">
          <!-- if search has any result  -->
            <div v-if="computedMessage.length">
                <div v-for="(item, index) in computedMessage" :key="index">
                    <div
                    class="message-box"
                    @click="select(item)"
                    :class="item.id == selectedUser.id ? 'selected' : ''"
                    >
                    <div class="box">
                        <v-row>
                        <v-col cols="8" class="d-flex flex-row pr-0">
                            <div class="image-box">
                            <v-badge
                              bottom
                              :color="item.lastSeen == 'online' ? 'green accent-4':''"
                              dot
                              offset-x="8"
                              offset-y="8"
                            >
                              <v-avatar size="55">
                              <v-img
                                  :src="
                                  item.avatar
                                      ? item.avatar
                                      : 'data:image/png;base64,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'
                                  "
                              ></v-img>
                              </v-avatar>
                            </v-badge>
                            </div>
                            <div class="ml-4 mt-4">
                            <p class="senderName mb-1">{{ item.name }}</p>
                            </div>
                        </v-col>
                        <v-col class="fs-small">
                            <div class="text-right pt-2">
                            <v-menu bottom left>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn dark icon v-bind="attrs" v-on="on">
                                    <v-icon color="fontColor">mdi-dots-vertical</v-icon>
                                </v-btn>
                                </template>

                                <v-list>
                                <v-list-item>
                                    <v-list-item-title @click="openDeleteDialog(item)"
                                    >delete
                                    <v-icon>mdi-delete</v-icon></v-list-item-title
                                    >
                                </v-list-item>
                                </v-list>
                            </v-menu>
                            </div>
                        </v-col>
                        </v-row>
                    </div>
                    </div>
                </div>                
            </div>
            <!-- if search don't have any result  -->
            <div v-else>{{`there are no contant that includes "${filter}"`}}</div>
        </div>
        <!-- if there is no chat to show  -->
        <div v-else  class="messages-list text-center pt-4">there are no chats, <span @click="openAddChat" class="primary--text">start a chat</span></div>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      newUser: '',
      addChatDialog: false,
      deleteDialog: false,
      selectedContant: {},
      filter: '',
    }
  },
  methods: {
    ...mapMutations(['addChat', 'selectUser', 'removeChat']),
    openAddChat() {
      this.newUser = '';
      this.addChatDialog = true;
    },
    openDeleteDialog(contact){
        this.selectedContant = contact;
        this.deleteDialog = true;
    },
    doDeleteContact(){
      this.removeChat(this.selectedContant.id);
      this.deleteDialog = false;
    },
    startChat() {
      this.addChat(this.newUser)
      this.addChatDialog = false
    },
    select(user) {
      this.selectUser(user)
    }
  },
  computed: {
    ...mapGetters(['chatList', 'selectedUser']),
    computedMessage() {
      let filtered = JSON.parse(JSON.stringify(this.chatList));
      if (this.filter) {
        filtered.forEach(user => {
          user.name = user.name.toLowerCase();
        });
        filtered = filtered.filter((x) => x.name.includes(this.filter.toLowerCase())) //check if there are any name that contains inputed value for search
      }
      return filtered
    },
  },
}
</script>
