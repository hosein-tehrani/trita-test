const state = () => {
    return {
    selectedUser:{},
    chatList:[
        {name:'ali',avatar:"https://cdn4.vectorstock.com/i/1000x1000/44/73/boy-avatar-in-round-web-button-isolated-on-white-vector-20694473.jpg",id:'1'},
        {name:'hesam',avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&usqp=CAU",id:'2'},
        {name:'sina',avatar:"https://cdn-icons-png.flaticon.com/512/147/147140.png",id:'3'},
    ],
    chats:[
        {id:'1', messages:[
            {self: true,message:'سلام',time:'15:34'},
            {self: false,message:'سلام',time:'15:35'},
            {self: true,message:'چطوری؟',time:'15:35'},
            {self: false,message:'خوبم خداروشکر',time:'15:36'},
            {self: true,message:'خداروشکر',time:'15:40'},
        ]},
        {id:'2', messages:[]},
        {id:'3', messages:[
            {self: false,message:'سلام',time:'02:34'},
            {self: false,message:'بیداری؟',time:'02:34'},
            {self: true,message:'شرمنده خواب بودم',time:'07:34'},
            {self: true,message:'چیزی شده؟',time:'07:35'},
            {self: false,message:'نه، حل شد',time:'08:33'},
            {self: true,message:'خب خداروشکر',time:'08:39'},
        ]},
    ]
}
};
const getters = {
    selectedUser: state => {
      return state.selectedUser;
    },
    chatList: state => {
      return state.chatList;
    },
    // pass selected chat by filtering selected user's id in all chats
    selectedChat: state =>{
        return state.chats.filter(x=>x.id == state.selectedUser.id)[0];
    }
};
  const mutations = {
    addChat: (state, name) => {
        // create a random number as chat and user id 
        let random = Math.random() *10;
        //add user too chat list
      state.chatList.unshift({
          name: name,
          avatar:'',
          id: random
      });
        //add user's chat too our chats
      state.chats.unshift({
        id: random,
        messages:[]
      })
      //set selectedUser to show the new chat page
      state.selectedUser = {
        name: name,
        avatar:'',
        id: random
        };
    },
    removeChat: (state, id) => {
        // find index of user in chat list to remove it by splice method 
        let i = state.chatList.findIndex(x=> x.id == id);
        if(i != -1){
            state.chatList.splice(i,1);
            state.chats.splice(i,1);            
        }
        state.selectedUser.id == id ? state.selectedUser = {} :'';
    },
    selectUser: (state, user)=>{
        state.selectedUser = user;
    },
    sendMessage: (state,msg)=>{
        let today = new Date();
        let hour = today.getHours();
        let minute = today.getMinutes();
        let chat = state.chats.filter(x=>x.id == state.selectedUser.id)[0];
        chat.messages.push({
            self: true,
            message: msg,
            time: (hour < 10 ? '0'+hour : hour) + ":" + (minute < 10 ? '0'+minute : minute)
            
        });
    }

};
export default {
    state,
    getters,
    mutations
};