import * as Elements from './elements.js'
import { routePath } from '../controller/route.js';
import { unauthorizedAccess } from './unauthorized_access_message.js';
import { currentUser } from '../controller/firebase_auth.js';
import { info } from './util.js';
import { DEV } from '../model/constants.js';

export function addEventListeners() {
    Elements.menus.community.addEventListener('click', () => {
        history.pushState(null,null, routePath.COMMUNITY);
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

}

async function create(event) {

        let html = `
        <form id= "form-add-reply" method= "post">
            <textarea name= "content" required minlength= "3" placeholder= "Enter Message" ></textarea>
            <br>
            <button type = "submit" class= "btn btn-outline-danger">Save</button>
            <button type = "submit" class= "btn btn-outline-secondary">Cancel</button>
        </form>
        `;
        document.getElementById('create').innerHTML = html;


    
}
