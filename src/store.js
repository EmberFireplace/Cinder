import { writable } from 'svelte/store';
import {browser} from '$app/env'
import {Client} from "faunadb";
export let storedUserID = writable("319377263493644361");
export const storedUserClient = writable(browser && (localStorage.getItem("userClient") || null));
storedUserClient.subscribe((val) => browser && (localStorage.setItem("userClient", val)));
