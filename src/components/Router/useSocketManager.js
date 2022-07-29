import React, { useEffect } from 'react';
import { notification } from 'antd';
import { io } from "socket.io-client";
import { events } from 'services/coopsol/CoopsolBackend';


const useSocketManager = (user) => {

  useEffect(() => {

    const coopsolToken = localStorage.getItem("coopsolToken");
    if(!coopsolToken) return;

    const socket = io(process.env.REACT_APP_COOPSOL_BACKEND_URL, {
      auth:{
        token: coopsolToken
      }
    }); 

    socket.on("connect", () => {
      console.log(`Socket connected!`);
    });

    socket.on("connect_error", (err) => {
      console.log(`Error al conectar el socket:`,err)
      
      if(err?.message ==="TokenExpiredError"){
        events.emit("Unauthorized", err);
      }
    });

    socket.on("disconnect", (reason, details) => console.log(reason, details));


    socket.on("producer-did-associated", payload => {
      const { firstname, lastname, did } = payload;
      
      notification.info({
        message: 'Nueva asociación de did',
        description:
          `Se ha asociado el did ${did} al productor ${firstname} ${lastname}`,
        duration: 0,
      });
      
    })


    socket.on("identity-validation-request", payload => {
      const { firstname, lastname, did } = payload;

      notification.info({
        message: 'Nueva solicitud de validación de identidad',
        description:
          `El productor ${firstname} ${lastname} ha solicitado un validación de identidad`,
      /*   duration: 0, */
      })
      events.emit("identity-validation-request", payload);
    })

    socket.on("new-producer", payload => {
      const { firstname, lastname, did } = payload;
      
      notification.info({
        message: 'Nuevo productor registrado',
        description:
          `Se ha agregado el productor ${firstname} ${lastname} al registro.`,
      /*   duration: 0, */
      })

      events.emit("new-producer", payload);

      
    })
    socket.on("updated-producer", payload => {
      const { firstname, lastname, did } = payload;
      
      notification.info({
        message: 'Datos del productor actualizados',
        description:
          `Se han actualizado los datos del productor ${firstname} ${lastname}.`,
      /*   duration: 0, */
      });
      events.emit("updated-producer", payload);
    })




    return () => {
      //cleanup
      socket.disconnect();
    }


  },[user]) 

  return null;
}

export default useSocketManager;