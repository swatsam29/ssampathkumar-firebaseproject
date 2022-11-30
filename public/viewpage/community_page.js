import * as Elements from './elements.js'
import { routePath } from '../controller/route.js';
import { unauthorizedAccess } from './unauthorized_access_message.js';
import { currentUser } from '../controller/firebase_auth.js';
import { info } from './util.js';
import { DEV } from '../model/constants.js';
import { addCommunity, getCommunity } from '../controller/firestore_controller.js';

export function addEventListeners() {
    Elements.menus.community.addEventListener('click', () => {
        history.pushState(null, null, routePath.COMMUNITY);
        community_page();
    });
}
export async function community_page() {
    if (!currentUser) {
        Elements.root.innerHTML = unauthorizedAccess();
        return;
    }

    let html;
    const response = await fetch('/viewpage/templates/community_page.html', { cache: 'no-store' });
    html = await response.text();
    Elements.root.innerHTML = html;
    document.getElementById('button-create').addEventListener('click', create);
    commenthistory();
}

async function create(event) {
    let html = `
        <div>
            <textarea id= "save-text" name= "content" required minlength= "3" placeholder= "Enter Message" ></textarea>
            <br>
            <button id="save-button" type = "submit" class= "btn btn-outline-danger">Save</button>
            <button id="cancel-button" type = "submit" class= "btn btn-outline-secondary">Cancel</button>
        </div>
            `;
    document.getElementById('create').innerHTML = html;
    document.getElementById('save-button').addEventListener('click', save);
    document.getElementById('cancel-button').addEventListener('click', cancel);

}
function cancel(event) {
    community_page();
}

async function save(event) {

    let x = document.getElementById('save-text').value;
    console.log(x);
    //document.getElementById('save-button').innerHTML = html;
    if(x!=""){
        
    
    const textmessage = {
        email: currentUser.email,
        message: x,
        timestamp: Date.now(),
    };
    try {
        await addCommunity(textmessage);
        info('Message added', 'Text message added to firebase :D');
        community_page();
    } catch (e) {
        info('Fail', `Failed to save message ${e}`);
        if (DEV) console.log('failed to save:', e);
    }
}
}

async function commenthistory() {
    let history;
    let html = `
    <tr>
        <th>Message</th>
        <th>Action</th>
    </tr>
    `;
    try {
        history = await getCommunity();
        for (let i = 0; i < history.length; i++) {
            html += `
            <tr>
            <td> 
            <div>By: ${history[i].email} (Posted At ${new Date(history[i].timestamp).toLocaleString()})</div>  
                <br>
                ${history[i].message}
            </td>
            <td>
            <button id="edit-button" type = "submit" class= "btn btn-outline-danger">Edit</button>
            <button id="delete-button" type = "submit" class= "btn btn-outline-secondary">Delete</button>
            </td>
            <tr>
            `;
        }
        document.getElementById('message-table').innerHTML = html;
        document.getElementById
        document.getElementById('edit-button').addEventListener('click', editbutton);
        document.getElementById('delete-button').addEventListener('click', deletebutton);

    } catch (e) {
        info('Fail', `Failed to load message ${e}`);
        if (DEV) console.log('failed to load', e);
    }
    function editbutton() {
        community_page();
    }
    function deletebutton() {


       document.getElementById('row').remove();

    }
}
