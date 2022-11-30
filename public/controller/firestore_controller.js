import { getFirestore, collection, addDoc, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js"

const db = getFirestore();

const TicTacToeGameCollection = 'tictactoe_game';
const CommunityCollection = 'community_feed';


export async function addTicTacToeGameHistory(gamePlay) {
    //gamePlay = {email, winner, moves, timestamp}
    await addDoc(collection(db, TicTacToeGameCollection), gamePlay);
}

export async function getTicTacToeGameHistory(email) {
    let history= [];
    const q = query(
        collection(db, TicTacToeGameCollection),
        where('email','==', email),
        orderBy('timestamp','desc'),
    );
const snapShot = await getDocs(q);
snapShot.forEach( doc => {
    const {email, winner, moves, timestamp } = doc.data();
    history.push({email, winner, moves, timestamp});
});
return history;
}

export async function addCommunity(textmessage) {
    //textmessage = {email, message, timestamp}
    //console.log("I was here");
    await addDoc(collection(db, CommunityCollection), textmessage);
}

export async function getCommunity() {
    let history= [];
    const q = query(
        collection(db, CommunityCollection),
        orderBy('timestamp','desc'),
    );
const snapShot = await getDocs(q);
snapShot.forEach( doc => {
    const {email, message, timestamp } = doc.data();
    history.push({email, message, timestamp});
});
return history;
}

