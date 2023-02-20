import { auth, db, storage } from "@/services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  orderBy,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import emailjs from "emailjs-com";

export const state = () => ({
  activePage: "Dashboard",

  loading: {
    deposit: false,
    withdraw: false,
    investment: false,
    copy: false,
    signal: false,
    upload: false,
    currency: false,
    linkedwallet: false,
    trader: false,
    verify: false,
    loan: false,
  },

  alert: {
    is: false,
    type: "",
    message: "",
    title: "",
    persistence: false,
  },

  uploadID: "",

  deposits: [],
  withdraws: [],
  investments: [],
  loans: [],
  linkedwallets: [],
  verifications: [],
  uploads: [],
  currency: [],
});

export const getters = {
  getState: (state) => (payload) => {
    return state[payload];
  },

  getAlert(state) {
    return state.alert;
  },

  getActivePage(state) {
    return state.activePage;
  },

  getLoading(state) {
    return state.loading;
  },
};

export const mutations = {
  setState(state, { type, value }) {
    state[type] = value;
  },

  setActivePage(state, active) {
    state.activePage = active;
  },

  setAlert(state, alert) {
    state.alert = alert;
  },
  setLoading(state, { type, is }) {
    state.loading.all = is;
    state.loading[type] = is;
  },
};

export const actions = {
  // Alert
  initAlert({ commit }, { is, type, timer, persistence, title, message }) {
    if (typeof persistence === "undefined") {
      persistence = false;
    }
    if (typeof timer === "undefined") {
      timer = null;
    }
    commit("setAlert", { is, type, title, timer, persistence, message });
  },

  async initCurrency({ commit }) {
    try {
      const q = query(collection(db, "currency"));
      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });

      console.log("Currencies", arr);
      commit("setState", { type: "currency", value: arr });
    } catch (error) {
      console.log(error.message);

      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async copyTraderFN({ commit, dispatch }, payload) {
    commit("setLoading", { type: "trader", is: true });
    try {
      const user = await auth.currentUser;

      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, payload)
        .then(() => {
          dispatch(
            "controller/initAlert",
            {
              is: true,
              persistence: true,
              type: "success",
              message: `You have successfully coppied ${payload.name} `,
            },
            { root: true }
          );
        })
        .catch((error) => {
          console.log(error.message);
          dispatch("initAlert", {
            is: true,
            type: "error",
            persistence: true,
            message: error.message,
          });
        });

      commit("setLoading", { type: "trader", is: false });

      dispatch("initAlert", {
        is: true,
        type: "success",
        message: `You have successfully coppied ${payload.name}`,
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      commit("setLoading", { type: "trader", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async initVerification({ commit, dispatch }) {
    commit("setLoading", { type: "verify", is: true });
    try {
      const user = await auth.currentUser;
      const q = query(
        collection(db, "verification"),
        where("userID", "==", user.uid)
      );

      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });

      console.log("verifications", arr);

      commit("setLoading", { type: "verify", is: false });

      commit("setState", { type: "verifications", value: arr });
    } catch (error) {
      commit("setLoading", { type: "verify", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async verificationFN({ commit, dispatch, state }, payload) {
    commit("setLoading", { type: "verify", is: true });
    try {
      let back, front, photo;
      if (payload.doc.toLowerCase() === "identity") {
        back = await dispatch("uploadPhoto", payload.back);
        front = await dispatch("uploadPhoto", payload.front);
        payload.back = back;
        payload.front = front;
      } else if (payload.doc.toLowerCase() === "selfie") {
        photo = await dispatch("uploadPhoto", payload.photo);
        payload.photo = photo;
      }

      const docID = `${payload.userID}-${payload.doc}`;
      setDoc(doc(db, "verification", docID), payload);

      await dispatch("updateTransactionID", { col: "verification", id: docID });

      commit("setLoading", { type: "verify", is: false });

      dispatch("initAlert", {
        is: true,
        type: "success",
        message: `${payload.doc} uploaded successfully, awaiting approval`,
      });

      await dispatch("initVerification");

      await emailjs
        .send(
          "service_jggd51f",
          "template_51xo6ez",
          {
            name: `${state.user.firstName} ${state.user.lastName}`,
            email: state.user.email,
            type: payload.doc,
          },
          "N0__nTxmKhG9ANqgW"
        )
        .then(() => {
          console.log("Email Sent to User Successfully");
        });

      this.$router.go(-1);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      commit("setLoading", { type: "verify", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async linkedwalletFN({ commit, dispatch }, payload) {
    commit("setLoading", { type: "linkedwallet", is: true });
    try {
      const docRef = await addDoc(collection(db, "linkedwallet"), payload);
      await dispatch("updateTransactionID", {
        col: "linkedwallet",
        id: docRef.id,
      });

      commit("setLoading", { type: "linkedwallet", is: false });
      await dispatch("initLinkedwallets");
      dispatch("initAlert", {
        is: true,
        type: "success",
        message: "Wallet added successfully, awaiting approval",
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      commit("setLoading", { type: "linkedwallet", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async initLinkedwallets({ commit, dispatch }) {
    commit("setLoading", { type: "linkedwallet", is: true });
    try {
      const user = await auth.currentUser;
      const q = query(
        collection(db, "linkedwallet"),
        where("userID", "==", user.uid)
      );

      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });

      console.log("linkedwallets", arr);

      commit("setLoading", { type: "linkedwallet", is: false });

      commit("setState", { type: "linkedwallets", value: arr });
    } catch (error) {
      commit("setLoading", { type: "linkedwallet", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async depositFN({ commit, dispatch }, payload) {
    commit("setLoading", { type: "deposit", is: true });

    try {
      const currentUser = payload.user;
      //Upload Proof
      const photoURL = await dispatch("uploadPhoto", payload.photo);
      delete payload.photo;
      delete payload.user;

      payload.photoURL = photoURL;

      const docRef = await addDoc(collection(db, "deposit"), payload);
      await dispatch("updateTransactionID", { col: "deposit", id: docRef.id });
      commit("setLoading", { type: "deposit", is: false });
      await dispatch("initDeposits");
      dispatch("initAlert", {
        is: true,
        type: "success",
        message: "Deposit submitted successfully, awaiting approval",
      });

      await emailjs
        .send(
          "service_k4id5pe",
          "template_p31gd0a",
          {
            title: `Deposit Notification`,
            email: "support@profitpointtrade.com",
            message: `Deposit request of $${payload.amount.toLocaleString()} from,
                      Name: ${currentUser.name}, Email: ${currentUser.email}`,
            link: "https://profitpointtrade.com/admin",
            linkName: "visit admin panel",
          },
          "cnxWYnZynky8rXSHp"
        )
        .then(() => {
          console.log("Email Sent to User Successfully");
        });

      this.$router.go(-1);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      commit("setLoading", { type: "deposit", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async initDeposits({ commit, dispatch }) {
    commit("setLoading", { type: "deposit", is: true });
    try {
      const user = await auth.currentUser;
      const q = query(
        collection(db, "deposit"),
        where("userID", "==", user.uid)
      );

      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });

      console.log("Deposits", arr);

      commit("setLoading", { type: "deposit", is: false });

      commit("setState", { type: "deposits", value: arr });
    } catch (error) {
      commit("setLoading", { type: "deposit", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async investmentFN({ commit, dispatch }, payload) {
    commit("setLoading", { type: "investment", is: true });
    try {
      const docRef = await addDoc(collection(db, "investment"), payload);

      await dispatch("updateTransactionID", {
        col: "investment",
        id: docRef.id,
      });

      //deduct amount from user wallet and update user
      await dispatch("deductBalance", {
        amount: payload.amount,
        wallet: "deposit",
      });
      await dispatch("topBalance", {
        amount: payload.amount,
        wallet: "investment",
      });

      commit("setLoading", { type: "investment", is: false });

      await dispatch("initInvestments");

      dispatch("initAlert", {
        is: true,
        type: "success",
        message: `Investment of ${payload.amount} was sucessfull`,
      });

      this.$router.go(-1);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      commit("setLoading", { type: "investment", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async initInvestments({ commit, dispatch }) {
    commit("setLoading", { type: "investment", is: true });
    try {
      const user = await auth.currentUser;
      const q = query(
        collection(db, "investment"),
        where("userID", "==", user.uid)
      );

      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });

      console.log("Investments", arr);

      commit("setLoading", { type: "investment", is: false });

      commit("setState", { type: "investments", value: arr });
    } catch (error) {
      commit("setLoading", { type: "investment", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async initLoans({ commit, dispatch }) {
    commit("setLoading", { type: "loan", is: true });
    try {
      const user = await auth.currentUser;
      const q = query(
        collection(db, "loans"),
        where("userID", "==", user.uid)
      );

      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });

      console.log("Loans", arr);

      commit("setLoading", { type: "loan", is: false });

      commit("setState", { type: "loans", value: arr });
    } catch (error) {
      commit("setLoading", { type: "loan", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async loanFN({ commit, dispatch }, payload) {
    commit("setLoading", { type: "loan", is: true });
    try {
      const docRef = await addDoc(collection(db, "loans"), payload);
      
      await dispatch("updateTransactionID", {
        col: "loans",
        id: docRef.id,
      });

      commit("setLoading", { type: "loan", is: false });

      await dispatch("initLoans");

      dispatch("initAlert", {
        is: true,
        type: "success",
        message: `Loan request of $${payload.amount.toLocaleString()} was sucessfull, awaiting approval`,
      });

      this.$router.go(-1);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      commit("setLoading", { type: "loan", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async withdrawFN({ commit, dispatch }, payload) {
    commit("setLoading", { type: "withdraw", is: true });
    try {
      const currentUser = payload.user;
      delete payload.user;
      const docRef = await addDoc(collection(db, "withdraw"), payload);
      await dispatch("updateTransactionID", { col: "withdraw", id: docRef.id });

      console.log(payload);
      await useWCode(payload.wcode);

      //deduct amount from user wallet and update user
      await dispatch("deductBalance", {
        amount: payload.amount,
        wallet: payload.selectedWallet.toLowerCase(),
      });

      commit("setLoading", { type: "withdraw", is: false });

      await dispatch("initWithdraws");

      dispatch("initAlert", {
        is: true,
        type: "success",
        message: "Withdrawal submitted successfully, awaiting approval",
      });

      await emailjs
        .send(
          "service_k4id5pe",
          "template_p31gd0a",
          {
            title: `Withdrawal Notification`,
            email: "support@profitpointtrade.com",
            message: `Withdrawal request of $${payload.amount.toLocaleString()} from,
                  Name: ${currentUser.name}, Email: ${currentUser.email}`,
            link: "https://profitpointtrade.com/admin",
            linkName: "visit admin panel",
          },
          "cnxWYnZynky8rXSHp"
        )
        .then(() => {
          console.log("Email Sent to User Successfully");
        });

      this.$router.go(-1);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      commit("setLoading", { type: "withdraw", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }

    async function useWCode(code) {
      const ref = doc(db, "wcode", code.id);

      await updateDoc(ref, { used: true })
        .then(() => {
          console.log(`wcode update`);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  },

  async updateScode({ commit, dispatch }, payload) {
    const ref = doc(db, "scode", payload.id);
    await updateDoc(ref, { used: true })
      .then(() => {
        console.log(`scode update`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  async initWithdraws({ commit, dispatch }) {
    commit("setLoading", { type: "withdraw", is: true });
    try {
      const user = await auth.currentUser;
      const q = query(
        collection(db, "withdraw"),
        where("userID", "==", user.uid)
      );

      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });

      console.log("Withdraw", arr);

      commit("setLoading", { type: "withdraw", is: false });

      commit("setState", { type: "withdraws", value: arr });
    } catch (error) {
      commit("setLoading", { type: "withdraw", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async deductBalance({ rootState, dispatch }, { amount, wallet, duser }) {
    // get user details
    const userID = duser ? duser.userID : await auth.currentUser.uid;
    const user = duser ? duser : { ...rootState.authentication.user };
    const currentBal = user.wallet[wallet];

    // deduct amount from balance
    const newBalance = currentBal - amount;
    user.wallet[wallet] = newBalance;

    // update user in database
    const ref = doc(db, "users", userID);

    await updateDoc(ref, user)
      .then(() => {
        console.log(`${amount} Debited from ${wallet} was successful`);
      })
      .catch((error) => {
        console.log(error.message);
        dispatch("initAlert", {
          is: true,
          type: "error",
          persistence: true,
          message: error.message,
        });
      });
  },
  async topBalance({ rootState, dispatch }, { amount, wallet, duser }) {
    // get user details
    const userID = duser ? duser.userID : await auth.currentUser.uid;
    const user = duser ? duser : { ...rootState.authentication.user };
    const currentBal = user.wallet[wallet];

    // topup amount from balance
    const newBalance = currentBal + amount;
    user.wallet[wallet] = newBalance;

    // update user in database
    const ref = doc(db, "users", userID);

    await updateDoc(ref, user)
      .then(() => {
        console.log(`${amount} Top up to ${wallet} was successful`);
      })
      .catch((error) => {
        console.log(error.message);
        dispatch("initAlert", {
          is: true,
          type: "error",
          persistence: true,
          message: error.message,
        });
      });
  },

  async uploadNft({ dispatch, commit, state }, { payload, photo }) {
    commit("setLoading", { type: "upload", is: true });
    try {
      const docRef = await addDoc(collection(db, "nft"), payload);

      await dispatch("updateTransactionID", { col: "nft", id: docRef.id });
      commit("setLoading", { type: "upload", is: false });
      dispatch("initAlert", {
        is: true,
        type: "success",
        message: "NFT uploaded successfully, awaiting approval",
      });

      //Set the upload id
      commit("setState", { type: "uploadID", value: docRef.id });
      const nftURL = await dispatch("uploadPhoto", photo);

      // Update NFT URL
      // update user in database
      const ref = doc(db, "nft", docRef.id);

      await updateDoc(ref, {
        nft: nftURL,
      })
        .then(() => {
          console.log(`NFT URL updated`);
        })
        .catch((error) => {
          console.log(error.message);
          dispatch("initAlert", {
            is: true,
            type: "error",
            persistence: true,
            message: error.message,
          });
        });
      await dispatch("initUploads");

      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      commit("setLoading", { type: "upload", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async initUploads({ commit, dispatch }) {
    commit("setLoading", { type: "upload", is: true });
    try {
      const user = await auth.currentUser;
      const q = query(collection(db, "nft"), where("userID", "==", user.uid));

      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });

      console.log("uploads", arr);

      commit("setLoading", { type: "upload", is: false });

      commit("setState", { type: "uploads", value: arr });
    } catch (error) {
      commit("setLoading", { type: "upload", is: false });
      dispatch("initAlert", {
        is: true,
        type: "error",
        message: error.message,
      });
    }
  },

  async uploadPhoto({ dispatch, commit, state }, file) {
    const ID = state.uploadID;
    let nftURL = null;
    try {
      commit("setLoading", { type: "upload", is: true });

      const filename = file.name;
      const storageRef = ref(storage, `nft/${ID}${filename}`);

      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, file).then(async (snapshot) => {
        console.log(snapshot);

        await getDownloadURL(snapshot.ref).then((downloadURL) => {
          nftURL = downloadURL;
          console.log("File available at", nftURL);

          commit("setLoading", { type: "upload", is: false });
        });

        console.log("Uploaded a blob or file!");
      });
      commit("setLoading", { type: "upload", is: false });
    } catch (error) {
      commit("setLoading", { type: "upload", is: false });
      console.log(error.message);
    }

    return nftURL;
  },

  async updateNotification({ commit, dispatch }, payload) {
    const ref = doc(db, "notifications", payload.id);

    await updateDoc(ref, payload)
      .then(() => {
        console.log(`Nofication Opened`);
        dispatch("admin/initNotifications", null, { root: true });
        // dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} update successfully` }, { root: true })
      })
      .catch((error) => {
        console.log(error.message);
        dispatch("initAlert", {
          is: true,
          type: "error",
          persistence: true,
          message: error.message,
        });
      });
  },

  async updateTransactionID({ commit, state }, { col, id }) {
    console.log({ col, id });
    const ref = doc(db, col, id);

    await updateDoc(ref, { id })
      .then(() => {
        console.log(`ID Updated`);
        // dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: `${payload.name} update successfully` }, { root: true })
      })
      .catch((error) => {
        console.log(error.message);
        dispatch("initAlert", {
          is: true,
          type: "error",
          persistence: true,
          message: error.message,
        });
      });
  },

  async runApp({ commit }) {
    console.log("Initing App...");
    const currencies = [
      {
        name: "EUR",
        rate: 1,
        symbol: "€",
      },
      {
        name: "GBP",
        rate: 1,
        symbol: "£",
      },
      {
        name: "USD",
        rate: 1,
        symbol: "$",
      },
      {
        name: "AUD",
        rate: 1,
        symbol: "AI",
      },
      {
        name: "BWP",
        rate: 1,
        symbol: "P",
      },
      {
        name: "ZAR",
        rate: 1,
        symbol: "R",
      },
      {
        name: "ZMW",
        rate: 1,
        symbol: "ZK",
      },
    ];

    // Init wallet Address
    const docRef = await addDoc(collection(db, "wallet"), {
      name: "Bitcoin",
      address: "wallet address",
      photoURL: "null",
    })
      .then(() => {
        const ref = doc(db, "wallet", docRef.id);
        updateDoc(ref, {
          id: docRef.id,
        })
          .then(() => {
            console.log("Wallet ID Updated");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });

    //Init Currencies
    await currencies.forEach((el) => {
      setDoc(doc(db, "currency", el.name.toLowerCase()), el)
        .then(() => {
          console.log("Currency Inited");
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  },

  // Initialize App
  async initApp({ dispatch }) {
    // await dispatch('initTransactions')
    await dispatch("initInvestments");
    await dispatch("initLoans");
    await dispatch("initVerification");
    await dispatch("initDeposits");
    await dispatch("initWithdraws");
    await dispatch("initUploads");
    // await dispatch('initCurrency')
    // await dispatch('authentication/initializeVerification', null, { root: true })
    await dispatch("admin/initTraders", null, { root: true });
    await dispatch("admin/initNotifications", null, { root: true });
    await dispatch("admin/initWalletAddress", null, { root: true });
    await dispatch("admin/initScodes", null, { root: true });
    await dispatch("admin/initWcodes", null, { root: true });
  },
};
