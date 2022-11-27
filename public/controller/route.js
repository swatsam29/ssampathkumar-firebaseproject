import { tictactoe_page } from "../viewpage/tictactoe_page.js";
import { about_page } from "../viewpage/about_page.js";
import { community_page } from "../viewpage/community_page.js";

export const routePath = {
    TICTACTOE : '/tictactoe',
    ABOUT : '/about',
    COMMUNITY : '/community'
}

export const routes = [
    {path: routePath.TICTACTOE, page: tictactoe_page},
    {path: routePath.COMMUNITY, page: community_page },
    {path: routePath.ABOUT, page: about_page }, 

];

export function routing(pathname, hash){
    const route = routes.find(element => element.path == pathname);
    if (route) route.page();
    else routes[0].page();

}