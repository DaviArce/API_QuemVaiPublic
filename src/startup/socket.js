const mapa = require("../services/MapServices");
module.exports = {
  async Socket(server) {
    const io = require("socket.io")(server,{
      cors: {
        origin: "http://15.228.10.74:6868",
        methods: ["GET", "POST","PUT","DELETE"]
      }
    });
    const connected = [];
    io.on("connection", (socket) => {
      //quando o usuario entrar vou armazenar o socket e algumas infos
      // se o mesmo usuario entrar em varias "sessoes" n armazenamos os novos sockets ID
      socket.on("enter", (obj) => {
        const result = connected.indexOf({ id: obj.id });
        console.log(result);
        if (!result.lenght) {
          const receive = {
            id: obj.id,
            socketID: socket.id,
            photo: obj.photo,
            username: obj.username,
            status: "connected",
          };
          connected.push(receive);
          socket.broadcast.emit("enter", connected);
        } else {
          console.log("aqui");
          socket.broadcast.emit("enter", connected);
        }
      });
      //quando criar um evento passa o Socket ID do cara aqui, para colocar pessoas tmbm é aqui só passar o socketID
      const eventON = [];
      socket.on("event", (socketid) => {
        socket.join(socketid);
        io.to(socketid).emit("event", "Conectado a sala " + socketid);
      });
      //Aqui quando voce for entrar tanto com o criador e tals passa por aqui q ele vai te mostrar quantas pessoas online tem aqui
      socket.on("eventEnter", (id, id_user, nome, photo) => {
        const result = {
          socketid: id,
          id_user: id_user,
          username: nome,
          photo: photo,
        };
        eventON.push(result);
        socket.broadcast.emit("eventEnter", "ALou" + eventON);
      });
      // Pra desconectar da sala só passar o socketId da sala q é o mesmo do autor
      socket.on("disconnect", (socketid) => {
        let i = eventON.indexOf({ socketid: socketid });
        eventON.splice(i);
        socket.leave(socketid);
      });
      /**
       * Quando ele deslogar,sair ou algo do tipo vai ter que ser emitido
       * o socket dele pra gente tirar ele do array de conexoes
       * ainda n testado, testar com o front
       */
      socket.on("disconnect", (socketid) => {
        let i = connected.indexOf({ socketID: socketid });
        connected.splice(i);
      });
      /**
       * Quando o usuario clickar em para dar um invite, como os users online vai estar com os id
       * salvo vai passar pro invite pro header e o socket id pra ca
       * ainda n testado, testar com o front
       */
      socket.on("invite", (socketTo, socketFrom, msg, subject) => {
        socket.broadcast.to(socketTo).emit("invite", {
          msg_time: new Date().getTime(),
          subject: subject,
          msg: msg,
          from: socketFrom,
        });
      });
      /**
       * dar o display das quadras
       * ainda n testado disparando isso a cada segundo
       */
      socket.on("mapa", async (lat, long) => {
        try {
          const valor = await mapa.getMapa(lat, long);
          socket.emit("mapa", valor);
        } catch (err) {
          socket.emit("mapa", { "Unexpected internal error in server": err });
        }
      });
    });
  },
};
