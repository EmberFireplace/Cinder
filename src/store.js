import { writable } from 'svelte/store';
import {browser} from '$app/env'
import {Client} from "faunadb";
export let storedUserID = writable(browser && (localStorage.getItem("userID") || null));
export const storedUserClient = writable(getItemForLocalStorage("userClient"));
storedUserClient.subscribe((val) => browser && (localStorage.setItem("userClient", val)));
storedUserID.subscribe((val) => browser && (localStorage.setItem("userID", val)));

function getItemForLocalStorage(itemName) {
    if(!browser) {
        return null;
    }
    return localStorage.getItem(itemName) || null;

}