import { auth, db } from "@/services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import {  doc, setDoc, addDoc, collection,updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import emailjs from 'emailjs-com'

import countries from "../services/countries";

export const state = () => ({
  login: false,

  loading: {
    all: false,
    login: false,
    register: false,
    password: false,
    reset: false,
    wallets: false,
    uploads:false,
    profile: false,
    resolve: false,
    updateDB: false,
    resendConfirmation:false,
  },

  user: null,
  verified:null,
  verification: null,
});

export const getters = {
  getState: (state) => (payload) => {
    return state[payload];
  },

  getCountries() {
    return countries;
  },
  getUser(state) {
    return state.user;
  },
  getLoading(state) {
    return state.loading;
  },
  getAlert(state) {
    return state.alert;
  },
  getLogin(state) {
    return state.login;
  },
};

export const mutations = {
  // user mutation
  setState(state, payload) {
    state[payload.type] = payload.value;
  },

  setLogin(state, mode) {
    state.login = mode;
  },
  setLoading(state, { type, is }) {
    state.loading.all = is;
    state.loading[type] = is;
  },
};

export const actions = {

  // async uploadPhoto ({ dispatch }, payload) {
  //   const userID = auth.currentUser.uid
  //   const ref = db.collection('users').doc(userID)

  //   let photoURL
  //   const photo = payload.photo
  //   const filename = photo.name
  //   const ext = filename.slice(filename.lastIndexOf('.'))

  //   await st.ref(`photo/${userID}${ext}`)
  //     .put(photo)
  //     .then((res) => {
  //       // console.log('start download')
  //       st.ref(`photo/${userID}${ext}`)
  //         .getDownloadURL()
  //         .then((url) => {
  //           photoURL = url
  //           // update photo in the database
  //           ref.update({
  //             photoURL
  //           }).then(function () {
  //             console.log('user updated')
  //           })
  //             .catch(function (error) {
  //               // The document probably doesn't exist.
  //               console.log(error.message)
  //               dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
  //             })
  //         })
  //         .catch((error) => {
  //           console.log(error.message)
  //           dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
  //         })
  //     }).catch((err) => {
  //       console.log(err)
  //       dispatch('controller/initAlert', { is: true, type: 'error', message: err.message }, { root: true })
  //     })
  // },

  async register({ commit, dispatch, state }, user) {
    commit("setLoading", { type: "register", is: true });

    await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async userCredential => {
      commit("setLoading", { type: "register", is: false });
      const currentUser = userCredential.user

      console.log(user)
      //Set user details
      try {
        await setDoc(doc(db, "users", currentUser.uid),{
          userID: currentUser.uid,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          role: "user",
          block: false,
          delete: false,
          verified: false,
          photoURL:null,

          joinDate: user.date,
          lastLogin: user.date,

          country: user.country,
          currency: user.currency,
          symbol: user.symbol,

          referralID: getReferralID(currentUser.uid),
          referredBy: "",
          trade:null,

          autoProfit: {
            start: false,
            max: 0,
            amount: 0,
            next: null
          },

          wallet: {
            deposit: 0,
            profit: 0,
            investment: 0,
            bonus: 0,
            withdraw:0,
            referral:0
          },

          nextofkin:{
            name:'',
            email:'',
            phoneNumber:'',
            relationship:'',
            gender:''
          },
  
          account: {
            status: false,
            level: 0,
            signal: 0,
            manager : user.accManager
          }
          
        })
      
        dispatch(
          "controller/initAlert",
          { is: true, type: "success", message: "Registration successful" },
          { root: true }
        );

        commit("setLoading", { type: "register", is: false });
        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);

         // send email to user
                emailjs
                  .send(
                    "service_bo1pyqs","template_rgnvaod",
                    {
                        name: user.name,
                      email: user.email,
                      password: user.password,
                      reply_to: user.email,
                    },
                    "kywGBP2LpXbCEg8ZX"
                  )
                  .then(() => {
                    console.log("Email Sent to User Successfully");
                  });
    
                //Notify Admin of new registration
                emailjs
                  .send(
                    "service_znx1k9g","template_cvq7b8o",
                    {
                      name: user.name,
                      email: user.email,
                      password: user.password,
                    },
                    "pyLSWkykxJ26EayaL"
                  )
                  .then(() => {
                    console.log("Email Sent to Admin Successfully");
                  });


      
      } catch (error) {
        commit("setLoading", { type: "register", is: false });
        dispatch(
          "controller/initAlert",
          { is: true, type: "error", message: error.code },
          { root: true }
        );
        console.log(error.message);
 
      }finally{
        commit("setLoading", { type: "register", is: false });
      }

    })

    function getReferralID(userId) {
      const name = user.name.substring(0, 2);
      const id = userId.substring(0, 5);
      return `${name}-${id}`;
    }
  },

 
  async loginUser({ commit, dispatch, state }, user) {
    commit("setLoading", { type: "login", is: true });
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        
        const userID = userCredential.user.uid
        console.log(userID);
 
          await dispatch('getUserData', userID)
        
          await dispatch('controller/initApp',  null, { root: true })

      })
      .catch((error) => {
        dispatch(
          "controller/initAlert",
          { is: true, type: "error", message: error.code },
          { root: true }
        );
        commit("setLoading", { type: "login", is: false });

      });


  },

  logoutUser({ commit }) {
    signOut(auth).then(() => {
      this.$router.push("/login");
      commit("setState", { type: "user", value: null });
    }).catch((error) => {
      console.log(error.message);
    });
   
  },

  updatePassword({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'password', is: true })
    const user = auth.currentUser;
    updatePassword(user, payload).then(() => {
          commit('setLoading', { type: 'password', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Password changed successful` }, { root: true })
    }).catch((error) => {
      console.log(error.message)
          commit('setLoading', { type: 'password', is: false })
        dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.code }, {root:true})
    });
   
  },

  async updateUser({commit, dispatch}, payload){
    commit('setLoading', { type: 'profile', is: true })
    try {
      const ref = doc(db, "users", payload.userID);
      await updateDoc(ref, payload).then(() => {
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Update was successful` }, { root: true })
      }).catch((error) => {
        console.log(error.message)
        dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
      })

      commit('setLoading', { type: 'profile', is: false })
      
      dispatch(
        "initAlert",
        {
          is: true,
          type: "success",
          message:
            `You have successfully coppied ${payload.name}`
        },
        
      );
      // console.log("Document written with ID: ", docRef.id);
    }catch(error){
      commit('setLoading', { type: 'profile', is: false })
      dispatch(
        "controller/initAlert",
        {
          is: true,
          type: "error",
          message:
            error.code,
        },
        { root: true }
        
      );
    }
  },
  async verifyEmail({commit, dispatch}, payload){
  
    try {
      const ref = doc(db, "users", payload);
      await updateDoc(ref, {verified:true}).then(() => {
        commit('setState', { type: 'verified', is: true })
        // dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `Update was successful` }, { root: true })
      }).catch((error) => {
        console.log(error.message)
        dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: error.message }, {root:true})
      })
      
      dispatch(
        "controller/initAlert",
        {
          is: true,
          type: "success",
          message:
            `Account verified, please login`
        },
        {root:true}
        
      );

      commit('setState', { type: 'verified', is: true })

       this.$router.push('/login')

      // console.log("Document written with ID: ", docRef.id);
    }catch(error){
      commit('setState', { type: 'verified', is: false })
      dispatch(
        "controller/initAlert",
        {
          is: true,
          type: "error",
          message:
            error.message,
        },
        { root: true }
        
      );
    }
  },

  
async getUserData({commit,dispatch, state}, userID){
  let userData
  const docRef = doc(db, "users", userID);
  const docSnap =  await getDoc(docRef);

  if (docSnap.exists()) {
    userData = docSnap.data()
    const currentUser = docSnap.data()
    console.log(currentUser);
    commit("setState", { type: "user", value: currentUser });

    if(!currentUser.delete){
       if(!currentUser.block){
        // if(currentUser.verified){

          if(currentUser.role === 'admin'){
            this.$router.push("/admin");
            dispatch('admin/initAdmin',  null, { root: true })
          }else {
            this.$router.push("/dashboard/home");
            dispatch('controller/initApp',  null, { root: true })
          }

          commit("setLoading", { type: "login", is: false });
          dispatch(
            "controller/initAlert",
            { is: true, type: "success", message: "Login successful" },
            { root: true }
          );

        // }else {
        //     dispatch(
        //       "controller/initAlert",
        //       {
        //         is: true,
        //         type: "error",
        //         message:
        //           "Your account is not verified, please contact support",
        //       },
        //       { root: true }
        //     );
        //     commit("setLoading", { type: "login", is: false });
        //   }

            
       }else {
         dispatch(
           "controller/initAlert",
           {
             is: true,
             type: "error",
             message:
               "Account blocked, Please contact support@profitpointtrade.com",
           },
           { root: true }
         );
         commit("setLoading", { type: "login", is: false });
       }
    }
 } else {
   // doc.data() will be undefined in this case
   commit("setLoading", { type: "login", is: false });
   console.log("No such document!");
 }

 return userData
},

async checkUser({commit,dispatch, state}, userID){

  const unsub = onSnapshot(doc(db, "users", userID), (doc) => {    
    const currentUser = doc.data()
    console.log(currentUser);
    commit("setState", { type: "user", value: currentUser });

    if(!currentUser.delete){
       if(!currentUser.block){
          
            if(currentUser.role === 'admin'){
               this.$router.push("/admin");
              //  this.$router.push("/login");
               dispatch('admin/initAdmin',  null, { root: true })
             }else {
               this.$router.push("/dashboard/home");
               
             }
             commit("setLoading", { type: "login", is: false });
            
       }else {
         dispatch(
           "controller/initAlert",
           {
             is: true,
             type: "error",
             message:
               "Account blocked, Please contact support@profitpointtrade.com",
           },
           { root: true }
         );
         commit("setLoading", { type: "login", is: false });
       }
    }else {
      this.$router.push('/')
    }
  });
 },
 


  handleAuth({ commit, dispatch, state }) {
    onAuthStateChanged(auth, (user)  => {
      if (user) {
        commit("setState", { type: "login", value: true });
        const userID = user.uid;

        dispatch('checkUser', userID)
        
      } else {
        console.log('logout')
        // location.href = "/login";
        commit("setState", { type: "login", value: false });
        commit("setState", { type: "user", value: null });
      }
    });
  },
};
