import { writable } from 'svelte/store';
import {browser} from '$app/env'
import {Client} from "faunadb";
export let storedUserID = writable(getItemForLocalStorage("userID"));
export let storedUserSecret = writable(getItemForLocalStorage("userSecret"));


storedUserID.subscribe((val) => setItemForLocalStorage("userID", val));
storedUserSecret.subscribe((val) => setItemForLocalStorage("userSecret", val));

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