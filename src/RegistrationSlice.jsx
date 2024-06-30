import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://667ec3dcf2cb59c38dc6f498.mockapi.io/registrations';

export const fetchRegistrations = createAsyncThunk('registrations/fetchRegistrations', async () => {
    const response = await axios.get(API_URL);
    return response.data;
  });

export const addRegistration = createAsyncThunk("registrations/postRegistrations",async (registration)=>{
    const response = await axios.post(API_URL,registration);
    return response.data;
})

// Update a registration
export const updateRegistration = createAsyncThunk('registrations/updateRegistration', async (registration) => {
    const response = await axios.put(`${API_URL}/${registration.id}`, registration);
    return response.data;
  });

export const deleteRegistration = createAsyncThunk('registrations/deleteRegistrations', async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  });

const registrationSlice = createSlice({
    name:"registrations",
    initialState: {
        registrations : [],
        status : "idle",
        error :"null",
    },
    reducers:{},
    extraReducers : (builder)=>{
        builder.
        addCase(fetchRegistrations.pending,(state)=>{
            state.status="loading"
        }).
        addCase(fetchRegistrations.fulfilled,(state,action)=>{
            state.status="success";
            state.registrations=action.payload;
        }).
        addCase(fetchRegistrations.rejected,(state,action)=>{
            state.status="failed";
            state.error = action.error.message;
        }).addCase(deleteRegistration.fulfilled, (state, action) => {
            state.registrations = state.registrations.filter(registration => registration.id !== action.payload);
        }).addCase(addRegistration.fulfilled,(state,action)=>{
            state.registrations.push(action.payload)
        }).addCase(updateRegistration.fulfilled,(state,action)=>{
            const index = state.registrations.findIndex(registration => registration.id === action.payload.id);
            state.registrations[index] = action.payload;
        })
    }
})

export default registrationSlice.reducer;