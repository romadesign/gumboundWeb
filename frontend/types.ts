
import { Server as NetServer, Socket } from "net"
import { NextApiResponse } from "next"
import { Server as SocketIoServer } from "socket.io"

// file types.d.ts other option
// declare module '*module.css' {
//   const styles: {
//     [className: string]: string
//   }
//   export default styles
// }


export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer;
    }
  }
}