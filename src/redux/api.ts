// @ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io, Socket } from 'socket.io-client';

export type Channel = 'redux' | 'general'

interface PhoneNumber {
  _id: string;
  number: string;
  createdAt: string;
  updatedAt: string;
}

console.log(process.env.REACT_APP_API_URL)

let socket: Socket;
function getSocket() {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL, {
      withCredentials: true,
    });
  }
  return socket;
}

export const myApi = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (build) => ({
    sendMessage: build.mutation<PhoneNumber, string>({
      queryFn: (phoneNumber: string) => {
        // const socket = io();
        const socket = getSocket();
        return new Promise(resolve => {
          socket.emit('newPhoneNumber', phoneNumber, (fullNumber: PhoneNumber) => {
            resolve({ data: fullNumber });
          });
        })
      },
    }),
    getNumbers: build.query<PhoneNumber[], void>({
      queryFn: () => ({ data: [] }),

      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          // const socket = io();
          const socket = getSocket();


          socket.on('connection', () => {
            socket.emit('result-number');
          });

          socket.on('result-number', ({ phone }) => {
            return updateCachedData(() => ([...phone]))
          });
          await cacheEntryRemoved;

          socket.off('connect');
        } catch {
          console.log('error')
        }
      }
    })
  })
})

export const { useGetNumbersQuery, useSendMessageMutation } = myApi;