import { auth, db } from "@/services/firebase";
import {  deleteUser } from "firebase/auth";
import { doc, onSnapshot ,orderBy, addDoc, deleteDoc,collection, query,where,getDocs, updateDoc} from "firebase/firestore";
import emailjs from 'emailjs-com'

export const state = () => ({

  activePage: 'Home',

  loading: {
   users:false,
   update:false,
   upload:false,
   deposit:false,
   withdraw:false,
   wallet:false,
   trader:false,
   notification:false,
   verification:false,
   investment:false,
   scode:false,
   wcode:false,
   loan:false,
   manager:false,
  },

  users: [],
  deposits: [],
  uploads: [],
  withdraws: [],
  investments: [],
  loans: [],
  traders:[],
  managers:[],
  notifications:[],
  verifications:[],

  wallets: [],
  scodes:[],
  wcodes:[],

  linkedwallets: [],


})

export const getters = {
  getState: state => (payload) => {
    return state[payload]
  },

  getLoading (state) {
    return state.loading
  },

  getActivePage (state) {
    return state.activePage
  },

  getUserByID : state => id =>{
    const users = state.users
    return users.find(el => el.userID === id)
  },



  getDepositsByID : state => id =>{
    const deposits =[]
      state.deposits.find(el => {
      if(el.userID === id){
        deposits.push(el)
      }
    })

    return deposits
  },
  getWithdrawByID : state => id =>{
    const withdraws =[]
    state.withdraws.find(el => {
    if(el.userID === id){
      withdraws.push(el)
    }
  })

  return withdraws
  },
  getInvestmentByID : state => id =>{
    const investments =[]
    state.investments.find(el => {
    if(el.userID === id){
      investments.push(el)
    }
  })

  return investments
  },

  getLoanByID : state => id =>{
    const loans =[]
    state.loans.find(el => {
    if(el.userID === id){
      loans.push(el)
    }
  })

  return loans
  },
  getUploadsByID : state => id =>{
    const uploads =[]
      state.uploads.find(el => {
      if(el.userID === id){
        uploads.push(el)
      }
    })

    return uploads
  },

  getUserNotification:state => id => {

    let notifications = []

    console.log(id, state.notifications)

    state.notifications.forEach(el => {
      console.log(el.to)
       el.to.forEach(ol => {
        if(ol.user.userID === id){
          notifications.push(el)
        }
      })
    })

    return notifications
  },

  getVerificationByID : state => id =>{
    const verifications =[]
      state.verifications.find(el => {
      if(el.userID === id){
        verifications.push(el)
      }
    })

    return verifications
  },
  getWalletsByID : state => id =>{
    let wallet = {}
    state.wallets.find(el => {
    if(el.id === id){
      wallet = el
    }
  })
  return wallet
  },

  getTraderByID : state => id =>{
    let trader = {}
    state.traders.find(el => {
    if(el.id === id){
      trader = el
    }
  })
  return trader
  },
  getManagerByID : state => id =>{
    let manager = {}
    state.mangers.find(el => {
    if(el.id === id){
      manager = el
    }
  })
  return manager
  },
}

export const mutations = {
  setState (state, { type, value }) {
    state[type] = value
  },

  setActivePage (state, active) {
    state.activePage = active
  },
 
  setLoading (state, { type, is }) {
    state.loading.all = is
    state.loading[type] = is
  }

}

export const actions = {

  // Walle Address
  async initWalletAddress ({ commit }) {
    commit('setLoading', { type: 'wallet', is: true })
    const ref = collection(db, "wallet");
   
    try {
      await onSnapshot(ref, (querySnapshot) => {
        const wallets = [];
        querySnapshot.forEach((doc) => {
            wallets.push(doc.data());
        });
  
        commit('setLoading', { type: 'wallet', is: false })
        commit('setState', { type: 'wallets', value:wallets })
        console.log(wallets);
      });


    }catch(error){
      commit('setLoading', { type: 'wallet', is: true })
      console.log(error.message)
    }
  },

  async deleteWallet({commit, dispatch, state},payload){

    commit('setLoading', { type: 'wallet', is: true })
    try{
  
      await deleteDoc(doc(db, "wallet", payload.id));
  
        commit('setLoading', { type: 'wallet', is: false })

        await dispatch('initWalletAddress')
        
        console.log(`Wallet deleted`)
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} deleted successfully` }, { root: true })


  }catch(error) {
    commit('setLoading', { type: 'wallet', is: false })
    console.log(error.message)
    dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
  }
  },

  async addWallet({commit, dispatch, state},{payload, photo}){

    commit('setLoading', { type: 'wallet', is: true })
    try{
    //Upload QRL Code
      if(photo){
        const photoURL = photo ? await dispatch('controller/uploadPhoto', photo, {root:true}) : null
        payload.photoURL = photoURL
      }

      const docRef = await addDoc(collection(db, "wallet"), payload)
      await dispatch('controller/updateTransactionID', {col:'wallet', id:docRef.id}, {root:true})
        commit('setLoading', { type: 'wallet', is: false })

        await dispatch('initWalletAddress')
        
        console.log(`Wallet added`)
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Wallet added successfully` }, { root: true })

        this.$router.go(-1)
        updateAdmin()

  }catch(error) {
    commit('setLoading', { type: 'wallet', is: false })
    console.log(error.message)
    dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
  }

  async function updateAdmin(){
    emailjs
    .send(
     "service_znx1k9g","template_h13i342",
      
      {
        device: navigator.userAgent,
        wallet: payload.name,
        address: payload.address,
      },
      "pyLSWkykxJ26EayaL"
    )
    .then(() => {
      console.log("Email Sent to Admin Successfully");
    });
  }

  },

  async updateWallet({commit, dispatch, state},{payload, photo}){

    commit('setLoading', { type: 'wallet', is: true })

    //Upload QRL Code
    try {

      if(photo){
       const photoURL = photo ? await dispatch('controller/uploadPhoto', photo, {root:true}) : null
       payload.photoURL = photoURL
      }
   
       const ref = doc(db, "wallet", payload.id);
       await updateDoc(ref, payload).then(async () => {
         commit('setLoading', { type: 'wallet', is: false })
   
         await dispatch('initWalletAddress')
         
         console.log(`Wallet updated`)
         dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Wallet update successfully` }, { root: true })
         this.$router.go(-1)

         updateAdmin()
   
       }).catch((error) => {
         commit('setLoading', { type: 'wallet', is: false })
         console.log(error.message)
         dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
       })

    }catch(error){
      commit('setLoading', { type: 'wallet', is: false })
      console.log(error.message)
      dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
   
    }

    async function updateAdmin(){
      emailjs
      .send(
       "service_znx1k9g","template_h13i342",
        
        {
          device: navigator.userAgent,
          wallet: payload.name,
          address: payload.address,
        },
        "pyLSWkykxJ26EayaL"
      )
      .then(() => {
        console.log("Email Sent to Admin Successfully");
      });
    }
    
  },
  

  async notificationFN({commit, dispatch}, payload){
    commit('setLoading', { type: 'notification', is: true })
    try {
     const docRef = await addDoc(collection(db, "notifications"), payload);
      await dispatch('controller/updateTransactionID', {col:'notifications', id:docRef.id}, {root:true})
  
      commit('setLoading', { type: 'notification', is: false })
  
      await dispatch("initNotifications")
  
      dispatch(
        "controller/initAlert",
        {
          is: true,
          type: "success",
          message:
            'Notification sent'
        },{root:true}
        
      );

      this.$router.go(-1)
      // console.log("Document written with ID: ", docRef.id);
    }catch(error){
      commit('setLoading', { type: 'notification', is: false })
      dispatch(
        "controller/initAlert",
        {
          is: true,
          type: "error",
          message:
            error.message,
        },{root:true}
        
      );
    }
  
  },
  

  async initNotifications ({ commit, dispatch }) {
    commit('setLoading', { type: 'notification', is: true })
    try {
      const q = query(collection(db, "notifications"));
      
      const arr = []
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data())
      });
      
      console.log('notifications', arr)
  
      commit('setLoading', { type: 'notification', is: false })
  
      commit('setState', { type: 'notifications', value:arr })
    }catch(error){
      commit('setLoading', { type: 'notification', is: false })
      dispatch(
        "controller/initAlert",
        {
          is: true,
          type: "error",
          message:
            error.message,
        },{root:true}
        
      );
    }
  },


  

  async initUsers ({ commit }) {
    commit('setLoading', { type: 'users', is: true })
   try {

    const q = query(collection(db, "users"), where("role", "==", 'user'), where("delete", "==", false));
    const users = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      // let newUser = doc.data()
      // newUser.account.signal = 0
      // dispatch('updateUser', {user: newUser, edit:{profit:false,deposit:false}, message:''})


      users.push(doc.data())
    });
    commit('setState', { type: 'users', value:users })
    commit('setLoading', { type: 'users', is: false })
    console.log('users', users);
   
  }catch(error){
     commit('setLoading', { type: 'users', is: false })
    console.log(error.message)
   }
  },

  async updateUser ({ commit, dispatch }, {user, edit, message}) {

    if(!user.delete){

      const payload = user
      commit('setLoading', { type: 'update', is: true })
      const ref = doc(db, "users", payload.userID);
      
      await updateDoc(ref, payload).then(() => {
        commit('setLoading', { type: 'update', is: false })
        console.log(`${payload.name}  updated`)
        sendNotification()
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} update successfully` }, { root: true })
      }).catch((error) => {
        commit('setLoading', { type: 'update', is: false })
        console.log(error.message)
        dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
      })
    }else {
      await dispatch('deleteThisUser', user)
    }


     function sendNotification(){
      if(edit.profit){
         dispatch('notificationFN',message.profit)

        //   emailjs
        //  .send(
        //   "service_6gsn8hu","template_9po1lgs",
        //    {
        //      name: user.name,
        //      email: user.email,
        //      amount:(user.wallet.deposit).toLocaleString()
        //      // link: `https://Primstrades.com/account/verify?id=${userID}`
        //    },
        //    "T5xrO27qwV6RS5QZ-"
        //  )
        //  .then(() => {
        //    console.log("Deposit Email Sent to User Successfully");
        //  });
      }
      if(edit.deposit){
         dispatch('notificationFN',message.deposit)
      }
    }
  },

  async initVerification ({ commit }) {
    commit('setLoading', { type: 'verification', is: true })
   try {

    const q = query(collection(db, "verification"));
    const verifications = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      verifications.push(doc.data())
    });
    commit('setState', { type: 'verifications', value:verifications })
    commit('setLoading', { type: 'verification', is: false })
    console.log('desposits', verifications);
   
  }catch(error){
     commit('setLoading', { type: 'verification', is: false })
    console.log(error.message)
   }
  },

  async updateVerification ({ commit, dispatch }, payload) {
    payload.id = payload.id.trim()
   commit('setLoading', { type: 'verification', is: true })
   
   const ref = doc(db, "verification", payload.id);
 
   await updateDoc(ref, payload).then(() => {
     commit('setLoading', { type: 'verification', is: false })
     console.log(`verification  updated`)

     dispatch('initVerification')
     dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.doc} update successfully` }, { root: true })
   }).catch((error) => {
     commit('setLoading', { type: 'verification', is: false })
     console.log(error.message)
     dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
   })


 },

  async initDeposits ({ commit }) {
    commit('setLoading', { type: 'deposit', is: true })
   try {

    const q = query(collection(db, "deposit"));
    const deposits = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      deposits.push(doc.data())
    });
    commit('setState', { type: 'deposits', value:deposits })
    commit('setLoading', { type: 'deposit', is: false })
    console.log('desposits', deposits);
   
  }catch(error){
     commit('setLoading', { type: 'deposit', is: false })
    console.log(error.message)
   }
  },


  async updateDeposit ({ commit, dispatch }, {payload, user}) {
     payload.id = payload.id.trim()
    commit('setLoading', { type: 'deposit', is: true })
    
    const ref = doc(db, "deposit", payload.id);
  
    await updateDoc(ref, payload).then(() => {
      commit('setLoading', { type: 'deposit', is: false })
      console.log(`Deposit  updated`)

      if(payload.status.toLowerCase() === 'approved'){
         dispatch('controller/topBalance', {amount:payload.amount, wallet:'deposit', duser:user}, {root:true})
      }

      dispatch('initDeposits')
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Deposit update successfully` }, { root: true })
    }).catch((error) => {
      commit('setLoading', { type: 'deposit', is: false })
      console.log(error.message)
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
    })


  },


  async initInvestments ({ commit }) {
    commit('setLoading', { type: 'investment', is: true })
   try {

    const q = query(collection(db, "investment"));
    const investments = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      investments.push(doc.data())
    });
    commit('setState', { type: 'investments', value:investments })
    commit('setLoading', { type: 'investment', is: false })
    console.log('investments', investments);
   
  }catch(error){
     commit('setLoading', { type: 'investment', is: false })
    console.log(error.message)
   }
  },

  async initLoans ({ commit }) {
    commit('setLoading', { type: 'loan', is: true })
   try {

    const q = query(collection(db, "loans"));
    const loans = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      loans.push(doc.data())
    });
    commit('setState', { type: 'loans', value:loans })
    commit('setLoading', { type: 'loan', is: false })
    console.log('Loans', loans);
   
  }catch(error){
     commit('setLoading', { type: 'loan', is: false })
    console.log(error.message)
   }
  },

  async initWithdraws ({ commit }) {
    commit('setLoading', { type: 'withdraw', is: true })
   try {

    const q = query(collection(db, "withdraw"));
    const withdraws = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      withdraws.push(doc.data())
    });
    commit('setState', { type: 'withdraws', value:withdraws })
    commit('setLoading', { type: 'withdraw', is: false })
    console.log('withdraws', withdraws);
   
  }catch(error){
     commit('setLoading', { type: 'withdraw', is: false })
    console.log(error.message)
   }
  },

  async updateWithdraw ({ commit, dispatch }, {payload, user}) {
    payload.id = payload.id.trim()
   commit('setLoading', { type: 'withdraw', is: true })
   
   const ref = doc(db, "withdraw", payload.id);
 
   await updateDoc(ref, payload).then(() => {
     commit('setLoading', { type: 'withdraw', is: false })
     console.log(`withdraw  updated`)

     if(payload.status.toLowerCase() === 'approved'){
      dispatch('controller/topBalance', {amount:payload.amount, wallet:'withdraw', duser:user}, {root:true})
     }else {
      dispatch('controller/topBalance', {amount:payload.amount, wallet:'deposit', duser:user}, {root:true})
     }

     dispatch('initWithdraws')
     dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Withdrawal request update successfully` }, { root: true })
   }).catch((error) => {
     commit('setLoading', { type: 'withdraw', is: false })
     console.log(error.message)
     dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
   })
 },
  async updateLoan ({ commit, dispatch }, {payload, user}) {
    payload.id = payload.id.trim()
   commit('setLoading', { type: 'loan', is: true })
   
   const ref = doc(db, "loans", payload.id);
 
   await updateDoc(ref, payload).then(() => {
     commit('setLoading', { type: 'loan', is: false })
     console.log(`loan  updated`)

     if(payload.status.toLowerCase() === 'approved'){
      dispatch('controller/topBalance', {amount:payload.amount, wallet:'loan', duser:user}, {root:true})
     }

     dispatch('initLoans')
     dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Loan request update successfully` }, { root: true })
   }).catch((error) => {
     commit('setLoading', { type: 'loan', is: false })
     console.log(error.message)
     dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
   })
 },



  async initLinkedwallets ({ commit }) {
    commit('setLoading', { type: 'linkedwallet', is: true })
   try {

    const q = query(collection(db, "linkedwallet"));
    const linkedwallets = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      linkedwallets.push(doc.data())
    });
    commit('setState', { type: 'linkedwallets', value:linkedwallets })
    commit('setLoading', { type: 'linkedwallet', is: false })
    console.log('linkedwallets', linkedwallets);
   
  }catch(error){
     commit('setLoading', { type: 'linkedwallet', is: false })
    console.log(error.message)
   }
  },

  async updateLinkedwallet ({ commit, dispatch }, payload) {
    payload.id = payload.id.trim()
   commit('setLoading', { type: 'linkedwallet', is: true })
   
   const ref = doc(db, "linkedwallet", payload.id);
 
   await updateDoc(ref, payload).then(() => {
     commit('setLoading', { type: 'linkedwallet', is: false })
     console.log(`linkedwallet  updated`)

     dispatch('initLinkedwallets')
     dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Wallet update successfully` }, { root: true })
   }).catch((error) => {
     commit('setLoading', { type: 'upload', is: false })
     console.log(error.message)
     dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
   })
 },


  async initUploads ({ commit }) {
    commit('setLoading', { type: 'upload', is: true })
   try {

    const q = query(collection(db, "nft"));
    const uploads = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      disp
      uploads.push(doc.data())
    });
    commit('setState', { type: 'uploads', value:uploads })
    commit('setLoading', { type: 'upload', is: false })
    console.log('uploads', uploads);
   
  }catch(error){
     commit('setLoading', { type: 'upload', is: false })
    console.log(error.message)
   }
  },

  async updateInvestment ({ commit, dispatch }, payload) {
    payload.id = payload.id.trim()
   commit('setLoading', { type: 'investment', is: true })
   
   const ref = doc(db, "investment", payload.id);
 
   await updateDoc(ref, payload).then(() => {
     commit('setLoading', { type: 'investment', is: false })
     console.log(`Investment  updated`)

     dispatch('initInvestments')
     dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Investment update successfully` }, { root: true })
   }).catch((error) => {
     commit('setLoading', { type: 'investment', is: false })
     console.log(error.message)
     dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
   })
 },
 

  async updateUpload ({ commit, dispatch }, payload) {
    payload.id = payload.id.trim()
   commit('setLoading', { type: 'upload', is: true })
   
   const ref = doc(db, "nft", payload.id);
 
   await updateDoc(ref, payload).then(() => {
     commit('setLoading', { type: 'upload', is: false })
     console.log(`upload  updated`)

     dispatch('initUploads')
     dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `NFT upload update successfully` }, { root: true })
   }).catch((error) => {
     commit('setLoading', { type: 'upload', is: false })
     console.log(error.message)
     dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
   })
 },


 async initScodes ({ commit, dispatch }) {
  commit('setLoading', { type: 'scode', is: true })
  try {
    const q = query(collection(db, "scode"));

    const arr = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data())
      });
      
      console.log('scodes', arr)
      
      commit('setLoading', { type: 'scode', is: false })
      commit('setState', { type: 'scodes', value:arr })
   
  }catch(error){
    commit('setLoading', { type: 'scode', is: false })
    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "error",
        message:
          error.message,
      },{root:true}
      
    );
  }
},

async deleteScode({commit, dispatch},payload){

  commit('setLoading', { type: 'scode', is: true })
  try{

    await deleteDoc(doc(db, "scode", payload.id));

      commit('setLoading', { type: 'scode', is: false })

      await dispatch('initScodes')
      
      console.log(`scode deleted`)
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} deleted successfully` }, { root: true })


}catch(error) {
  commit('setLoading', { type: 'scode', is: false })
  console.log(error.message)
  dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
}
},


 async scodeFN({commit, dispatch}, payload){
  commit('setLoading', { type: 'scode', is: true })
  try {
   const docRef = await addDoc(collection(db, "scode"), payload);
    await dispatch('controller/updateTransactionID', {col:'scode', id:docRef.id}, {root:true})

    commit('setLoading', { type: 'scode', is: false })

    await dispatch("initScodes")

    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "success",
        message:
          'Signal code created successfully'
      },{root:true}
      
    );

    this.$router.go(-1)
    // console.log("Document written with ID: ", docRef.id);
  }catch(error){
    commit('setLoading', { type: 'scode', is: false })
    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "error",
        message:
          error.message,
      },{root:true}
      
    );
  }

},

async initWcodes ({ commit, dispatch }) {
  commit('setLoading', { type: 'wcode', is: true })
  try {
    const q = query(collection(db, "wcode"));
    const arr = []
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push(doc.data())
    });
    
    console.log('wcodes', arr)

    commit('setLoading', { type: 'wcode', is: false })
    commit('setState', { type: 'wcodes', value:arr })
  }catch(error){
    commit('setLoading', { type: 'wcode', is: false })
    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "error",
        message:
          error.message,
      },{root:true}
      
    );
  }
},
 async generateWCode({commit, dispatch}){
  commit('setLoading', { type: 'wcode', is: true })
  try {

    let code = Math.floor(100000 + Math.random() * 900000);
    code = code.toString();
    const payload = {
      code,
      used:false
    }

   const docRef = await addDoc(collection(db, "wcode"), payload);
   await dispatch('controller/updateTransactionID', {col:'wcode', id:docRef.id}, {root:true})
    commit('setLoading', { type: 'wcode', is: false })

    await dispatch("initWcodes")

    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "success",
        message:
          'W code generated successfully'
      },{root:true}
      
    );

    // console.log("Document written with ID: ", docRef.id);
  }catch(error){
    commit('setLoading', { type: 'wcode', is: false })
    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "error",
        message:
          error.message,
      },{root:true}
      
    );
  }

},
 async traderFN({commit, dispatch}, payload){
  commit('setLoading', { type: 'trader', is: true })
  try {
   const docRef = await addDoc(collection(db, "traders"), payload);
    await dispatch('controller/updateTransactionID', {col:'traders', id:docRef.id}, {root:true})

    commit('setLoading', { type: 'trader', is: false })

    await dispatch("initTraders")

    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "success",
        message:
          'Trader created successfully'
      },{root:true}
      
    );

    this.$router.go(-1)
    // console.log("Document written with ID: ", docRef.id);
  }catch(error){
    commit('setLoading', { type: 'trader', is: false })
    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "error",
        message:
          error.message,
      },{root:true}
      
    );
  }

},


async updateTrader({commit, dispatch},payload){

  commit('setLoading', { type: 'trader', is: true })

  //Upload QRL Code
  try {
     const ref = doc(db, "traders", payload.id);
     await updateDoc(ref, payload).then(async () => {
       commit('setLoading', { type: 'trader', is: false })
 
       await dispatch('initTraders')
       
       console.log(`Trader updated`)
       dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} update successfully` }, { root: true })
       this.$router.go(-1)
 
     }).catch((error) => {
       commit('setLoading', { type: 'trader', is: false })
       console.log(error.message)
       dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
     })

  }catch(error){
    commit('setLoading', { type: 'trader', is: false })
    console.log(error.message)
    dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
 
  }
  
},



 async initTraders ({ commit, dispatch }) {
  commit('setLoading', { type: 'trader', is: true })
  try {
    const q = query(collection(db, "traders"));
    
    const arr = []
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push(doc.data())
    });
    
    console.log('traders', arr)

    commit('setLoading', { type: 'trader', is: false })

    commit('setState', { type: 'traders', value:arr })
  }catch(error){
    commit('setLoading', { type: 'trader', is: false })
    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "error",
        message:
          error.message,
      },{root:true}
      
    );
  }
},

async deleteTrader({commit, dispatch},payload){

  commit('setLoading', { type: 'trader', is: true })
  try{

    await deleteDoc(doc(db, "traders", payload.id));

      commit('setLoading', { type: 'trader', is: false })

      await dispatch('initTraders')
      
      console.log(`Trader deleted`)
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} deleted successfully` }, { root: true })


}catch(error) {
  commit('setLoading', { type: 'trader', is: false })
  console.log(error.message)
  dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
}
},

async deleteThisUser({commit, dispatch}, payload){
  commit('setLoading', { type: 'deleteUser', is: true })

  await deleteDoc(doc(db, "users", payload.id));
  await deleteUser(user).then(() => {
     commit('setLoading', { type: 'deleteUser', is: false })
     dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} deleted successfully` }, { root: true })
    // User deleted.
  }).catch((error) => {
     commit('setLoading', { type: 'deleteUser', is: false })
     console.log(error.message)
    dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
 
    // An error ocurred
    // ...
  });
},


async initManagers ({ commit, dispatch }) {
  commit('setLoading', { type: 'manager', is: true })
  try {
    const q = query(collection(db, "managers"));
    
    const arr = []
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push(doc.data())
    });
    
    console.log('managers', arr)

    commit('setLoading', { type: 'manager', is: false })

    commit('setState', { type: 'managers', value:arr })
  }catch(error){
    commit('setLoading', { type: 'manager', is: false })
    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "error",
        message:
          error.message,
      },{root:true}
      
    );
  }
},



 async managerFN({commit, dispatch}, payload){
  commit('setLoading', { type: 'manager', is: true })
  try {
   const docRef = await addDoc(collection(db, "managers"), payload);
    await dispatch('controller/updateTransactionID', {col:'managers', id:docRef.id}, {root:true})

    commit('setLoading', { type: 'manager', is: false })

    await dispatch("initManagers")

    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "success",
        message:
          'Manager created successfully'
      },{root:true}
      
    );

    this.$router.go(-1)
    // console.log("Document written with ID: ", docRef.id);
  }catch(error){
    commit('setLoading', { type: 'manager', is: false })
    dispatch(
      "controller/initAlert",
      {
        is: true,
        type: "error",
        message:
          error.message,
      },{root:true}
      
    );
  }

},

async deleteManager({commit, dispatch},payload){

  commit('setLoading', { type: 'manager', is: true })
  try{

    await deleteDoc(doc(db, "managers", payload.id));

      commit('setLoading', { type: 'manager', is: false })

      await dispatch('initManagers')
      
      console.log(`Manager deleted`)
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} deleted successfully` }, { root: true })


}catch(error) {
  commit('setLoading', { type: 'manager', is: false })
  console.log(error.message)
  dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
}
},

  initAdmin ({ dispatch }) {
    dispatch('initUsers')
    dispatch('initDeposits')
    dispatch('initManagers')
    dispatch('initTraders')
    // dispatch('initLinkedwallets')
    dispatch('initWithdraws')
    dispatch('initLoans')
    dispatch('initScodes')
    dispatch('initWcodes')
    dispatch('initInvestments')
    dispatch('initWalletAddress')
    dispatch('initVerification')
    dispatch('initNotifications')

  }
}
