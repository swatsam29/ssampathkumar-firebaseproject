import * as Elements from './elements.js'
import { routePath } from '../controller/route.js';
import { unauthorizedAccess } from './unauthorized_access_message.js';
import { currentUser } from '../controller/firebase_auth.js';

export function addEventListeners() {

    Elements.menus.community.addEventListener('click', () => {
        history.pushState(null,null, routePath.COMMUNITY);
        community_page();

    });
}
export function community_page() {
    if (!currentUser){
        Elements.root.innerHTML = unauthorizedAccess();
        return;
    }
    
    let html = 'Community Page' ;
    Elements.root.innerHTML = html ;
}