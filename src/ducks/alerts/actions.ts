import {createAction} from "@reduxjs/toolkit";
import {ErrorAlert} from "chums-components";

export const dismissAlert = createAction<number>('alerts/dismiss');
export const addAlert = createAction<ErrorAlert>('alerts/addAlert');
