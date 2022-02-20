<template>
    <div>
        <!-- check to show chat page or chatList page by checking if any chat selected -->
        <chat v-if="selectedUser.id"></chat>
        <chat-list v-else></chat-list>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ChatList from '../ChatList.vue';
export default {
  components: { ChatList },
    computed:{
        ...mapGetters(["selectedUser"]),
    }
}
</script>