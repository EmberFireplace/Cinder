import { writable } from 'svelte/store';
import {browser} from '$app/env'
import {Client} from "faunadb";
export let storedUserID = writable(getItemForLocalStorage("userID"));
export const storedUserClient = writable(getItemForLocalStorage("userClient"));
storedUserClient.subscribe((val) =>setItemForLocalStorage("userClient", val));
storedUserID.subscribe((val) => setItemForLocalStorage("userID", val));


function setItemForLocalStorage(itemName, value) {
    if(!browser) {
        return;
    }
    console.log("setting " + itemName + " to " + value)
    localStorage.setItem(itemName, JSON.stringify(value));
}
function getItemForLocalStorage(itemName) {
    if(!browser) {
        return false;
    }
    return JSON.parse(localStorage.getItem(itemName)) || null;

}